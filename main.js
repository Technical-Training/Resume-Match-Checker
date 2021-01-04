const { DEFAULT_MIN_VERSION } = require('tls');
const { rl, read } = require('./IO');

function compare(lst) {
    let match = 0
    if (lst[0].InstitutionName == lst[1].InstitutionName) {
        return 0;
    }
    if (lst[1].courseName == lst[0].courseName) {
        match++
    }
    let l1 = lst[1].technology.length
    let l2 = lst[0].technology.length
    for (let i = 0; i < l1; i++) {
        for (let j = 0; j < l2; j++) {
            if (lst[1].technology[j] == lst[0].technology[i]) {
                match++;
                let m1 = lst[0].technology[i].subdomain.length
                let m2 = lst[1].technology[i].subdomain.length
                for (let k = 0; k < m1; k++) {
                    for (let l = 0; l < m2; l++) {
                        let obj1 = lst[0].technology[i].subdomain[k]
                        let obj2 = lst[0].technology[i].subdomain[k]
                        if (obj1.name == obj2.name) {
                            let dif = obj1.lvl - obj2.lvl;
                            if (dif < 0) {
                                dif *= -1
                            } 
                            if (dif < 2) {
                                match++;
                            }
                            else if (obj1.lvl > 5) {
                                if (dif < 100) {
                                    match++
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    let denom
    if (lst[0].total > lst[1].total) {
        denom = lst[0].total
    }
    else {
        denom = lst[1].total
    }
    console.log(match)
    let percent = (match / denom) * 100
    return percent
}

async function main() {
    let lst = []
    // No. of students to be compared
    // Only two students are there in first draft
    let studentCount = await read("Enter no. of students : ")

    // Reading data of all the students
    for (let i = 0; i < studentCount; i++) {
        console.log("Enter user number", i + 1, "'s resume details: \n");
        let total = 0
        let student = {} // Empty student object
        student.name = await read("\nEnter your name : ");
        student.InstitutionName = await read("Enter your College Name (without special characters and in capital letters): ");
        // Course Details
        student.courseName = await read("Enter your Course Name : ");
        total += 1
        student.technology = []
        console.log("Instruction before filling further details : ")
        console.log("First enter name of the main technology/skill/domain in lowercase.\nNext insert it's subdomains (if any), like for web development it can be frameworks like React and angular, or languages you know like HTML, javasript and for Competitive Programming it can be platform names you code upon, data structure and algorithms, programming languages etc.")
        console.log("Follwed by technology name also enter your level of expertise in it on a scale of 1 to 5. (In case of competitive programming platform put your number of stars or rating. Same has to be done with subdomains.")
        while (true) {
            let tech = {}
            tech.skillName = await read("\n\nEnter domain/skill name in lowercase to continue adding skills or \"Finish\" to finish the list (Enter choice without \"\"): ");
            if (tech.skillName == "Finish") {
                break;
            }
            total++
            tech.level = await read("Enter the level of expertise on a scale of 1 to 5 : ")
            tech.subdomain = []
            let check = await read("Are there any sub-domains or technologies, skills. Enter your answer in Yes/No : ")
            if (check == "No") {
                student.technology.push(tech)
                continue
            }
            let cnt = 0
            while (true) {
                let subDomain = {}
                subDomain.name = await read("Enter subdomain/platform name in lowercase to continue adding subdomains or platforms or \"Finish\" to finish the list (Enter choice without \"\"): ");
                if (subDomain.name == "Finish") {
                    break;
                }
                total++
                subDomain.lvl = await read("Enter the level of expertise on a scale of 1 to 5 or provide rating or stars(for competetive programming websites only) : ")
                tech.subdomain.push(subDomain);
            }
            student.technology.push(tech)
        }
        student.score = total
        lst.push(student)
    }
    rl.close()
    console.log(lst)
    let match = compare(lst);
    console.log(match)
}

main()