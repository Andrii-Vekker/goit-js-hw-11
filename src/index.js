import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

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
  photoCard: document.querySelector(".photo-card")
};

refs.input.addEventListener("input", inputHandler);
refs.form.addEventListener("submit", formHandler);
refs.loadMoreBtn.addEventListener("click", loadMoreBtn);

async function getImg() {
   try {
     const response = await axios.get
        (`${URL}?key=${KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${count}&per_page=40`);
    return response.data
   } catch (error) {
     console.log(error);
  };
};

function loadMoreBtn() {
  count += 1;
   if (name !== "") {
        getImg().then(photo =>
        renderGallery(photo) 
        ).catch(error => error(Notify.failure('Sorry, there are no images matching your search query. Please try again')));
    };
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
  name = refs.input.value.trim();
  
  if (name !== "") {
    refs.loadMoreBtn.classList.toggle("loadMoreVisible");
      getImg().then(photo =>
        renderGallery(photo)         
        ).catch(error => error(Notify.failure('Sorry, there are no images matching your search query. Please try again')));
    };
};
    
function createGallery(array) {
  return array.hits.reduce((acc, { webformatURL, tags, likes, views, comments, downloads }) => acc +
    `<div class="photo-card">
  <img class="photo" src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes:</b><b>${likes}</b>
    </p>
    <p class="info-item">
      <b>Views:</b><b>${views}</b>
    </p>
    <p class="info-item">
      <b>Comments:</b><b>${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads:</b><b>${downloads}</b>
    </p>
  </div>
</div>`, "");
};

function renderGallery(array) {
  console.log(array)
   if (array.hits.length === 0) {
     Notify.failure('Sorry, there are no images matching your search query. Please try again');
  };
  if (count > array.total.Hits) {
    Notify.failure('Were sorry, but you ve reached the end of search results');
  }

  refs.galleryContainer.insertAdjacentHTML("beforeend", createGallery(array));
};


