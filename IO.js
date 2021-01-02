const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function read(statement){
    return new Promise((resolve, reject) => {
        rl.question(statement, input => {
            resolve(input)
        });
    })    
}

module.exports = {rl, read}