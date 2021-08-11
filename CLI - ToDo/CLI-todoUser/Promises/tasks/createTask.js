const fs = require('fs');
const readline = require('readline-sync');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const util = require('util');
const { create } = require('domain');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
function createTask() {
    let emailUser = readline.question(`Enter Email: `);
    readFile(path.resolve('data', 'todo.json'))
        .then((fileData) => {
            let data = JSON.parse(fileData.toString());
            let ref = false;
            data.forEach((ele) => {
                if (emailUser == ele.Email) {
                    let task = readline.question(`Enter The Task:`);
                    let store = ele.Todos;
                    let newTask = { id: uuidv4(), task: task };
                    store.push(newTask);
                    ref = true;
                    return writeFile(path.resolve('data', 'todo.json'), JSON.stringify(data));
                }
            });
            if (!ref) {
                throw new Error("Invalid Id");
                //createTask();
            }
        })
        .then(() => {
            console.log("Task Added Successfully");
        })
        .catch((err) => {
            console.error(err);
            createTask();
        })
}
module.exports = createTask;