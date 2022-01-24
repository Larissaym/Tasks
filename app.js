'use strict';

// Lädt das Express Framework
const express = require('express');

// Laden des Todo controllers
const todoController = require("./src/controllers/todoController");

// Config
const port = 3000;

// Iniziere ExpressJs
const app = express();

// Middleware to set the use of query string urls
// extended: true <== erlaubt des dekompremieren des body inhalts
app.use(express.urlencoded({extended: true}));

// Middleware to set parsing for incoming requests as json
// Das ersetzt die body parser lib https://www.npmjs.com/package/body-parser
app.use(express.json());

// Middleware to serve static files out of the public folder
app.use(express.static('public'));

/**
 * API Routes
 */

// Alles todos auslesen
app.get('/api/todos', todoController.getAllTodos)

// Ein neues todo erstellen
app.post('/api/todo/create', todoController.createTodo)

// Eine einzelne todo updaten
app.put('/api/todo/update', todoController.updateTodo)

// Eine Eizelne Todo auslesen
app.get('/api/todo', todoController.showTodo)

app.delete('/api/todo/delete', todoController.deleteToDo)

// Starten des EXPRESS node servers
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

// Req from the user localhost/irgendwas/?email=lm@world-architects.com&name=Larissa
//---> middleware
// Response