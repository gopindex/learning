const fs = require('fs');
const readline = require('readline-sync');
const path = require('path');
const util = require('util');

const readFile = util.promisify(fs.readFile);

function getParticularTask() {
    const id = readline.question(`Know the Task by it's Particular ID:  `);

    readFile(path.resolve('data', 'todo.json'))
        .then((fileData) => {
            let data = JSON.parse(fileData);
            let ref = false;
            data.forEach((ele) => {
                if (id == ele.id) {
                    console.log(ele.task.toString());
                    ref = true;
                }
            });
            if (!ref) {
                throw new Error("Invalid Id");
            }
        })
        .catch((err) => {
            console.error(err);
            getParticularTask();
        })

}
module.exports = getParticularTask;