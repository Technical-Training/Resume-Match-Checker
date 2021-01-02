const { rl, read } = require('./IO');



async function main() {
    let lst = []
    let studentCount = await read("Enter no. of students : ")

    for (let i = 0; i < studentCount; i++) {
        console.log("Enter user number", i + 1, "'s resume details: \n");

        let student = {}
        student.name = await read("Enter your name : ");
        student.InstitutionName = await read("Enter your College Name : ");
        // Course Details
        student.courseName = await read("Enter your Course Name : ");
        student.technology = []
        console.log("Enter each technology you know with your command over them rated on a scale of 1 to 5. Only numbers should be used : ")
        console.log("Enter technology name and level separated by new line : ")
        console.log("Enter Done to complete the list")
        let techName, level;
        let cnt = 0
        while (true) {
            techName = await read("Enter technology name : ")
            if (techName == 'Done') {break}
            level = await read("Enter level : ")
            student.technology.push({})
            student.technology[cnt][techName] = level
            cnt++
        }
        lst.push(student)
    }
    rl.close()
    console.log(lst)
}

main()