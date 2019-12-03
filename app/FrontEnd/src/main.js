window.addEventListener("load", () => {
  window.addEventListener("online", () => console.log("We are online"));
  window.addEventListener("offline", () => console.log("We are offline"));
  const notesForm = document.querySelector(".notesForm");
  const addNoteButton = document.querySelector(".add-note");
  const makeNote = note => `
  <form name="" action="/">
        <button class="delete-note" id="btn-${note.id}">X</button>
        <div class="form-inner">
          <input placeholder="Note title" type="text" id="title-${note.id}" value="${note.title}"></input>
          <textarea placeholder="Write your note here..." id="body-${note.id}"
            rows="5"
          >${note.body}</textarea>
        </div>
      </form>
  `;

  function saveNote(id) {
    const savedText = document.getElementById(`body-${id}`);
    savedText.addEventListener("focus", () => {
      interval = setInterval(() => {
        const title = document.getElementById(`title-${id}`);
        const data = { title: title.value, body: savedText.value };
        put(data, id);
      }, 1000);
    });
    savedText.addEventListener("blur", () => {
      clearInterval(interval);
    });
  }

  const getNotes = async () => {
    const notesArray = await get();
    notesArray.map(oneNote => createNote(oneNote));
  };

  const createNote = function(note) {
    const noteNode = document.createElement("div");
    noteNode.setAttribute("id", `note-${note.id}`);
    noteNode.innerHTML = makeNote(note);
    notesForm.appendChild(noteNode);
    deleteNote(note.id);
    saveNote(note.id);
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
    const response = await fetch("http://localhost:8080/api/notes");
    const notes = await response.json();
    return notes;
  }

  async function post() {
    if (navigator.onLine) {
      const response = await fetch("http://localhost:8080/api/notes", {
        body: JSON.stringify({
          title: "",
          body: ""
        }),
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      console.log("Offline");
    }
  }

  async function put(data, id) {
    if (navigator.onLine) {
      const response = await fetch(`http://localhost:8080/api/notes/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      });
      return response;
    } else {
      console.log("Offline");
    }
  }

  async function deleteFromServer(id) {
    if (navigator.onLine) {
      await fetch(`http://localhost:8080/api/notes/${id}`, {
        method: "DELETE"
      });
    } else {
      localStorage.setItem(`req`);
    }
  }
});
