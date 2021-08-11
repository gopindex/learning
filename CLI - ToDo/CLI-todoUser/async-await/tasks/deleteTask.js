const fs = require('fs');
const readline = require('readline-sync');
const path = require('path');
function deleteTask() {
    const emailId = readline.question(`Enter the EmailID to Delete the User:  `);
    fs.readFile(path.resolve('data', 'todo.json'), (err, data) => {
        if (err) {
            console.error(err);
        } else {
            let taskData = JSON.parse(data);
            let ref = false;
            taskData.forEach((ele) => {
                if (emailId === ele.Email) {
                    let Id = readline.question(`Enter The Id To Get Particular Task: `);
                    let todo = ele.Todos;
                    ref = true;
                    let result = todo.filter(item => item.id === Id);
                    if (result.length === 0) {
                        console.log("Invalid ID");
                        deleteTask();
                    } else {
                        let updatedResult;
                        fs.readFile(path.resolve('data', 'todo.json'), (err, data) => {
                            if (err) {
                                console.error(err);
                            } else {
                                let storeData = JSON.parse(data);
                                let customResult = todo.filter(item => item.id !== Id);
                                updatedResult = updateTodo(storeData, emailId, customResult)
                                fs.writeFile(path.resolve('data', 'todo.json'), JSON.stringify(updatedResult), (err) => {
                                    if (err) {
                                        console.error(err);
                                    } else {
                                        console.log("Task Is Deleted Successfully");
                                    }
                                })
                            }
                        })
                    }

                }
            })
            if (!ref) {
                console.log("Invalid EmailID");
                deleteTask();
            }
        }
    })
}
function updateTodo(data, EmailID, customTodo) {
    data.forEach((ele) => {
        if (EmailID === ele.Email) {
            ele.Todos = customTodo;
        }
    })
    return data;
}
module.exports = deleteTask;