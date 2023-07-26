document.addEventListener('DOMContentLoaded', function () {
  console.log('test');
  let matches = books;
  let page = 1;
  const booksPerPage = 36;

  // Function to create a single book preview element
  function createPreview(book, authors) {
    const { author, image, title, id } = book;
    const preview = document.createElement('button');
    preview.classList = 'preview';
    preview.setAttribute('data-preview', id);

    preview.innerHTML = `
      <img class="preview__image" src="${image}" />
      <div class="preview__info">
        <h3 class="preview__title">${title}</h3>
        <div class="preview__author">${authors[author]}</div>
      </div>
    `;

    return preview;
  }

  // Function to show book details
  function showBookDetails(event) {
    const previewButton = event.target.closest('.preview');
    if (!previewButton) return; // Return if the target is not a .preview button

    const bookId = previewButton.getAttribute('data-preview');
    const book = books.find((book) => book.id === bookId);
    if (!book) return; // Return if the book with the specified ID is not found

    const bookDetailsElement = document.querySelector('[data-book-details]');
    if (!bookDetailsElement) return; // Return if the book details element is not found

    const { author, image, title, description, genres } = book;

    // Update the book details element with the selected book's information
    bookDetailsElement.innerHTML = `
      <img class="book-details__image" src="${image}" />
      <div class="book-details__info">
        <h3 class="book-details__title">${title}</h3>
        <div class="book-details__author">By ${authors[author]}</div>
        <div class="book-details__genres">Genres: ${genres.map(genreId => genres[genreId]).join(', ')}</div>
        <div class="book-details__description">${description}</div>
      </div>
    `;

    // Show the book details
    bookDetailsElement.classList.add('show');
  }

  // Sets the color
  const css = {
    day: {
      dark: '10, 10, 20',
      light: '255, 255, 255',
    },
    night: {
      dark: '255, 255, 255',
      light: '10, 10, 20',
    },
  };

  // Gets the relative info per book
  const fragment = document.createDocumentFragment();
  const extracted = books.slice(0, booksPerPage);

  // Loop to create the previews
  for (const { author, image, title, id } of extracted) {
    const preview = createPreview({ author, image, title, id }, authors);
    fragment.appendChild(preview);
    console.log(preview);
  }
  let sender = document.querySelector('[data-list-items]');
  sender.appendChild(fragment);

  const genresFragment = document.createDocumentFragment();
  let element = document.createElement('option');
  element.value = 'any';
  element.innerText = 'All Genres';
  genresFragment.appendChild(element);

  for (const [id, name] of Object.entries(genres)) {
    element = document.createElement('option');
    element.value = id;
    element.innerText = name;
    genresFragment.appendChild(element);
  }

  document.querySelector('[data-search-genres]').appendChild(genresFragment);

  const authorsFragment = document.createDocumentFragment();
  element = document.createElement('option');
  element.value = 'any';
  element.innerText = 'All Authors';
  authorsFragment.appendChild(element);

  for (const [id, name] of Object.entries(authors)) {
    element = document.createElement('option');
    element.value = id;
    element.innerText = name;
    authorsFragment.appendChild(element);
  }

  document.querySelector('[data-search-authors]').appendChild(authorsFragment);

  const userPrefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = userPrefersDarkMode ? 'night' : 'day';

  document.documentElement.style.setProperty('--color-dark', css[theme].dark);
  document.documentElement.style.setProperty('--color-light', css[theme].light);

  // Function to show the settings dialog
  function showSettingsDialog() {
    const settingsDialog = document.querySelector('[data-settings-overlay]');
    if (settingsDialog) {
      settingsDialog.open = true;
    }
  }

  // Function to close the settings dialog
  function closeSettingsDialog() {
    const settingsDialog = document.querySelector('[data-settings-overlay]');
    if (settingsDialog) {
      settingsDialog.open = false;
    }
  }

  // Event listener for the settings button
  const settingsButton = document.querySelector('[data-header-settings]');
  if (settingsButton) {
    settingsButton.addEventListener('click', showSettingsDialog);
  }

  // Event listener for the settings form
  const settingsForm = document.querySelector('[data-settings-form]');
  if (settingsForm) {
    settingsForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const theme = formData.get('theme');
      handleThemeChange({ target: { value: theme } });
      closeSettingsDialog();  
    });
  }
  const cancelButton = document.querySelector('[data-settings-cancel]');
  if (cancelButton) {
    cancelButton.addEventListener('click', closeSettingsDialog);
  }

  document.querySelector('[data-list-button]').textContent = `Show more (${matches.length - (page * booksPerPage) > 0 ? matches.length - (page * booksPerPage) : 0})`;

  document.querySelector('[data-list-button]').disabled = !(matches.length - page * booksPerPage > 0);

  // Event listeners
  const previews = document.querySelectorAll(".preview");
  previews.forEach(preview => { 
    preview.addEventListener('click', (event) => {
      const bookId = preview.getAttribute('data-preview');
      console.log(bookId);
      // Here, you can add the code to show the overlay with book details
      const book = books.find((book) => book.id === bookId);
      if (book) {
        console.log("Book Title:", book.title);
        console.log("Author:", authors[book.author]);
        console.log("Description:", book.description);
        // Add your code to display the overlay with book details
      }
    });
  });

  document.querySelector('[data-list-button]').addEventListener('click', () => {
    const nextPageBooks = matches.slice(page * booksPerPage, (page + 1) * booksPerPage);
    const nextPageFragment = document.createDocumentFragment();

    for (const { author, image, title, id } of nextPageBooks) {
      const preview = createPreview({ author, image, title, id }, authors);
      nextPageFragment.appendChild(preview);
    }

    document.querySelector('[data-list-items]').appendChild(nextPageFragment);

    const remainingBooks = matches.length - (page + 1) * booksPerPage;
    const remainingText = remainingBooks > 0 ? ` (${remainingBooks})` : '';
    document.querySelector('[data-list-button]').textContent = `Show more${remainingText}`;

    document.querySelector('[data-list-button]').disabled = !(remainingBooks > 0);

    page++;
  });

  document.querySelector('[data-header-search]').addEventListener('click', () => {
    document.querySelector('[data-search-overlay]').open = true;
    document.querySelector('[data-search-title]').focus();
  });

  document.querySelector('[data-search-cancel]').addEventListener('click', (event) => {
    document.querySelector('[data-search-overlay]').open = false;
  });

  document.querySelector('[data-list-items]').addEventListener('click', showBookDetails);

  document.querySelector('[data-search-form]').addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);
    const result = [];

    for (const book of books) {
      const titleMatch = filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase());
      const authorMatch = filters.author === 'any' || book.author === filters.author;
      let genreMatch = filters.genre === 'any';

      if (!genreMatch) {
        for (const genre of book.genres) {
          if (genre === filters.genre) {
            genreMatch = true;
            break;
          }
        }
      }

      if (titleMatch && authorMatch && genreMatch) {
        result.push(book);
      }
    }
    console.clear();
    console.warn('Searching in progress...');
    if (result.length < 1) {
      document.querySelector('[data-list-message]').classList.add('list__message_show');
      console.warn('No books following your input search again.');
    } else {
      document.querySelector('[data-list-message]').classList.remove('list__message_show');
      console.warn('Found Items');
    }

    document.querySelector('[data-list-items]').innerHTML = ''; // Clear the previous results
    const fragment = document.createDocumentFragment();
    const extracted = result.slice(0, booksPerPage);

    for (const { author, image, title, id } of extracted) {
      const element = document.createElement('button');
      element.classList = 'preview';
      element.setAttribute('data-preview', id);

      element.innerHTML = `
        <img class="preview__image" src="${image}" />
        <div class="preview__info">
          <h3 class="preview__title">${title}</h3>
          <div class="preview__author">${authors[author]}</div>
        </div>
      `;

      fragment.appendChild(element);
    }

    document.querySelector('[data-list-items]').appendChild(fragment);

    const initial = result.length - (page * booksPerPage);
    const remaining = initial > 0 ? initial : 0;
    document.querySelector('[data-list-button]').disabled = initial <= 0;

    document.querySelector('[data-list-button]').innerHTML = `
      <span>Show more</span>
      <span class="list__remaining"> (${remaining})</span>
    `;

    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.querySelector('[data-search-overlay]').open = false;
  });

  document.querySelector('[data-search-overlay]').addEventListener('click', (event) => {
    if (event.target === document.querySelector('[data-search-overlay]')) {
      document.querySelector('[data-search-overlay]').open = false;
    }
  });

  const bookElements = document.querySelectorAll('.preview');

  // Add event listener to each book element
  bookElements.forEach(bookElement => {
    bookElement.addEventListener('click', () => {
      // Get the book ID from the "data-book-id" attribute
      const bookId = bookElement.dataset.bookId;
  
      // Find the book details in the "books" array using the bookId
      const book = books.find(book => book.id === bookId);
  
      // Create an overlay element and populate it with book details
      const overlay = document.createElement('div');
      overlay.classList.add('overlay');
      overlay.innerHTML = `
        <div class="overlay__content">
          <img class="overlay__image" src="${book.image}" alt="${book.title}" />
          <h2 class="overlay__title">${book.title}</h2>
          <p class="overlay__data">Author: ${authors[book.author]}</p>
          <p class="overlay__data_secondary">Description: ${book.description}</p>
          <!-- Add other book details as needed -->
        </div>
      `;
  
      // Append the overlay to the document body
      document.body.appendChild(overlay);
  
      // Add a click event listener to the backdrop to close the overlay when clicked
      const backdrop = document.createElement('div');
      backdrop.classList.add('backdrop');
      backdrop.addEventListener('click', () => {
        document.body.removeChild(overlay);
        document.body.removeChild(backdrop);
      });
  
      // Append the backdrop to the document body
      document.body.appendChild(backdrop);
    });
  });

});
