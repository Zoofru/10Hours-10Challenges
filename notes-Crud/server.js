const models = require('./models')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(require('cors')())

const newNote = async (req, res) => {
    const note = await models.Notes.create({
        note: 'hi'
    })
    res.json({note})
}

app.get('/newnote', (req, res) => {
    newNote(req, res)
})

app.listen(PORT, () => {
    console.log('the server is listening!')
})