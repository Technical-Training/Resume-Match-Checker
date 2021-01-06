// Sort resume 
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

let len = obj.length

for (let i = 0; i < len; i++) {
    let len2 = obj[i].skills.length
    for (let j = 0; j < len2; j++) {
        if (obj[i].skills[j].subdomains != undefined) {
            obj[i].skills[j].subdomains.sort(compare)
        }
    }
    obj[i].skills.sort(compare)
}

var json = JSON.stringify(obj)
fs.writeFile('data.json', json, 'utf8', function(err) {
        if (err) throw err;
        console.log('complete');
    }
);

