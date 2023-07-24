// scripts.js
// (Main script with event handlers)

import { TABLES, COLUMNS, state, updateDragging, createOrderData } from './data.js';
import { html, updateDraggingHtml, createOrderHtml } from './view.js';

/**
 * Handler for the "handleDragStart" event when a user starts dragging an order.
 * This sets the "source" in the app state to the column from which the order is dragged.
 *
 * @param {Event} event
 */
const handleDragStart = (event) => {
  const orderId = event.target.dataset.id;
  const sourceColumn = event.currentTarget.dataset.column;
  event.dataTransfer.setData('text/plain', orderId);
  updateDragging({ source: sourceColumn });
};

/**
 * Handler for the "handleDragEnd" event when a user finishes dragging an order.
 * This clears the dragging state in the app state and updates the HTML to remove any hover effects.
 *
 * @param {Event} event
 */
const handleDragEnd = (event) => {
  updateDragging({});
  updateDraggingHtml({});
};

/**
 * Handler for the "handleHelpToggle" event when the user clicks the "?" icon.
 * This opens or closes the "Help" overlay.
 *
 * @param {Event} event
 */
const handleHelpToggle = (event) => {
  const helpOverlay = html.help.overlay;
  helpOverlay.open = !helpOverlay.open;
  if (!helpOverlay.open) {
    html.other.add.focus();
  }
};

/**
 * Handler for the "handleAddToggle" event when the user clicks the "Add Order" button.
 * This opens or closes the "Add Order" overlay.
 *
 * @param {Event} event
 */
const handleAddToggle = (event) => {
  const addOverlay = html.add.overlay;
  addOverlay.open = !addOverlay.open;
  if (!addOverlay.open) {
    clearAddForm();
    html.other.add.focus();
  }
};

/**
 * Clears the inputs in the "Add Order" form.
 */
const clearAddForm = () => {
  html.add.title.value = '';
  html.add.table.value = '';
};

/**
 * Handler for the "handleAddSubmit" event when the user submits the "Add Order" form.
 * This adds a new order to the "Ordered" column and closes the "Add Order" overlay.
 *
 * @param {Event} event
 */
const handleAddSubmit = (event) => {
  event.preventDefault();
  const title = html.add.title.value;
  const table = html.add.table.value;

  if (!title || !table) {
    alert('Please enter both title and table.');
    return;
  }

  const newOrder = createOrderData({ title, table, column: 'ordered' });
  const newOrderHtml = createOrderHtml(newOrder);
  html.columns.ordered.appendChild(newOrderHtml);
  html.add.overlay.open = false;
  clearAddForm();
};

/**
 * Handler for the "handleEditToggle" event when an order in the grid is clicked.
 * This opens or closes the "Edit Order" overlay and populates it with the order's data.
 *
 * @param {Event} event
 */
const handleEditToggle = (event) => {
  const orderId = event.target.dataset.id;
  const orderElement = event.target.closest('.order');
  const editOverlay = html.edit.overlay;

  if (orderId) {
    const orderData = state.orders[orderId];
    if (!orderData) {
      return; // Return early if the orderData is not found in the state
    }

    html.edit.title.value = orderData.title;
    html.edit.table.value = orderData.table;
    html.edit.column.value = orderData.column;
    html.edit.id.value = orderId;
    editOverlay.open = !editOverlay.open;
    if (!editOverlay.open) {
      html.other.add.focus();
    }
  }
};

/**
 * Handler for the "handleEditSubmit" event when the user submits the "Edit Order" form.
 * This updates the order with the entered data and closes the "Edit Order" overlay.
 *
 * @param {Event} event
 */
const handleEditSubmit = (event) => {
  event.preventDefault();
  const id = html.edit.id.value;
  const title = html.edit.title.value;
  const table = html.edit.table.value;
  const column = html.edit.column.value;

  if (!title || !table) {
    alert('Please enter both title and table.');
    return;
  }

  const updatedOrder = createOrderData({ title, table, column });
  state.orders[id] = updatedOrder;
  const updatedOrderHtml = createOrderHtml(updatedOrder);
  html.columns[column].appendChild(updatedOrderHtml);

  const previousColumn = state.orders[id].column;
  if (previousColumn !== column) {
    const orderElement = document.querySelector(`[data-id="${id}"]`);
    orderElement.remove();
  }

  html.edit.overlay.open = false;
};

/**
 * Handler for the "handleDelete" event when the user clicks the delete button in the "Edit Order" overlay.
 * This deletes the order and closes the overlay.
 *
 * @param {Event} event
 */
const handleDelete = (event) => {
  const id = html.edit.id.value;
  const orderElement = document.querySelector(`[data-id="${id}"]`);
  orderElement.remove();
  delete state.orders[id];
  html.edit.overlay.open = false;
};

/**
 * Handler for the "handleDragOver" event when a user drags an order over a column.
 * This updates the dragging state to reflect the current over column.
 *
 * @param {Event} event
 */
const handleDragOver = (event) => {
  event.preventDefault();
  const overColumn = event.currentTarget.dataset.column;
  updateDragging({ over: overColumn });
  updateDraggingHtml({ over: overColumn });
};

/**
 * Handler for the "handleDrop" event when a user drops an order onto a column.
 * This moves the order to the new column and updates the app state accordingly.
 *
 * @param {Event} event
 */
const handleDrop = (event) => {
  event.preventDefault();
  const orderId = event.dataTransfer.getData('text/plain');
  const overColumn = event.currentTarget.dataset.column;
  const sourceColumn = state.orders[orderId].column;

  if (overColumn !== sourceColumn) {
    // Move the order to the new column
    const orderElement = document.querySelector(`[data-id="${orderId}"]`);
    html.columns[overColumn].appendChild(orderElement);

    // Update the app state with the new column for the order
    state.orders[orderId].column = overColumn;
  }

  updateDragging({});
  updateDraggingHtml({});
};

// Add event listeners
html.add.cancel.addEventListener('click', handleAddToggle);
html.other.add.addEventListener('click', handleAddToggle);
html.add.form.addEventListener('submit', handleAddSubmit);

html.other.grid.addEventListener('click', handleEditToggle);
html.edit.cancel.addEventListener('click', handleEditToggle);
html.edit.form.addEventListener('submit', handleEditSubmit);
html.edit.delete.addEventListener('click', handleDelete);

html.help.cancel.addEventListener('click', handleHelpToggle);
html.other.help.addEventListener('click', handleHelpToggle);

for (const htmlColumn of Object.values(html.columns)) {
  htmlColumn.addEventListener('dragstart', handleDragStart);
  htmlColumn.addEventListener('dragend', handleDragEnd);
}

for (const htmlArea of Object.values(html.area)) {
  htmlArea.addEventListener('dragover', handleDragOver);
  htmlArea.addEventListener('drop', handleDrop);
}

// Set focus on "Add Order" button when the page loads
html.other.add.focus();
