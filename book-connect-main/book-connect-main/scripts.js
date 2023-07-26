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

    preview.innerHTML = /* html */ `
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
    bookDetailsElement.innerHTML = /* html */ `
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

  document.querySelector('[data-list-button]').textContent = `Show more (${matches.length - (page * booksPerPage) > 0 ? matches.length - (page * booksPerPage) : 0})`;

  document.querySelector('[data-list-button]').disabled = !(matches.length - page * booksPerPage > 0);

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

      element.innerHTML = /* html */ `
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

    document.querySelector('[data-list-button]').innerHTML = /* html */ `
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
});
