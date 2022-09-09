const newNoteButton = document.querySelector('#add-note-button');
const notesContainer = document.querySelector('#notes-parent-div');

const notes = JSON.parse(localStorage.getItem('notes'));
if (notes) {
    notes.forEach(note => createNewNote(note));
}

newNoteButton.addEventListener('click', () => {
    createNewNote();
});

function createNewNote(text = '') {
    let noteElement = document.createElement('div');
    noteElement.setAttribute('class', 'note-div');
    noteElement.innerHTML =
    `
        <div class='notes'>
            <div class='tools'>
                <button class='edit'><i class="fas fa-edit"></i></button>
                <button class='delete'><i class="fas fa-trash-alt"></i></button>
            </div>
            <div class='text-display ${text ? '' : 'hidden'}'></div>
            <textarea class='${text ? 'hidden' : ''}'></textarea>
        </div>
    `;

    const deleteButton = noteElement.querySelector('.delete');
    const editButton = noteElement.querySelector('.edit');
    const textInput = noteElement.querySelector('textarea');
    const textDisplay = noteElement.querySelector('.text-display');

    textInput.innerHTML = text;
    textDisplay.innerHTML = text;

    deleteButton.addEventListener('click', () => {
        notesContainer.removeChild(noteElement);
        updateLocalStorage();
    });

    editButton.addEventListener('click', () => {
        textDisplay.classList.toggle('hidden');
        textInput.classList.toggle('hidden');
    });

    textInput.addEventListener('input', (e) => {
        textDisplay.innerHTML = textInput.value;
        updateLocalStorage();
    });

    notesContainer.appendChild(noteElement);
}

function updateLocalStorage() {
    let notesArr = [];
    const allNoteTextAreas = document.querySelectorAll('textarea');
    allNoteTextAreas.forEach(noteTextArea => notesArr.push(noteTextArea.value));

    localStorage.setItem('notes', JSON.stringify(notesArr));
}