const fs = require('fs');
const readline = require('readline-sync');
const path = require('path');
function getAllTask() {
    let email = readline.questionEMail('Enter Your Email:  ');
    fs.readFile(path.resolve('data', 'todo.json'), (err, fileData) => {
        if (err) {
            throw err;
        } else {
            let data = JSON.parse(fileData);
            let ref = false;
            data.forEach((ele) => {
                if (email === ele.Email) {
                    let todo = ele.Todos;
                    todo.forEach((ele) => {
                        console.log(ele.task);
                        ref = true;
                    })
                }
            })
            if (!ref) {
                console.log("Email ID Doesn't Exist");
                getAllTask();
            }
        }

    })
}
module.exports = getAllTask;