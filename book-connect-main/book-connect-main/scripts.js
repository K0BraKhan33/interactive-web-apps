//scripts.js

import { books, BOOKS_PER_PAGE } from './data';
let matches = books;
let page = 1;


//sets the color
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

//gets the relitave info per book
const fragment = document.createDocumentFragment();
const extracted = books.slice(0, 36);

for (const { author, image, title, id } of extracted) {
  const preview = createPreview({
    author,
    id,
    image,
    title,
  });

  fragment.appendChild(preview);
}

data-list-items.appendChild(fragment);

const genres = document.createDocumentFragment();
let element = document.createElement('option');
element.value = 'any';
element.innerText = 'All Genres';
genres.appendChild(element);

for (const [id, name] of Object.entries(genres)) {
  element = document.createElement('option');
  element.value = id;
  element.innerText = name;
  genres.appendChild(element);
}

data-search-genres.appendChild(genres);

const authors = document.createDocumentFragment();
element = document.createElement('option');
element.value = 'any';
element.innerText = 'All Authors';
authors.appendChild(element);

for (const [id, name] of Object.entries(authors)) {
  element = document.createElement('option');
  element.value = id;
  element.innerText = name;
  authors.appendChild(element);
}

data-search-authors.appendChild(authors);

const userPrefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const theme = userPrefersDarkMode ? 'night' : 'day';

document.documentElement.style.setProperty('--color-dark', css[theme].dark);
document.documentElement.style.setProperty('--color-light', css[theme].light);

document.querySelector('[data-list-button]').textContent = `Show more (${matches.length - (page * BOOKS_PER_PAGE) > 0 ? matches.length - (page * BOOKS_PER_PAGE) : 0})`;

document.querySelector('[data-list-button]').disabled = !(matches.length - page * BOOKS_PER_PAGE > 0);

data-list-button.addEventListener('click', () => {
  document.querySelector('[data-list-items]').appendChild(
    createPreviewsFragment(matches, page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)
  );
  actions.list.updateRemaining();
  page++;
});

data-header-search.addEventListener('click', () => {
  document.querySelector('[data-search-overlay]').open = true;
  document.querySelector('[data-search-title]').focus();
});

data-search-form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const filters = Object.fromEntries(formData);
  const result = [];

  for (const book of booksList) {
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

  if (result.length < 1) {
    data-list-message.classList.add('list__message_show');
  } else {
    data-list-message.classList.remove('list__message_show');
  }

  document.querySelector('[data-list-items]').innerHTML = ''; // Clear the previous results
  const fragment = document.createDocumentFragment();
  const extracted = result.slice(range[0], range[1]);

  for (const { author, image, title, id } of extracted) {
    const element = document.createElement('button');
    element.classList = 'preview';
    element.setAttribute('data-preview', id);

    element.innerHTML = /* html */ `
      <img
        class="preview__image"
        src="${image}"
      />
      <div class="preview__info">
        <h3 class="preview__title">${title}</h3>
        <div class="preview__author">${authors[author]}</div>
      </div>
    `;

    fragment.appendChild(element);
  }

  data-list-items.appendChild(fragment);

  const initial = matches.length - (page * BOOKS_PER_PAGE);
  const remaining = hasRemaining ? initial : 0;
  document.querySelector('[data-list-button]').disabled = initial > 0;

  document.querySelector('[data-list-button]').innerHTML = /* html */ `
    <span>Show more</span>
    <span class="list__remaining"> (${remaining})</span>
  `;

  window.scrollTo({ top: 0, behavior: 'smooth' });
  document.querySelector('[data-search-overlay].open').open = false;
});

data-settings-overlay.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const result = Object.fromEntries(formData);
  document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
  document.documentElement.style.setProperty('--color-light', css[result.theme].light);
  document.querySelector('[data-settings-overlay].open').open = false;
});

data-list-items.addEventListener('click', (event) => {
  let active;

  for (const node of event.path || event.composedPath()) {
    const previewId = node?.dataset?.preview;

    for (const singleBook of books) {
      if (singleBook.id === previewId) {
        active = singleBook;
        break;
      }
    }
  }

  if (!active) return;

  document.querySelector('[data-list-active]').open = true;
  document.querySelector('[data-list-blur]').style.backgroundImage = `url(${active.image})`;
  document.querySelector('[data-list-title]').textContent = active.title;
  document.querySelector('[data-list-subtitle]').textContent = `${authors[active.author]} (${new Date(active.published).getFullYear()})`;
  document.querySelector('[data-list-description]').textContent = active.description;
});

data-search-cancel.addEventListener('click', () => {
  document.querySelector('[data-search-overlay]').open = false;
});

data-settings-cancel.addEventListener('click', () => {
  document.querySelector('[data-settings-overlay]').open = false;
});

data-list-close.addEventListener('click', () => {
  document.querySelector('[data-list-active]').open = false;
});
