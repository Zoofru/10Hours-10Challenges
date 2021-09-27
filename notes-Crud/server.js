const models = require('./models')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(require('cors')())

const newNote = async (req, res) => {
    console.log(req.body.note);
    const note = await models.Notes.create({
        note: req.body.note
    })
    res.json({note})
}

const getAllNotes = async (req, res) => {
    const allNotes = await models.Notes.findAll()
    res.json({allNotes})
}

const delNote = async (req, res) => {
    console.log(req.params.id);
    const note = await models.Notes.destroy({
        where: {
            id: req.params.id
        }
    })
    res.json({note})
}

app.post('/newnote', (req, res) => {
    newNote(req, res)
})

app.get('/allnotes', (req, res) => {
    getAllNotes(req, res)
})

app.delete('/delnotes/:id', (req, res) => {
    delNote(req, res)
})

app.listen(PORT, () => {
    console.log('the server is listening!')
})