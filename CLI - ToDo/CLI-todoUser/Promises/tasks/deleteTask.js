const fs = require('fs');
const readline = require('readline-sync');
const path = require('path');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
function deleteTask() {
    let email = readline.question('Enter Your Email: ');
    readFile(path.resolve('data', 'todo.json'))
        .then((data) => {
            let taskData = JSON.parse(data);
            let ref = false;
            taskData.forEach((ele) => {
                if (email === ele.Email) {
                    ref = true;
                    let id = readline.question('Enter The ID To Delete That Task: ');
                    let todo = ele.Todos;
                    let result = todo.filter(item => item.id === id);
                    if (result.length === 0) {
                        throw new Error("Invalid Id");
                        //deleteTask();
                    } else {
                        let index = todo.findIndex(function (data) {
                            return data.id === id;
                        });
                        todo.splice(index, 1)
                        return writeFile(path.resolve('data', 'todo.json'), JSON.stringify(taskData))
                    }
                }
            });
            if (!ref) {
                throw new Error("Invalid Id");
                deleteTask();
            }
        })
        .then(() => {
            console.log("Task Deleted Successfully");
        })
}
module.exports = deleteTask;