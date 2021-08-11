const fs = require('fs');
const readline = require('readline-sync');
const path = require('path');
const util = require('util');
const readFile = util.promisify(fs.readFile);
async function getAllTask() {
    try {
        let emailUser = readline.questionEMail(`Enter Email: `);
        let fileData = await readFile(path.resolve('data', 'todo.json'))
        let data = JSON.parse(fileData.toString());
        let ref = false;
        data.forEach((ele) => {
            if (emailUser === ele.EmailID) {
                let todo = ele.Todo;
                ref = true;
                todo.forEach((ele) => {
                    console.log(ele.Task);
                })
            }
        });
        if (!ref) {
            throw new Error("Entered Email ID is Not Registered");
        }
    } catch (err) {
        console.error(err);
        getAllTask();
    }
}
module.exports = getAllTask;