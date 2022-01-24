const validateLib = require("./validateLib");

function validateToDo(data) {
        // Check length of Title (Still gotta make the right path for the input)
        let result = validateLib.checkTitle("title", data.title, 3, 30);
        if (result.isNotValid) { return result; }

        // Check length of description (input path missing!!)
        result = validateLib.checkDescription("description", data.description, 0, 70);
        if (result.isNotValid) { return result; }

        // How do I check the theme??
        result = validateLib.checkCategory(data.category_id);
        if (result.isNotValid) { return result; }

        //check due date?
        result = validateLib.checkDueDate("due_date", data.due_date);
        if (result.isNotValid) { return result; }

        result = validateLib.checkPriority("priority", data.priority);
        if (result.isNotValid) { return result; }

        //all inputs are valid and isNotValid=false
        return false;
    }

module.exports = {
    validateToDo
}

