const { read } = require('./IO');

async function main() {
    let name = await read("Enter your name : ");
    console.log("Hello", name)
}
main()