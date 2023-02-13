import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { searchNewPhotos, per_page } from './api_search';

const formEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreEl = document.querySelector('.load-more');

let page = 1;
let searchQuery = '';

formEl.addEventListener('submit', innerPhotos);

async function innerPhotos(e) {
  e.preventDefault();
  clearHTML();

  searchQuery = e.currentTarget.searchQuery.value.trim();

  try {
    const { hits, totalHits } = await searchNewPhotos(searchQuery);

    if (hits.length === 0) throw new Error('No images');

    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);

    sympleLight(hits);

    if (totalHits > 40) {
      loadMoreEl.classList.remove('hide_btn');
      loadMoreEl.addEventListener('click', onLoadMore);
    }
  } catch (err) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    console.error(err);
  } finally {
    formEl.reset();
  }
}

function createMarkup({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return ` <div class="photo-card">
    <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" class="photo"/></a>
    <div class="info">
      <p class="info-item">
        <b>Likes <br> ${likes}</b>
      </p>
      <p class="info-item">
        <b>Views <br>${views}</b>
      </p>
      <p class="info-item">
        <b>Comments <br>${comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads <br>${downloads}</b>
      </p>
    </div>
  </div>`;
}

async function onLoadMore() {
  page += 1;
  const { hits, totalHits } = await searchNewPhotos(searchQuery, page);
  if (page * per_page > totalHits) {
    loadMoreEl.classList.add('hide_btn');
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
    loadMoreEl.removeEventListener;
  }
  sympleLight(hits);

  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function clearHTML() {
  loadMoreEl.classList.add('hide_btn');
  galleryEl.innerHTML = '';
  page = 1;
}

function sympleLight(arr) {
  const markup = arr.reduce((markup, hit) => createMarkup(hit) + markup, '');
  galleryEl.insertAdjacentHTML('beforeend', markup);
  new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: '300',
  }).refresh();
}
