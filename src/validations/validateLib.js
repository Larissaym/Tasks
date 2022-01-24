const moment = require('moment');
const utilities = require("../helpers/utility");

function checkTitle(id, input, min, max) {
    //Default: is valid. Min + Max Characters are defined in todoController
    let result = {
        isNotValid: false,
        msg: 'Title is valid'
    }
    if (input.length < min) {
        result = {
            isNotValid: true,
            msg: `Title must be at least ${min} characters`
        }
    } else if (input.length > max) {
        result = {
            isNotValid: true,
            msg: `Title must be less than ${max} characters`
        }
    }
    return result;
}

function checkDescription (id, input, min, max) {
    // Description is optional but has a max length
    let result = {
        isNotValid: false,
        msg: 'Description is valid'
    }

    if (input.length > max) {
        result = {
            isNotValid: true,
            msg: `Description must be less than ${max} characters`
        }
    }
    return result;
}
//??
function checkCategory (categoryId) {
    let result = {
        isNotValid: false,
        msg: 'Category is valid'
    }

    if (!categoryId) {
        result = {
            isNotValid: true,
            msg: 'please choose a category'
        }
    }

    return result;
}

function checkDueDate (id, input) {
    // Check format of the due date. Needs to be dd/mm/yyyy
    let result = {
        isNotValid: false,
        msg: 'Due Date is valid'
    }

    let dateCheck = moment(input, 'YYYY-DD-MM').isValid()

    if (!dateCheck) {
        result = {
            id: id,
            isNotValid: true,
            msg: 'Due date is not valid. Please enter a valid due date: YYYY-DD-MM'
        }
    }
    return result;
}
//????
function checkPriority (input) {
    let result = {
        isNotValid: false,
        msg: 'Priority is valid'
    }

    if (utilities.isEmpty(input)) {
        result = {
            isNotValid: true,
            msg: 'Priority is not valid. Please choose a valid priority'
        }
    }
    return result;
}

module.exports = {
    checkTitle,
    checkDescription,
    checkCategory,
    checkDueDate,
    checkPriority
}