// import axios from "axios";
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";
// import { getImg } from "./fetchphoto";
// import {refs} from "./refs"

// let name = "";

// // const lightbox = new SimpleLightbox(".gallery .photo-card", {
// //     captionsData: "alt",
// //     captionDelay: 250,
// //     captionPosition: "bottom",
// //     showCounter: true,
// //     enableKeyboard: true
// // });

// refs.input.addEventListener("input", inputHandler);
// refs.form.addEventListener("submit", formHandler);
// refs.loadMoreBtn.addEventListener("click", loadMoreBtn);

// function loadMoreBtn() {
//   count += 1;
//    if (name !== "") {
//      getImg().then(photo =>
//        renderGallery(photo) 
//         ).catch(error => error(Notify.failure('Sorry, there are no images matching your search query. Please try again')));
//     };
// };

// function inputHandler(e) {
//      if (refs.input.value === "") {
//      refs.galleryContainer.innerHTML = ""
//      refs.loadMoreBtn.classList.toggle("loadMoreHidden");
//     };
// }

// function formHandler(e) {
//   e.preventDefault();
//   name = refs.input.value.trim();
//     if (name !== "") {
//     refs.loadMoreBtn.classList.toggle("loadMoreVisible");
//       getImg().then(photo =>
//         renderGallery(photo)
//         ).catch(error => error(Notify.failure('Sorry, there are no images matching your search query. Please try again')));
//     };  
// };
    
// function createGallery(array) {
//   return array.hits.reduce((acc, { webformatURL, tags, likes, views, comments, downloads }) => acc +
//     `<div class="photo-card">
//   <img class="photo" src="${webformatURL}" alt="${tags}" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes:</b><b>${likes}</b>
//     </p>
//     <p class="info-item">
//       <b>Views:</b><b>${views}</b>
//     </p>
//     <p class="info-item">
//       <b>Comments:</b><b>${comments}</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads:</b><b>${downloads}</b>
//     </p>
//   </div>
// </div>`, "");
// };

// function renderGallery(array) {
//    if (array.hits.length === 0) {
//             Notify.failure('Sorry, there are no images matching your search query. Please try again')
//           }
//   refs.galleryContainer.insertAdjacentHTML("beforeend", createGallery(array));
// };