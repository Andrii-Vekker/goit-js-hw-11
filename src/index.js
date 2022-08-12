import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getImg } from "./fetchphoto";
export { name, count }

const URL = `https://pixabay.com/api/`;
const KEY = `29175258-0e972b66084e1db5719a62740`;

let name = "";

  let count = 1;

const refs = {
  form: document.querySelector(".search-form"),
  input: document.querySelector(".input"),
  formBtn: document.querySelector(".formBtn"),
  galleryContainer: document.querySelector(".gallery"),
  loadMoreBtn: document.querySelector(".load-more"),
  photoCard: document.querySelector(".photo-card"),
  gallery: document.querySelector(".gallery")
};

refs.gallery.addEventListener("click", galleryHandler)
refs.input.addEventListener("input", inputHandler);
refs.form.addEventListener("submit", formHandler);
refs.loadMoreBtn.addEventListener("click", loadMoreBtnHandler);

function galleryHandler(e) {
  e.preventDefault();
  const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
  captionPosition: "bottom",
  showCounter: true,
  enableKeyboard: true
});
}

function loadMoreBtnHandler() {
  count += 1;
   if (name !== "") {
        getImg().then(photo =>
        renderGallery(photo) 
        ).catch(error => console.log(error));
  };
  return count
};

function inputHandler(e) {
  
   if (refs.input.value === "") {
     refs.galleryContainer.innerHTML = ""
     refs.loadMoreBtn.classList.add("loadMoreHidden");
     refs.loadMoreBtn.classList.remove("loadMoreVisible");
    };
}

function formHandler(e) {
  e.preventDefault();
  
  refs.loadMoreBtn.classList.add("loadMoreHidden");
  name = refs.input.value.trim();
   refs.galleryContainer.innerHTML = ""
  if (name === "" ) {
    Notify.failure('Sorry, there are no images matching your search query. Please try again');
     refs.loadMoreBtn.classList.remove("loadMoreVisible");
refs.loadMoreBtn.classList.add("loadMoreHidden")
    };
    if (name !== "") {
      refs.loadMoreBtn.classList.add("loadMoreVisible");
      refs.loadMoreBtn.classList.remove("loadMoreHidden")
      getImg().then(photo =>
        renderGallery(photo)         
        ).catch(error => error(console.log(error)));
    };
};
    
function createGallery(array) {
  return array.hits.reduce((acc, { largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => acc +
    `<a gallery__item" href="${largeImageURL}">
  <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy"/>
   <div class="info">
     <p class="info-item">
       <b class="b">Likes:</b><b>${likes}</b>
    </p>
     <p class="info-item">
       <b>Views:</b><b>${views}</b>
     </p>
     <p class="info-item">
       <b>Comments:</b><b>${comments}</b>
     </p>
     <p class="info-item">
       <b>Downloads:</b><b>${downloads}</b>/</p>
   </div>
  </a>`, "");
};

function renderGallery(array) {
     if (count > array.totalHits/40) {
          Notify.failure('Were sorry, but you ve reached the end of search results');
    refs.loadMoreBtn.classList.remove("loadMoreVisible")
    refs.loadMoreBtn.classList.add("loadMoreHidden")
  };
  refs.galleryContainer.insertAdjacentHTML("beforeend", createGallery(array));
};




