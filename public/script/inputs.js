let ALL_INPUT_VALID;
//const utilities = require("../../src/helpers/utility");
//const {checkDueDate, checkTitle, checkDescription} = require("../../src/validations/validateLib");
const form = document.getElementById('form');
const title = document.getElementById('title');
const description = document.getElementById('description');
const priority = document.getElementById('priority');
const due_date = document.getElementById('due_date');
const category = document.getElementById('category');


// Check empty Fields - where check is required
// function checkRequired(inputArr) {
//     let isRequired = false;
//     inputArr.forEach(function (input) {
//         if (utilities.isEmpty(input)) {
//             showError(`Input is required`);
//             isRequired = true;
//             ALL_INPUT_VALID = false;
//         }else {
//             showSuccess(input);
//         }
//     });
//     return isRequired;
// }

// Validate form input elements from the validateLib.js
// function validateForm() {
//     if (!checkRequired([title, description,due_date])) {
//         checkTitle(title, 3, 20);
//         checkDescription(description, 5, 80);
//         checkDueDate(due_date);
//     }
// }

// Event listeners
form.addEventListener('submit', function (e) {
    ALL_INPUT_VALID = true;
    e.preventDefault();
    //Send data
    if (ALL_INPUT_VALID) {
        let formData = {
            title: title.value,
            description: description.value,
            priority: priority.value,
            due_date: due_date.value,
            category: category.value
        }
        console.log(`All input is valid. Send data to server: 
      ${JSON.stringify(formData)}`);

        sendForm1(formData)
            .then(result => {
                console.log(`Response from server: ${result}`);
            }).catch(err => {
                console.log(`Error occurred: ${err}`)
        });
        window.location.href = '/';
        // window.setTimeout(function() {
        //     window.location.href = '/';
        // },);
    } else {
        console.log("At least one validation failed. No data sent to contact-server.");
    }
    alert("Successfully inserted!");
});