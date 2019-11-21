window.onload = function() {

  const makeNote = note => {
    return `<form name="" action="/">
        <button class="delete-note" id="btn-${note.id}">X</button>
        <div class="form-inner">
          <input type="text" placeholder="${note.title}" />
          <textarea
            placeholder="${note.body}"
            rows="5"
          ></textarea>
        </div>
      </form>`;
  };

  const getNotes = async () => {
    const response = await fetch('http://localhost:8080')
    const notes = await response.json()
    createNote(notes)
  }

  const createNote = function(notes) {
    const notesForm= document.querySelector(".notesForm");
    notes.map(note => {
      makeNote(note)
      const divNote = document.createElement("div");
      divNote.innerHTML = makeNote;
      notesForm.appendChild(divNote)
    })
  }

  getNotes()

}

// window.onload = () => {
//   'use strict';

//   if ('serviceWorker' in navigator) {
//     navigator.serviceWorker
//              .register('./serviceWorker.js');
//   }
// }