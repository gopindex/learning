/*Lab 5 : 
--------
TODO CLI App
* Create todo.json [] (default empty array)
    - Each todo item is an object
    - todo.json is group of todo item object
CLI Menu Options : 
    1 : Create A Todo Task in todo.json	
        (Input : Task Item) Note : ids should be generated automatically
    2 : Get All the existing tasks in todo.json (Only Print tasks)
    3 : Get a particular task id data (Input : task id)Implement error for invalid id input
    4 : Edit a Particular id todo task (Input : task id, updated task data)
    5 : Delete a Particular id todo task
    0 : exit
*/
const readline = require('readline-sync');
//Task Logic Imports
const createTask = require('./tasks/createTask');
const getAllTask = require('./tasks/getAllTask');
const getParticularTask = require('./tasks/getParticularTask');
const editTask = require('./tasks/editTask');
const deleteTask = require('./tasks/deleteTask');
const createUser = require('./tasks/createUser');
const deleteUser = require('./tasks/deleteUser');

function main() {
    console.log(`
                        |-------------------------------------------------------------|
                        |        1 : Create A User ID                                 |
                        |        2 : Delete Existing User ID                          |
                        |        3 : Create A Todo Task	                              |
                        |        4 : Get All the Existing Tasks                       |
                        |        5 : Get a Particular Task Data                       |
                        |        6 : Edit a Particular Task Data                      |
                        |        7 : Delete a Particular Task                         |
                        |        8 : exit                                             |
                        |-------------------------------------------------------------|         
    `);
    let menu = readline.questionInt("Select the Option from the List Displayed Above:  ");
    switch (menu) {
        case 1:
            createUser();
            break;
        case 2:
            deleteUser();
            break;
        case 3:
            createTask();
            break;
        case 4:
            getAllTask();
            break;
        case 5:
            getParticularTask();
            break;
        case 6:
            editTask();
            break;
        case 7:
            deleteTask();
            break;
        case 8:
            console.log('Thank You!');
            break;
        default:
            console.log('Invalid Response Try Again');
            main();
    }
}
module.exports = main();