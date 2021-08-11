const fs = require('fs');
const readline = require('readline-sync');
const util = require('util');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

async function createTask() {
    try {
        let task = readline.question(`Enter The Task:`);
        const fileData = await readFile(path.resolve('data', 'todo.json'))
        let data = JSON.parse(fileData.toString());
        let newTask = { id: uuidv4(), task: task };
        data.push(newTask);
        await writeFile(path.resolve('data', 'todo.json'), JSON.stringify(data));
        console.log(`Task is Added Successfully`);
    }
    catch (err) {
        throw new Error(err);
    }

}
module.exports = createTask;