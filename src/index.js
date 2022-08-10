import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const URL = `https://pixabay.com/api/`
const KEY = `29175258-0e972b66084e1db5719a62740`

let name = ""
const Storage = "storageKey"
const refs = {
    form: document.querySelector(".search-form"),
    input: document.querySelector(".input"),
    formBtn: document.querySelector(".formBtn"),
    galleryContainer: document.querySelector(".gallery"),
    loadMoreBtn: document.querySelector(".load-more"),
    photoCard: document.querySelector(".photo-card")
}

// const lightbox = new SimpleLightbox(".gallery .photo-card", {
//     captionsData: "alt",
//     captionDelay: 250,
//     captionPosition: "bottom",
//     showCounter: true,
//     enableKeyboard: true
// });


refs.form.addEventListener("submit", formHandler)

async function getImg() {
   try {
     const response = await axios.get
        (`${URL}?key=${KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`);
    return response.data.hits
   } catch (error) {
    console.log(error)
   }
}

function formHandler(e) {
    e.preventDefault();
   
    name = refs.input.value.trim();
    localStorage.setItem(KEY, name)
     const storageName = localStorage.getItem(KEY)
    console.log(storageName)
    if (name !== "") {
        getImg().then(photo =>
            renderGallery(photo)
        
        ).catch(error => error(Notify.failure("Oops, there is no country with that name")));
    };
    if (storageName !== name) {
        refs.galleryContainer.innerHTML =""
    };
    
}
    
function createGallery(array) {
    console.log(array)
   return array.reduce((acc, {webformatURL, tags, likes, views, comments, downloads }) => acc + 
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
</div>`, "")
}

function renderGallery(array) {
    refs.galleryContainer.insertAdjacentHTML("beforeend", createGallery(array))
}

function morePhoto() {
    
}

