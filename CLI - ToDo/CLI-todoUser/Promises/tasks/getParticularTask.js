const fs = require('fs');
const readline = require('readline-sync');
const path = require('path');
const util = require('util');
const readFile = util.promisify(fs.readFile);
function getParticularTask() {
    let email = readline.question('Enter Your Email: ')
    readFile(path.resolve('data', 'todo.json'))
        .then((data) => {
            let taskData = JSON.parse(data);
            let ref = false;
            taskData.forEach((ele) => {
                if (email === ele.Email) {
                    ref = true;
                    let id = readline.question('Enter The ID To Get The Particular Task: ');
                    let val = false;
                    let todo = ele.Todos;
                    todo.forEach((ele) => {
                        if (id === ele.id) {
                            val = true
                            console.log(ele.task);
                        }
                    });
                    if (!val) {
                        throw new Error("Invalid Id");
                    }
                }
            })
            if (!ref) {
                throw new Error("Invalid Email");
            }
        })
        .catch((err) => {
            //console.error(err);
            getParticularTask();
        })
}
module.exports = getParticularTask;