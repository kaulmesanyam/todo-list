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

app.post('/todos', (req, res) => {
    let receivedTodo = req.body;
    let newTodo = {
        id: Math.floor(Math.random() * 1000000),
        title: receivedTodo.title,
        status: receivedTodo.status,
        description: receivedTodo.description,
    }
    fs.readFile('todos.txt', 'utf8', (err, data) => {
        if(err) {
         throw new Error("Error occured while reading file");
        } else {
            const todos = JSON.parse(data);
            todos.push(newTodo);
            fs.writeFile("todos.txt", JSON.stringify(todos), (err) => {
                if(err) {
                    throw new Error("Error occured while writing into the file")
                } else {
                    res.status(201).json(newTodo);
                }
            })

        }
     } )
})

app.delete('/todo/:id', (req, res) => {
    let id = req.params.id;
    fs.readFile("todos.txt", 'utf8', (err, data) => {
        if(err) {
            throw new Error('Error occured while reading file')
        } else {
            let todos = JSON.parse(data);
            for(let i = 0; i < todos.length; i++) {
                if(todos[i].id.toString() === id) {
                    todos.splice(i, 1);
                    break;
                }
            }

            fs.writeFile("todos.txt", JSON.stringify(todos), (err) => {
                if(err) {
                    throw new Error("Error occured while writing into the file")
                } else {
                    res.status(201).json(todos);
                }
            })
        }
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})