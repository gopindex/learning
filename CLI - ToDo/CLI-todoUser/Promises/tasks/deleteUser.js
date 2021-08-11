const fs = require('fs');
const readline = require('readline-sync');
const path = require('path');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
function deleteUser() {
    let email = readline.questionEMail(`Enter Your Email address:   `);
    readFile(path.resolve('data', 'todo.json'))
        .then((data) => {
            let taskData = JSON.parse(data);
            let isExists = false;
            taskData.forEach((item, index) => {
                if (item.Email === email) {
                    taskData.splice(index, 1);
                    isExists = true;
                }
            });
            if (!isExists) {
                throw new Error("Invalid Email Id");
                return;
            }
            return writeFile(path.resolve('data', 'todo.json'), JSON.stringify(taskData))
        })
        .then(() => {
            console.log("User Deleted Successfully");
        })
        .catch((err) => {
            console.error(err);
            deleteUser();
        })
}
module.exports = deleteUser;