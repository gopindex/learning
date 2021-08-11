const fs = require('fs');
const readline = require('readline-sync');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
async function createTask() {
    try {
        let emailUser = readline.questionEMail(`Enter Email: `);
        let fileData = await readFile(path.resolve('data', 'todo.json'))
        let data = JSON.parse(fileData.toString());
        let ref = false;
        data.forEach((ele) => {
            if (emailUser == ele.EmailID) {
                let task = readline.question(`Enter The Task:`);
                let store = ele.Todo;
                let newTask = { ID: uuidv4(), Task: task };
                ref = true;
                store.push(newTask);
            }
        });
        if (!ref) {
            throw new Error("Entered Email ID is Not Registered ")
        }
        await writeFile(path.resolve('data', 'todo.json'), JSON.stringify(data));
        console.log("Todo added successfully");
    } catch (err) {
        console.error(err);
        createTask();
    }
}
module.exports = createTask;