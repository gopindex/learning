const fs = require('fs');
const readline = require('readline-sync');
const path = require('path');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
function deleteTask() {
    const id = readline.question(`Enter the ID to Delete the Task:  `);
    readFile(path.resolve('data', 'todo.json'))
        .then((data) => {
            let taskData = JSON.parse(data);
            let isExists = false;
            taskData.forEach((item, index) => {
                if (item.id === id) {
                    taskData.splice(index, 1);
                    isExists = true;
                }
            });
            if (!isExists) {
                throw new Error("Invalid Id");
            }
            return writeFile(path.resolve('data', 'todo.json'), JSON.stringify(taskData))
        })
        .then(() => {
            console.log(`Task is Deleted Successfully`);
        })
        .catch((err) => {
            console.error(err);
        })
}
module.exports = deleteTask;