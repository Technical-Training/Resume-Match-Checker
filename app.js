//read resume's json file

var fs = require('fs');

var data = fs.readFileSync('data.json', 'utf8');
var obj = JSON.parse(data);


console.log(obj);

//funciton to calculate resume match percentage (trial)
function calculate() {
    var count;
    var n = obj.length;
    for(var i = 0; i < n; i++) {
        count = 0;
        for(var j = i + 1; j < n; j++) {
            if(obj[i].university == obj[j].university) {
                console.log(i + 1, " and ", j + 1, " belongs to the same university.");
                continue;
            }
            if(obj[i].course == obj[j].course) count++;
            for(var k = 0; k < obj[i].skills.length; k++) {
                for(var l = 0; l < obj[j].skills.length; l++) {
                    if(obj[i].skills[k] == obj[j].skills[l]) {
                        count++;
                        break;
                    }
                }
            }
            console.log(i + 1, " and ", j + 1, " have ", count, " skills in common. ");

        }
    }
}

calculate();