export default function renderGallery(images) {
  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
        <li>
          <a class="gallery__link" href="${largeImageURL}">
            <div class="photo">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" />
              <div class="info">
                <p class="info__text"><b>Likes</b>${likes}</p>
                <p class="info__text"><b>Views</b>${views}</p>
                <p class="info__text"><b>Comments</b>${comments}</p>
                <p class="info__text"><b>Downloads</b>${downloads}</p>
              </div>
            </div>
          </a>
        </li>`;
      }
    )
    .join('');
}
