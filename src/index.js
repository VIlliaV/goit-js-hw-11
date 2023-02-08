import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formEl = document.querySelector('.search-form');

formEl.addEventListener('submit', searchPictures);

function searchPictures(e) {
  e.preventDefault();

  console.log(e.currentTarget.searchQuery.value);
}
