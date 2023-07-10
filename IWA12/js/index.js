// scripts.js

const STATUS_MAP = {
    shelf: {
      color: 'green',
      canReserve: true,
      canCheckout: true,
      canCheckIn: false,
    },
    reserved: {
      color: 'blue',
      canReserve: false,
      canCheckout: true,
      canCheckIn: false,
    },
    overdue: {
      color: 'red',
      canReserve: false,
      canCheckout: false,
      canCheckIn: true,
    },
    checkedOut: {
      color: 'orange',
      canReserve: false,
      canCheckout: false,
      canCheckIn: true,
    }
  };
  
  //the elements using their IDs and classes
  const statusElements = document.getElementsByClassName('status');
  const reserveButtons = document.getElementsByClassName('reserve');
  const checkoutButtons = document.getElementsByClassName('checkout');
  const checkinButtons = document.getElementsByClassName('checkin');
  
  // Updating the elements based on the STATUS_MAP object
  for (let i = 0; i < statusElements.length; i++) {
    const statusElement = statusElements[i];
    const bookStatus = statusElement.textContent.trim();
    const statusProperties = STATUS_MAP[bookStatus];
  
    // Set color of the status indicator text
    statusElement.style.color = statusProperties.color;
  
    // Enable or disable buttons based on the status and properties
    reserveButtons[i].disabled = !statusProperties.canReserve;
    checkoutButtons[i].disabled = !statusProperties.canCheckout;
    checkinButtons[i].disabled = !statusProperties.canCheckIn;
  
    // Set the buttons to black and grayscale
    reserveButtons[i].style.color = 'black';
    checkoutButtons[i].style.color = 'black';
    checkinButtons[i].style.color = 'black';
    reserveButtons[i].style.filter = 'grayscale(100%)';
    checkoutButtons[i].style.filter = 'grayscale(100%)';
    checkinButtons[i].style.filter = 'grayscale(100%)';
  }
  