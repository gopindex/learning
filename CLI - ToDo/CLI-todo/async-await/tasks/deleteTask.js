// const fs = require('fs');
// const readline = require('readline-sync');
// const path = require('path');
// const util = require('util');

// const readFile = util.promisify(fs.readFile);
// const writeFile = util.promisify(fs.writeFile);

// async function deleteTask() {
//     try {
//         const id = readline.question(`Enter the ID to Delete the Task:  `);
//         const fileData = await readFile(path.resolve('data', 'todo.json'));
//         let taskData = JSON.parse(fileData.toString());
//         taskData.forEach((ele, index) => (ele.id === id ? taskData.splice(index, 1) : null));
//         await writeFile(path.resolve('data', 'todo.json'), JSON.stringify(taskData))
//         console.log(`Task is Deleted Successfully`);
//     }
//     catch (err) {
//         console.error(err);
//     }
// }
// module.exports = deleteTask;

const fs = require('fs');
const readline = require('readline-sync');
const path = require('path');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

async function deleteTask() {
    try {
        const id = readline.question(`Enter the ID to Delete the Task:  `);
        const fileData = await readFile(path.resolve('data', 'todo.json'));
        let ref = false;
        let taskData = JSON.parse(fileData.toString());
        taskData.forEach((ele, index) => {
            if (ele.id === id) {
                taskData.splice(index, 1);
                ref = true;
            }
        })
        await writeFile(path.resolve('data', 'todo.json'), JSON.stringify(taskData))
        if (!ref) {
            throw new Error("Invalid IP");
            //console.log(`Invalid IP`);
            //deleteTask();
        }
        console.log(`Task is Deleted Successfully`);
    }
    catch (err) {
        console.error(err);
        deleteTask();
    }
}
module.exports = deleteTask;