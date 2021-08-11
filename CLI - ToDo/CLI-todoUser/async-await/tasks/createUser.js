const fs = require('fs');
const readline = require('readline-sync');
const path = require('path');
function createUser() {
    let email = readline.question('Enter Your Email: ');
    let name = readline.question('Enter Your Name: ');
    fs.readFile(path.resolve('data', 'todo.json'), (err, fileData) => {
        if (err) {
            console.error(err);
        }
        else {
            let data = JSON.parse(fileData.toString());
            let result = data.filter(item => item.Email === email);
            if (result.length !== 0) {
                console.log("This Email Already Exist");
                createUser();
            }
            else {
                let newTask = { Email: email, Name: name, Todos: [] };
                data.push(newTask);
                fs.writeFile(path.resolve('data', 'todo.json'), JSON.stringify(data), (err) => {
                    if (err) {
                        console.error(err);
                    }
                    else {
                        console.log("Task Is Added Successfully");
                    }
                })
            }
        }
    })
}
module.exports = createUser;