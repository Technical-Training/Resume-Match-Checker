//read resume's json file
const { DEFAULT_MIN_VERSION } = require('tls');
const { rl, read } = require('./IO');

var fs = require('fs');

var data = fs.readFileSync('data.json', 'utf8');
var obj = JSON.parse(data);

function compare(a, b) {
    let comparison = 0
    if (a.name < b.name) {
        comparison = -1
    }
    else if (a.name > b.name) {
        comparison = 1
    }
    return comparison
}

function calculate (student) {
    let total = 1
    student.skills.forEach(element => {
        total += (element.subdomains.length * 3) + 3
    });

    let lst = []
    obj.forEach(tobj => {
        if (student.institution == tobj.institution) {
            return;
        }
        let score = 0
        if (student.course == tobj.course) {
            score++;
        }
        let i = 0
        let j = 0
        let len1 = student.skills.length
        let len2 = tobj.skills.length
        while (i < len1 && j < len2) {
            if (student.skills[i].name < tobj.skills[j].name) {
                i++
            }
            else if (student.skills[i].name > tobj.skills[j].name) {
                j++
            }
            else {
                let diff = Math.abs(student.skills[i].level - tobj.skills[j].level);
                if (diff < 2) {
                    score += 1 + 2 - diff;
                }
                let k = 0
                let l = 0
                if (student.skills[i].subdomains == undefined || tobj.skills[j].subdomains == undefined) {
                    i++
                    j++
                    continue;
                }
                else {
                    let len3 = student.skills[i].subdomains.length
                    let len4 = tobj.skills[j].subdomains.length
                    while (k < len3 && l < len4) {
                        if (student.skills[i].subdomains[k].name < tobj.skills[j].subdomains[l].name) {
                            k++;
                        }
                        else if (student.skills[i].subdomains[k].name > tobj.skills[j].subdomains[l].name) {
                            l++;
                        }
                        else {
                            let dif;
                            if (student.skills[i].subdomains[k].level > 10) {
                                dif = Math.floor(Math.abs(student.skills[i].subdomains[k].level - tobj.skills[j].subdomains[l].level) / 50)
                            }
                            else {
                                dif = Math.abs(student.skills[i].subdomains[k].level - tobj.skills[j].subdomains[l].level)
                            }
                            if (dif < 2) {
                                score += 1 + 2 - diff;
                            }
                            k++
                            l++
                        }
                    }
                    i++
                    j++
                }
            }
        }
        let per = (score / total) * 100
        if (per >= 60) {
            let o = {}
            o[tobj.name] = per
            lst.push(o)
        }
    })
    return lst
}

async function main() {
    console.log("Enter student's resume details: \n");
    let student = {} // Empty student object
    student.name = await read("\nEnter your name : ");
    student.institution = await read("Enter your College Name (without special characters and in lowercase): ");
    // Course Details
    student.course = await read("Enter your Course Name : ");
    student.skills = []
    console.log("Instruction before filling further details : ")
    console.log("First enter name of the main technology/skill/domain in lowercase.\nNext insert it's subdomains (if any), like for web development it can be frameworks like React and angular, or languages you know like HTML, javasript and for Competitive Programming it can be platform names you code upon, data structure and algorithms, programming languages etc.")
    console.log("Follwed by technology name also enter your level of expertise in it on a scale of 1 to 5. (In case of competitive programming platform put your number of stars or rating. Same has to be done with subdomains.")
    while (true) {
        let tech = {}
        tech.name = await read("\n\nEnter domain/skill name in lowercase to continue adding skills or \"Finish\" to finish the list (Enter choice without \"\"): ");
        if (tech.name == "Finish") {
            break;
        }
        tech.level = await read("Enter the level of expertise on a scale of 1 to 5 : ")
        tech.subdomains = []
        let check = await read("Are there any sub-domains or technologies, skills. Enter your answer in Yes/No : ")
        if (check == "No") {
            student.skills.push(tech)
            continue
        }
        let cnt = 0
        while (true) {
            let subDomain = {}
            subDomain.name = await read("Enter subdomain/platform name in lowercase to continue adding subdomains or platforms or \"Finish\" to finish the list (Enter choice without \"\"): ");
            if (subDomain.name == "Finish") {
                break;
            }
            subDomain.level = await read("Enter the level of expertise on a scale of 1 to 5 or provide rating or stars(for competetive programming websites only) : ")
            tech.subdomains.push(subDomain);
        }
        tech.subdomains.sort(compare);
        student.skills.push(tech)
    }
    student.skills.sort(compare)
    rl.close()
    let result = calculate(student)
    console.log(result)
    obj.push(student)
    var json = JSON.stringify(obj)
    fs.writeFile('data.json', json, 'utf8', function(err) {
            if (err) throw err;
        }
    );
}

main();