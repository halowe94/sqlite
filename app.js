
const express = require ('express');
const sqlite3 = require('sqlite3').verbose()
const app = express();
const port = 3000;

app.use(express.json());
//app.use(express.urlencoded({extended: true}))

const db = new sqlite3.Database('./notes.db', (err) => {
    if (err) {
        return console.error(err.message);
    }

    console.log('The Notes SQLite database is now open and connected');
});

db.serialize(function () {
    db.run ("CREATE TABLE IF NOT EXISTS 'notes' ('note' TEXT, PRIMARY KEY ('uid'))", [], 
    function(err) {
        if (err) {
            return console.error(err.message);
        }
        console.log('"notes" table exists')
    })
})

db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('The Notes SQLite database was successfully closed')
})


//routes
app.post('/api/note', (req, res) => {
   const db = new sqlite3.Database('./notes.db', function(err) {
       if (err) {
           return console.error(err.message);
       }
       console.log ('The Notes SQLite database is now open and connected on post route');
   })

   db.serialize(function () {
       db.get("INSERT INTO 'notes' VALUES (?)", [req.body.noteContents],
       function(err) {
        if (err) {
            return console.error(err.message);
        }
        res.send(this.uid)
       })
   })

   db.close(function(err) {
       if(err) {
           return console.error(err.message);
       }
       console.log('The Notes Database was successfully closed')
   })
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
