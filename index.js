const express = require('express')
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');


const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true}));



app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

app.get('/todos', (req, res) => {
    fs.readFile('todos.txt', 'utf8', (err, data) => {
       if(err) {
        new Error("Error occured while reading file");
       } else {
        res.json(JSON.parse(data));
       }
    } )
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})