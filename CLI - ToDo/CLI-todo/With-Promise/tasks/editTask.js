const fs = require('fs');
const readline = require('readline-sync');
const path = require('path');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

function editTask() {
    let id = readline.question('Enter The ID To Edit That Task: ');

    readFile(path.resolve('data', 'todo.json'))
        .then((fileData) => {
            let data = JSON.parse(fileData);
            let taskContent = readline.question(`Enter The Content:  `);
            let ref = false;
            data.forEach((ele) => {
                if (id == ele.id) {
                    ele.task = taskContent;
                    ref = true;
                }
                return writeFile(path.resolve('data', 'todo.json'), JSON.stringify(data));
            });
            if (!ref) {
                throw new Error("Invalid Id");
            }
        })
        .then(() => {
            console.log(`The Task is Edited Successfully`);
        })
        .catch((err) => {
            console.error(err);
            editTask();
        })
}
module.exports = editTask;