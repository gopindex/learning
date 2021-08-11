const fs = require('fs');
const path = require('path');
const util = require('util');

const readFile = util.promisify(fs.readFile);
function getAllTask() {
    readFile(path.resolve('data', 'todo.json'))
        .then((fileData) => {
            let data = JSON.parse(fileData);
            data.forEach((ele) => {
                console.log(ele.task.toString());
            });
        })
        .catch((err) => {
            throw err;
        })
}
module.exports = getAllTask;