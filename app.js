//read resume's json file
const { DEFAULT_MIN_VERSION } = require('tls');
const { rl, read } = require('./IO');

var fs = require('fs');

var data = fs.readFileSync('data.json', 'utf8');
var obj = JSON.parse(data);


async function main() {
    let index = await read("Enter index of student with whom the other resume are to be compared : ")
    let len = obj.length
    let cmpObj = obj[index]
    let total = 1
    obj[index].skills.forEach(element => {
        total += (element.subdomains.length * 2) + 2
    });

    lst = []
    obj.forEach(tobj => {
        if (cmpObj.institution == tobj.institution) {
            return;
        }
        let score = 0
        if (cmpObj.course == tobj.course) {
            score++;
        }
        let i = 0
        let j = 0
        let len1 = cmpObj.skills.length
        let len2 = tobj.skills.length
        while (i < len1 && j < len2) {
            if (cmpObj.skills[i].name < tobj.skills[j].name) {
                i++
            }
            else if (cmpObj.skills[i].name > tobj.skills[j].name) {
                j++
            }
            else {
                score += Math.max(0, 2 - Math.abs(cmpObj.skills[i].level - tobj.skills[j].level));
                let k = 0
                let l = 0
                if (cmpObj.skills[i].subdomains == undefined || tobj.skills[j].subdomains == undefined) {
                    i++
                    j++
                    continue;
                }
                else {
                    let len3 = cmpObj.skills[i].subdomains.length
                    let len4 = tobj.skills[j].subdomains.length
                    while (k < len3 && l < len4) {
                        if (cmpObj.skills[i].subdomains[k].name < tobj.skills[j].subdomains[l].name) {
                            k++;
                        }
                        else if (cmpObj.skills[i].subdomains[k].name > tobj.skills[j].subdomains[l].name) {
                            l++;
                        }
                        else {
                            if (cmpObj.skills[i].subdomains[k].level > 10) {
                                score += Math.max(0, 2 - Math.floor(Math.abs(cmpObj.skills[i].subdomains[k].level - tobj.skills[j].subdomains[l].level) / 50));
                            }
                            else {
                                score += Math.max(0, 2 - Math.abs(cmpObj.skills[i].subdomains[k].level - tobj.skills[j].subdomains[l].level));
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
        console.log(score)
    })
    console.log(total)
    rl.close()
}

main();