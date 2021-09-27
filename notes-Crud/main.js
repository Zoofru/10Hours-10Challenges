let noteContent = document.querySelector('.textareanote')


const saveNote = async (noteContent) => {
    const res = await axios.post('http://localhost:3001/newnote', {
        note: noteContent
    })
    console.log(res);
}

const deleteNote = async (noteId) => {
    console.log(noteId);
    const delres = await axios.delete(`http://localhost:3001/delnotes/${noteId}`)
    console.log(delres);
}

const getAllNotes = async () => {
    const res = await axios.get('http://localhost:3001/allnotes')
    const notes = res.data.allNotes

    currentNote = notes[Math.floor(Math.random() * notes.length)]
    noteContent.value = currentNote.note
    console.log(currentNote);
    document.querySelector('.delbtn').classList.remove('hidden')

    document.querySelector('.delbtn').addEventListener('click', () => {
        deleteNote(currentNote.id);
        getAllNotes()
    })
    
    console.log(res);
}

document.querySelector('.savebtn').addEventListener('click', () => {
    saveNote(noteContent.value)
    console.log(noteContent.value);
})

document.querySelector('.nxt-note').addEventListener('click', () => {
    getAllNotes()
})

document.querySelector('.new-note').addEventListener('click', () => {
    noteContent.value = null
    document.querySelector('.delbtn').classList.add('hidden')
})
