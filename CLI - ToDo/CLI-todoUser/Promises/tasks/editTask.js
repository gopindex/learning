const fs = require('fs');
const readline = require('readline-sync');
const path = require('path');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
function editTask() {
    let email = readline.question('Enter Your Email: ');
    readFile(path.resolve('data', 'todo.json'))
        .then((data) => {
            let taskData = JSON.parse(data);
            let ref = false;
            taskData.forEach((ele) => {
                if (email === ele.Email) {
                    ref = true;
                    let id = readline.question('Enter The ID To Edit That Task: ');
                    let taskContent = readline.question('Enter The New Task: ');
                    let val = false;
                    let todo = ele.Todos;
                    todo.forEach((ele) => {
                        if (id === ele.id) {
                            val = true;
                            ele.task = taskContent;
                            return writeFile(path.resolve('data', 'todo.json'), JSON.stringify(taskData))
                        }
                    });
                    if (!val) {
                        throw new Error("Invalid Id");
                        editTask();
                    }
                }
            });
            if (!ref) {
                console.log("Invalid Email");
                editTask()
            }
        })
        .then(() => {
            console.log("Task Edited Successfully");
        })
        .catch((err) => {
            console.error(err);
        })
}
module.exports = editTask;