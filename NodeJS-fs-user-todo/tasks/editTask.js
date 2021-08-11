const fs = require('fs');
const readline = require('readline-sync');
const path = require('path');
function editTask() {
    let email = readline.question('Enter Your Email: ');
    let id = readline.question('Enter The ID To Edit That Task: ');
    let taskContent = readline.question('Enter The New Task: ');
    fs.readFile(path.resolve('data', 'todo.json'), (err, data) => {
        if (err) {
            console.error(err);
        }
        else {
            let taskData = JSON.parse(data);
            let ref = false;
            taskData.forEach((ele) => {
                if (email === ele.Email) {
                    let todo = ele.Todos;
                    todo.forEach((ele) => {
                        if (id === ele.id) {
                            ele.task = taskContent;
                            ref = true;
                        }
                    });
                }
            });
            fs.writeFile(path.resolve('data', 'todo.json'), JSON.stringify(taskData), (err) => {
                if (err) {
                    console.error(err);
                }
                else {
                    console.log("Task Is Edited Successfully");
                }
            })
        }
    })
}
module.exports = editTask;