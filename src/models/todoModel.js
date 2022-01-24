const sql = require('../db');

module.exports = class Todo {
    //constructor
    constructor() {
    }
    // CREATE new To Do
    create(newTodo, cbResult) {
        sql.query('INSERT INTO todos SET ?', newTodo, (err,result) => {
            if (err){
                console.log('error: ',err);
                cbResult(err,null);
                return;
            }
            console.log('created todo: ', {id: result.insertId, ...newTodo});
            cbResult(null,{
                msg: "New todo has been inserted!", id: result.insertId, ...newTodo});
        })

    }

    // UPDATE To Do
    updateById(id, Todo, cbResult) {
        let queryString = 'Update todos SET title = ?, description = ?, due_date = ?';
        queryString += ' WHERE id = ?';
        console.log('output' + queryString);
        sql.query(queryString,
            [Todo.title, Todo.description, Todo.due_date, parseInt(id)],
            (err, result) => {
                if (err){
                    console.log("error: ", err);
                    //err zurückgeben, data = null
                    cbResult(err, null);
                    return;
                }

                if (result.affectedRows === 0){
                    // not found customer with the id
                    cbResult({kind: "not_found"}, null);
                    return;
                }

                console.log("updated Todo: ", {id: id, ...Todo});
                //err = null, data zurückgeben
                cbResult(null, {id: id, ...Todo});

            });
    }

    // SHOW ONE To Do
    getById(id, Todo, cbResult) {
        let queryStringSelect = 'SELECT * FROM todos';
        queryStringSelect += ' WHERE ?';
        sql.query(queryStringSelect,Todo,
            (err, result) => {
                if (err){
                    console.log("error: ", err);
                    //err zurückgeben, data = null
                    cbResult(err, null);
                    return;
                }
                if (result.affectedRows === 0){
                    // not found customer with the id
                    cbResult({kind: "not_found"}, null);
                    return;
                }

                console.log("Todos: ", result);
                //err = null, data zurückgeben
                cbResult(null, result);
            })
    }

    // SHOW ALL To Dos
    getAll(cbResult) {
        sql.query('SELECT * FROM todos', (err,result) => {
            if (err){
                console.log("error: ", err);
                //err zurückgeben, data = null
                cbResult(err, null);
                return;
            }

            console.log("Todos: ", result);
            //err = null, data zurückgeben
            cbResult(null, result);
        })
    }

    // DELETE To Do
    delete(id, cbResult) {
        let queryStringDelete = 'DELETE FROM todos';
        queryStringDelete += ' WHERE id = ' + id;
        sql.query(queryStringDelete,
            (err, result) => {
            if (err){
                console.log('error: ',err);
            }
            if (result.affectedRows === 0){
                // not found customer with the id
                cbResult({kind: "not_found", message: "todo not found"});
                return;
            }
            result.message = 'Todo delete success!';

            cbResult(null, result);
        })
    }
}
