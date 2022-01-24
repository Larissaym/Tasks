const utilities = require('../helpers/utility');
const validate = require('../validations/validate');
const Todo = require('../models/todoModel')
const moment = require('moment');
const newToDo = new Todo();

// CREATE To Do
// WORKS
function createTodo(req, res) {
    console.log(req.body);
    //Validate request
    if (utilities.isEmpty(req.body)){
        return res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    //Parse data out from request
    let data = {
        "title": req.body.title,
        "description": req.body.description,
        "priority":req.body.priority,
        "category_id":req.body.category,
        "due_date": moment(req.body.due_date, 'DD.MM.YYYY').format('YYYY-MM-DD')
    }

    console.log(data);

    console.log('Following data parsed from body ...');

    // Validate Data from body
    let result = validate.validateToDo(data);

    if (result.isNotValid){
        res.status(406).send(result);
    } else {
        //Save new To Do into database
        newToDo.create(data, (err,result) =>{
            if (err){
                res.status(500).send({
                    message: err.message || "Some error occurred while creating a new customer."
                })
            } else {
                res.status(201).send(result);
            }
        })
    }

}

// UPDATE To Do
// How do I define the id??? Sintax error too?
function updateTodo(req,res){
    //Validate request
    if (utilities.isEmpty(req.body)){
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    console.log(req.body);

    newToDo.updateById(req.body.id, req.body, (err,result) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(500).send({
                    message: `Not found To Do with id ${req.body.id}.`
                });
            } else {
                res.status(201).send({
                    message:  `Error updating To Do with id ${req.body.id}.`
                })
            }
        } else res.send(result);
    })
}

// SHOW ONE To Do
// Uhm Sintax error??
function showTodo(req,res){
    newToDo.getById(req.body.id, req.body, (err,result) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(500).send({
                    message: `Not found To Do with id ${req.params.id}.`
                });
            }
        } else res.send(result);
    })
}

// SHOW ALL To Dos
// WORKSSS OMGGG
function getAllTodos (req,res){
    newToDo.getAll((err,result) => {
        if (err) {
            res.status(201).send({
                message:
                    err.message || "Some error occurred while get all To Dos."
            });
        } else {
            res.send(result);
        }
    })
}

// Some error idk?
function deleteToDo (req,res) {
    newToDo.delete(req.body.id, (err,result) => {
        if (err) {
            res.status(201).send({
                message:
                    err.message || "Some error occurred while deleting To Do."
            });
        } else {
            res.send(result);
        }
    })
}



module.exports = {
    createTodo,
    updateTodo,
    getAllTodos,
    deleteToDo,
    showTodo
}
//
// DELETE FROM `todos` WHERE `id` = 2;
