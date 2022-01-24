let ALL_INPUT_VALID;
//const utilities = require("../../src/helpers/utility");
//const {checkDueDate, checkTitle, checkDescription} = require("../../src/validations/validateLib");
const form = document.getElementById('form');
const title = document.getElementById('title');
const description = document.getElementById('description');
const priority = document.getElementById('priority');
const due_date = document.getElementById('due_date');
const category = document.getElementById('category');

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