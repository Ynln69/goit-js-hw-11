export default function renderImageGallery(images) {
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
          <a class="gallery-link" href="${largeImageURL}">
            <div class="card-photo">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" />
              <div class="card-info">
                <p class="info-text"><b>Likes</b>${likes}</p>
                <p class="info-text"><b>Views</b>${views}</p>
                <p class="info-text"><b>Comments</b>${comments}</p>
                <p class="info-text"><b>Downloads</b>${downloads}</p>
              </div>
            </div>
          </a>
        </li>`;
      }
    )
    .join('');
}
