
const express = require ('express');
const sqlite3 = require('sqlite3').verbose()
const app = express();
const port = 3000;

const notes = { };
let uniqueID = 1;

app.use(express.json());
//app.use(express.urlencoded({extended: true}))

//routes
app.post('/api/note', (req, res) => {
    console.log("req body " + JSON.stringify(req.body))
    notes[uniqueID] = req.body.noteContents
    res.status(201).send("" + uniqueID++)
})

app.get('/api/note/:uid', (req, res) => {

    console.log(req.params.uid)
    res.send(notes[req.params.uid])

  
})

app.put('/api/note/:uid', (req, res) => {
    notes[req.params.uid] = req.body.noteContents
    res.send(notes[req.params.uid])
})

app.delete('/api/note/:uid', (req, res) => {
    const removedNote = notes[req.params.uid]
    delete notes[req.params.uid]
    res.send(removedNote)
})

app.get('/api/notes', (req, res) => {
    res.json(Object.keys(notes))
})

app.get('/home.html', (req, res) => {
    res.sendFile(__dirname + '/home.html')
})

app.get('/home.js', (req, res) => {
    res.sendFile(__dirname + '/home.js')
})

//app listening
app.listen(port, () => {
    console.log(`app listening on port ${port}`)
  })
