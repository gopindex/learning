// const fs = require('fs');
// const readline = require('readline-sync');
// const path = require('path');
// const ask = require('./ask');
// function deleteUser() {
//     const emailId = readline.question(`Enter the EmailID to Delete the User:  `);
//     fs.readFile(path.resolve('data', 'todo.json'), (err, data) => {
//         if (err) {
//             console.error(err);
//         } else {
//             let taskData = JSON.parse(data);
//             let result = taskData.filter(item => item.EmailID === emailId);
//             // console.log(result);
//             if (result.length === 0) {
//                 console.log("Invalid EmailID");
//                 deleteUser();
//             } else {
//                 let customResult = taskData.filter(item => item.EmailID !== emailId);
//                 fs.writeFile(path.resolve('data', 'todo.json'), JSON.stringify(customResult), (err) => {
//                     if (err) {
//                         console.error(err);
//                     } else {
//                         console.log("User Is Deleted Successfully");
//                     }
//                 })
//             }
//         }
//     })
// }
// module.exports = deleteUser;
//or
const fs = require('fs');
const readline = require('readline-sync');
const path = require('path');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
async function deleteUser() {
    try {
        let email = readline.questionEMail(`Enter Your Email address:   `);
        let data = await readFile(path.resolve('data', 'todo.json'))
        let taskData = JSON.parse(data);
        let isExists = false;
        taskData.forEach((item, index) => {
            if (item.EmailID === email) {
                taskData.splice(index, 1);
                isExists = true;
            }
        });
        if (!isExists) {
            throw new Error(`Invalid Email ID`);
        }
        await writeFile(path.resolve('data', 'todo.json'), JSON.stringify(taskData))
        console.log("User Is Deleted Successfully");
    } catch (err) {
        console.error(err);
        deleteUser();
    }
}
module.exports = deleteUser;