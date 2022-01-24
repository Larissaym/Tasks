const SERVER = 'http://localhost:3000';


function sendForm1(data) {
    return fetch(SERVER+'/api/todo/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(res => res.text())
        .catch(err => {
            console.log(`Error occurred: ${err}`)
        })
}