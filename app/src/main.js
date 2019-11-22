window.addEventListener("load", () => {
  const notesForm = document.querySelector(".notesForm");
  const addNoteButton = document.querySelector(".add-note");
  const makeNote = note => `
  <form name="" action="/">
        <button class="delete-note" id="btn-${note.id}">X</button>
        <div class="form-inner">
          <input type="text" placeholder="${note.title}" />
          <textarea
            placeholder="${note.body}"
            rows="5"
          ></textarea>
        </div>
      </form>
  `;

  const getNotes = async () => {
    const notesArray = await get();
    console.log(notesArray);
    notesArray.map(oneNote => createNote(oneNote));
  };

  const createNote = function(note) {
    const noteNode = document.createElement("div");
    noteNode.setAttribute("id", `note-${note.id}`);
    noteNode.innerHTML = makeNote(note);
    notesForm.appendChild(noteNode);
    deleteNote(note.id);
  };

  const deleteNote = function(id) {
    const deleteButton = document.querySelector(`#btn-${id}`);
    const noteDiv = document.querySelector(`#note-${id}`);
    const parentNode = noteDiv.parentNode;
    deleteButton.addEventListener("click", event => {
      //event.preventDefault();
      deleteFromServer(id);
      parentNode.removeChild(noteDiv);
    });
  };

  addNoteButton.addEventListener("click", async () => {
    const note = await post();
    createNote(note);
  });

  getNotes();

  //Server petitions

  async function get() {
    const response = await fetch("http://localhost:8080");
    const notes = await response.json();
    return notes;
  }

  async function post() {
    const response = await fetch("http://localhost:8080", {
      body: JSON.stringify({
        title: "",
        body: ""
      }),
      method: "POST",
      headers: { "Content-Type": "application/json" }
    });
    const data = await response.json();
    return data.note;
  }

  async function deleteFromServer(id) {
    await fetch(`http://localhost:8080/${id}`, {
      method: "DELETE"
    });
  }
});

// window.onload = () => {
//   "use strict";

//   if ("serviceWorker" in navigator) {
//     navigator.serviceWorker.register("./serviceWorker.js");
//   }
// };
