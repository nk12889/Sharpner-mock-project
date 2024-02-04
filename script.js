document.addEventListener('DOMContentLoaded', async () => {
    await updateNoteCounts();
    await displayNotes();
});

async function updateNoteCounts() {
    try {
        const response = await axios.get('https://crudcrud.com/api/5cfad60d03294807aa64b5106229320e/notes'); // Replace with your actual API endpoint
        const notes = response.data;
        const totalCount = notes.length;

        document.getElementById('total-count').innerText = totalCount;
        document.getElementById('showing-count').innerText = totalCount;
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

async function displayNotes() {
    try {
        const response = await axios.get('https://crudcrud.com/api/5cfad60d03294807aa64b5106229320e/notes'); // Replace with your actual API endpoint
        const notes = response.data;

        const noteListContainer = document.getElementById('note-list');
        noteListContainer.innerHTML = '';

        notes.forEach((note) => {
            const noteContainer = document.createElement('div');
            noteContainer.innerHTML = `
                <p><strong>Title:</strong> ${note.title}</p>
                <p><strong>Description:</strong> ${note.description}</p>
                <button onclick="deleteNoteAndUpdateCounts('${note._id}')">Delete</button>
            `;
            noteListContainer.appendChild(noteContainer);
        });
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

async function addToNotebook() {
    const noteTitle = document.getElementById('note-title').value;
    const noteDesc = document.getElementById('textarea').value;

    if (!noteTitle || !noteDesc) {
        alert('Please enter valid data');
        return;
    }

    try {
        await axios.post('https://crudcrud.com/api/5cfad60d03294807aa64b5106229320e/notes', { title: noteTitle, description: noteDesc }); // Replace with your actual API endpoint
        await updateNoteCounts();
        await displayNotes();
        clearInputs();
    } catch (error) {
        console.error('Error adding note:', error.message);
    }
}

async function deleteNoteAndUpdateCounts(noteId) {
    try {
        await axios.delete(`https://crudcrud.com/api/5cfad60d03294807aa64b5106229320e/notes/${noteId}`); // Replace with your actual API endpoint
        await updateNoteCounts();
        await displayNotes();
    } catch (error) {
        console.error('Error deleting note:', error.message);
    }
}

function clearInputs() {
    document.getElementById('note-title').value = '';
    document.getElementById('textarea').value = '';
}

async function searchNotes() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    try {
        const response = await axios.get('https://crudcrud.com/api/5cfad60d03294807aa64b5106229320e/notes'); // Replace with your actual API endpoint
        const notes = response.data;

        const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(searchTerm));

        const noteListContainer = document.getElementById('note-list');
        noteListContainer.innerHTML = '';

        filteredNotes.forEach((note) => {
            const noteContainer = document.createElement('div');
            noteContainer.innerHTML = `
                <p><strong>Title:</strong> ${note.title}</p>
                <p><strong>Description:</strong> ${note.description}</p>
                <button onclick="deleteNoteAndUpdateCounts('${note._id}')">Delete</button>
            `;
            noteListContainer.appendChild(noteContainer);
        });

        document.getElementById('showing-count').innerText = filteredNotes.length;
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}