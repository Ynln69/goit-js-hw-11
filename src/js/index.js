import '../css/styles.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import NewsApiService from './fetchImages';
import renderGallery from './renderGallery';

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  sentinel: document.querySelector('#sentinel'),
};

let messageShown = false;
let totalHit = 0;

const onEntry = entries => {
  entries.forEach(entrie => {
    if (entrie.isIntersecting && newsApiService.query !== '') {
      arrfetchImages();
    }
  });
};

const options = {
  rootMargin: '150px',
};

const observer = new IntersectionObserver(onEntry, options);
const newsApiService = new NewsApiService();
const modal = new SimpleLightbox('.gallery a');

refs.searchForm.addEventListener('submit', onSearchForm);

function onSearchForm(e) {
  e.preventDefault();
  observer.unobserve(refs.sentinel);
  messageShown = false;

  newsApiService.query = e.srcElement[0].value.trim();

  if (newsApiService.query === '') {
    Notiflix.Notify.failure('Oops, enter image name');
    return;
  }

  observer.observe(refs.sentinel);
  newsApiService.resetPage();
  deleteRender();
}

function arrfetchImages() {
  setTimeout(() => {
    const totalPages = Math.ceil(totalHit / newsApiService.perPage);

    if (newsApiService.page > totalPages) {
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
      observer.unobserve(refs.sentinel);
      return;
    }
  }, 500);

  newsApiService
    .fetchImages()
    .then(response => {
      const arrImages = response.data.hits;
      totalHit = response.data.totalHits;
      newsApiService.incrementPage();

      if (!messageShown && response.data.totalHits !== 0) {
        Notiflix.Notify.info(
          `Hooray! We found ${response.data.totalHits} images.`
        );
        messageShown = true;
      }

      if (arrImages.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      return arrImages;
    })
    .then(images => {
      articlesMarkup(images);
    })
    .catch(error => console.log(error));
}

function articlesMarkup(images) {
  const countryMarkup = renderGallery(images);
  refs.gallery.insertAdjacentHTML('beforeend', countryMarkup);

  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });

  modal.refresh();
}

function deleteRender() {
  refs.gallery.innerHTML = '';
}
