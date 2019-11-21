const makeNote = noteID => {
  return `<button class="delete-note">X</button><div class="form-inner"><input type="text" placeholder="Your note title" /><textarea placeholder="Start writing your note here..."rows="5"></textarea></div>`;
};

const addNoteToBody = note => {
  const body = document.querySelector("body");
  const form = document.createElement("form");
  form.innerHTML = note;
  body.appendChild(form);
};

window.onload = () => {
  'use strict';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./serviceWorker.js');
  }
}