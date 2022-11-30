const fs = require('fs');

const data = fs.readFileSync(process.argv[2]);
const dd = data.toString().trim();

console.log(dd.split('\n').length-1);