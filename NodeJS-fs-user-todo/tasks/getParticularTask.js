const fs = require('fs');
const readline = require('readline-sync');
const path = require('path');
function getParticularTask() {
    let email = readline.questionEMail(`Enter Your Email ID:  `);
    const id = readline.question(`Know the Task by it's Particular ID:  `);
    fs.readFile(path.resolve('data', 'todo.json'), (err, fileData) => {
        if (err) {
            throw err;
        } else {
            let data = JSON.parse(fileData);
            let ref = false;
            data.forEach((ele) => {
                if (email == ele.Email) {
                    let todo = ele.Todos;
                    todo.forEach((ele) => {
                        if (id === ele.id) {
                            let show = ele.task;
                            console.log(show.toString());
                            ref = true;
                        }
                    });
                }
            });
            if (!ref) {
                console.log("Invalid ID");
                getParticularTask();
            }
        }
    })
}
module.exports = getParticularTask;