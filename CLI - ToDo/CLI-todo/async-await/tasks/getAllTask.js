const fs = require('fs');
const path = require('path');
const util = require('util');

const readFile = util.promisify(fs.readFile);
async function getAllTask() {
    try {
        const fileData = await readFile(path.resolve('data', 'todo.json'))
        let data = JSON.parse(fileData);
        data.forEach(ele => {
            console.log(ele.task);
        })
    }
    catch (err) {
        throw err;
    }
}
module.exports = getAllTask;