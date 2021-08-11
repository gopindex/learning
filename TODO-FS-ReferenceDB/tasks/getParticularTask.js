const fs = require('fs');
const readline = require('readline-sync');
const path = require('path');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
async function getParticularTask() {
    try {
        let emailUser = readline.questionEMail(`Enter Email: `);
        let fileData = await readFile(path.resolve('data', 'todo.json'))
        let data = JSON.parse(fileData.toString());
        let ref = false;
        data.forEach((ele) => {
            if (emailUser === ele.EmailID) {
                let Id = readline.question(`Enter The Id To Get Particular Task: `);
                let todo = ele.Todo;
                ref = true;
                let val = false;
                todo.forEach((ele) => {
                    if (Id === ele.ID) {
                        let show = ele.Task;
                        console.log(show);
                        ref = true;
                        val = true;
                    }
                });
                if (!val) {
                    throw new Error("Invalid ID");
                }
            }
        });
        if (!ref) {
            throw new Error("Entered EmailID is Not Registered");
        }
    } catch (err) {
        console.error(err);
        getParticularTask();
    }
}
module.exports = getParticularTask;