const fs = require('fs');
const readline = require('readline-sync');
const path = require('path');
function deleteUser() {
    let email = readline.questionEMail(`Enter Your Email address:   `);
    fs.readFile(path.resolve('data', 'todo.json'), (err, data) => {
        if (err) {
            return console.error(err);
        } else {
            let taskData = JSON.parse(data);
            let isExists = false;
            taskData.forEach((item, index) => {
                if (item.Email === email) {
                    taskData.splice(index, 1);
                    isExists = true;
                }
            });
            if (!isExists) {
                console.log(`Invalid Email ID`);
                return;
            }
            fs.writeFile(path.resolve('data', 'todo.json'), JSON.stringify(taskData), (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log("User Is Deleted Successfully");
                }
            });
        }
    })
}
module.exports = deleteUser;