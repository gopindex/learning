const fs = require('fs');
const readline = require('readline-sync');
const path = require('path');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
async function deleteTask() {
    try {
        let email = readline.questionEMail('Enter Your Email: ');
        let data = await readFile(path.resolve('data', 'todo.json'));
        let taskData = JSON.parse(data);
        let ref = false;
        taskData.forEach((ele) => {
            if (email === ele.EmailID) {
                ref = true;
                let id = readline.question('Enter The ID To Delete That Task: ');
                let todo = ele.Todo;
                let result = todo.filter(item => item.ID === id);
                if (result.length === 0) {
                    throw new Error("Invalid ID");
                } else {
                    let index = todo.findIndex(function (data) {
                        return data.ID === id;
                    });
                    todo.splice(index, 1);
                }
            }
        });
        if (!ref) {
            throw new Error("Entered Email ID is Not Registered");
        }
        await writeFile(path.resolve('data', 'todo.json'), JSON.stringify(taskData));
        console.log("Task Is Deleted Successfully");
    } catch (err) {
        console.error(err);
        deleteTask();
    }
}
module.exports = deleteTask;