const fs = require('fs');
const readline = require('readline-sync');
const util = require('util');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

function createTask() {
    let task = readline.question(`Enter The Task:`);
    readFile(path.resolve('data', 'todo.json'))
        .then((fileData) => {
            let data = JSON.parse(fileData.toString());
            let newTask = { id: uuidv4(), task: task };
            data.push(newTask);
            return writeFile(path.resolve('data', 'todo.json'), JSON.stringify(data));
        })
        .then(() => {
            console.log(`Task is Added Successfully`);
        })
        .catch((err) => {
            console.error(err);
        })

}
module.exports = createTask;