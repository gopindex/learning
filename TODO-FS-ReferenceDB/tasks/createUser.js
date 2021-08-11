const fs = require('fs');
const readline = require('readline-sync');
const path = require('path');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
async function createUser() {
    try {
        let email = readline.question('Enter Your Email: ');
        let name = readline.question('Enter Your Name: ');
        let fileData = await readFile(path.resolve('data', 'todo.json'))
        let data = JSON.parse(fileData.toString());
        let result = data.filter(item => item.Email === email);
        if (result.length !== 0) {
            throw new Error("Email Already Exists");
        }
        else {
            let newTask = { Email: email, Name: name, Todos: [] };
            data.push(newTask);
        }
        await writeFile(path.resolve('data', 'todo.json'), JSON.stringify(data))
        console.log("User Added Successfully");
    }
    catch (err) {
        console.error(err);
        createUser();
    }
}
module.exports = createUser;