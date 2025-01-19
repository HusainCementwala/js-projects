const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

// Function to load notes from localStorage
function showNotes() {
  const storedNotes = localStorage.getItem("notes");
  if (storedNotes) {
    notesContainer.innerHTML = storedNotes;
    attachEventListenersToNotes(); // Reattach event listeners
  }
}

// Function to update localStorage
function updateStorage() {
  localStorage.setItem("notes", notesContainer.innerHTML);
}

// Function to attach event listeners to notes
function attachEventListenersToNotes() {
  const notes = document.querySelectorAll(".input-box");
  notes.forEach(note => {
    note.addEventListener("keyup", updateStorage);
  });
}

// Initial load of notes
showNotes();

// Add a new note
createBtn.addEventListener("click", () => {
  let inputBox = document.createElement("p");
  let img = document.createElement("img");

  inputBox.classList.add("input-box");
  inputBox.setAttribute("contenteditable", "true");
  img.classList.add("delete");
  img.src = "images/delete.png";

  inputBox.appendChild(img);
  notesContainer.appendChild(inputBox);

  // Attach event listener to the new note
  inputBox.addEventListener("keyup", updateStorage);

  updateStorage(); // Save changes to localStorage
});

// Handle delete and storage update
notesContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "IMG") {
    e.target.parentElement.remove();
    updateStorage();
  }
});

// Prevent default Enter key behavior in editable notes
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    document.execCommand("insertLineBreak");
    event.preventDefault();
  }
});






