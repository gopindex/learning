const fs = require('fs');
const path = require('path');
const readline = require('readline-sync')
const util = require('util');
const readFile = util.promisify(fs.readFile);
function getAllTask() {
    let email = readline.question('Enter Your Email ID: ')
    readFile(path.resolve('data', 'todo.json'))
        .then((data) => {
            let taskData = JSON.parse(data);
            let ref = false;
            taskData.forEach((ele) => {
                if (email === ele.Email) {
                    let todo = ele.Todos;
                    todo.forEach((ele) => {
                        ref = true;
                        console.log(ele.task);
                    })
                }
            });
            if (!ref) {
                throw new Error("Invalid Email");
            }
        })
        .catch((err) => {
            //console.error(err);
            getAllTask()

        })
}
module.exports = getAllTask;