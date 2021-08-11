const fs = require('fs');
const readline = require('readline-sync');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
function createTask() {
    let emailUser = readline.question(`Enter Your Email: `);
    fs.readFile(path.resolve('data', 'todo.json'), (err, fileData) => {
        if (err) {
            console.error(err);
        } else {
            let data = JSON.parse(fileData.toString());
            let ref = false;
            data.forEach((ele) => {
                if (emailUser == ele.Email) {
                    let task = readline.question(`Enter The Task:`);
                    let store = ele.Todos;
                    let newTask = { id: uuidv4(), task: task };
                    store.push(newTask);
                    ref = true;
                    fs.writeFile(path.resolve('data', 'todo.json'), JSON.stringify(data), (err) => {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log("Todo added successfully");
                        }
                    })
                }
            });
            if (!ref) {
                console.log("Invalid ID");
                createTask();
            }
        }
    });
}
module.exports = createTask;