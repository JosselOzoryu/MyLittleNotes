const router = require('express').Router()
const notes = require('./notes')

const counter = 1
router.get('/', (req, res) => {
    res.json(notes)
})

router.post('/', (req, res) => {
    const title = req.body.title
    const body = req.body.body 
    const note = {
        id: counter,
        title: title,
        body: body
    }
    notes.push(note)
    counter++
    res.json({response: 'note created'})
})


module.exports = router