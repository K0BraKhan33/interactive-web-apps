document.addEventListener('DOMContentLoaded', function () {
  let matches = books;
  let page = 1;
  const booksPerPage = 36;
  let currentOverlay = null;

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

  function showBookDetails(event) {
    if (currentOverlay) {
      document.body.removeChild(currentOverlay);
      document.body.removeChild(document.querySelector('.backdrop'));
    }

    const previewButton = event.target.closest('.preview');
    if (!previewButton) return;

    const bookId = previewButton.getAttribute('data-preview');
    const book = books.find((book) => book.id === bookId);
    if (!book) return;

    const { author, image, title, description } = book;

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    overlay.style.position = 'fixed';
    overlay.style.left = '50%';
    overlay.style.bottom = '0';
    overlay.style.transform = 'translateX(-50%)';
    overlay.style.maxWidth = '80%';

    overlay.innerHTML = `
      <img class="overlay__image" src="${image}" alt="${title}" />
      <h2 class="overlay__title">${title}</h2>
      <p class="overlay__author">By ${authors[author]}</p>
      <p class="overlay__description">${description}</p>
      <button class="overlay__close">Close</button>
    `;

    const overlayImage = overlay.querySelector('.overlay__image');
    if (overlayImage) {
      overlayImage.style.maxWidth = '100%';
      overlayImage.style.marginBottom = '1rem';
    }

    const overlayTitle = overlay.querySelector('.overlay__title');
    if (overlayTitle) {
      overlayTitle.style.textAlign = 'center';
    }

    const overlayAuthor = overlay.querySelector('.overlay__author');
    if (overlayAuthor) {
      overlayAuthor.style.textAlign = 'center';
    }

    const overlayDescription = overlay.querySelector('.overlay__description');
    if (overlayDescription) {
      overlayDescription.style.textAlign = 'center';
    }

    const closeButton = overlay.querySelector('.overlay__close');
    closeButton.addEventListener('click', () => {
      document.body.removeChild(overlay);
      document.body.removeChild(document.querySelector('.backdrop'));
      currentOverlay = null;
    });

    const backdrop = document.createElement('div');
    backdrop.classList.add('backdrop');

    currentOverlay = overlay;

    document.body.appendChild(overlay);
    document.body.appendChild(backdrop);
  }

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

  const fragment = document.createDocumentFragment();
  const extracted = books.slice(0, booksPerPage);

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

  function handleThemeChange(event) {
    const selectedTheme = event.target.value;
    document.documentElement.style.setProperty('--color-dark', css[selectedTheme].dark);
    document.documentElement.style.setProperty('--color-light', css[selectedTheme].light);
  }

  function showSettingsDialog() {
    const settingsDialog = document.querySelector('[data-settings-overlay]');
    if (settingsDialog) {
      settingsDialog.open = true;
    }
  }

  function closeSettingsDialog() {
    const settingsDialog = document.querySelector('[data-settings-overlay]');
    if (settingsDialog) {
      settingsDialog.open = false;
    }
  }

  const settingsButton = document.querySelector('[data-header-settings]');
  if (settingsButton) {
    settingsButton.addEventListener('click', showSettingsDialog);
  }

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

  const previews = document.querySelectorAll(".preview");
  previews.forEach(preview => {
    preview.addEventListener('click', showBookDetails);
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

    document.querySelector('[data-list-items]').innerHTML = '';
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

  bookElements.forEach(bookElement => {
    bookElement.addEventListener('click', () => {
      const bookId = bookElement.dataset.preview;
      const book = books.find(book => book.id === bookId);

      const overlay = document.createElement('div');
      overlay.classList.add('overlay');

      overlay.innerHTML = `
        <img class="overlay__image" src="${book.image}" alt="${book.title}" />
        <h2 class="overlay__title">${book.title}</h2>
        <p class="overlay__author">By ${authors[book.author]}</p>
        <p class="overlay__description">${book.description}</p>
        <button class="overlay__close">Close</button>
      `;

      const backdrop = document.createElement('div');
      backdrop.classList.add('backdrop');

      const closeButton = overlay.querySelector('.overlay__close');
      closeButton.addEventListener('click', () => {
        document.body.removeChild(overlay);
        document.body.removeChild(backdrop);
        currentOverlay = null;
      });

      document.body.appendChild(overlay);
      document.body.appendChild(backdrop);

      currentOverlay = overlay; // Update the currentOverlay variable
    });
  });
});
