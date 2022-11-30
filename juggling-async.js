'use strict'

const {getr} = require('./getr.js');

if(process.argv.length < 3) {
    console.warn('envía las url como parámetros');
    return;
}

var list = [];

for(let i = 2; i < process.argv.length; i++) {
    list.push(process.argv[i]);
}

list.forEach(url => {
    getr(url, (err, html) => {
        //console.log(url);
        //console.log(html.length)
        console.log(html);
    });
    //console.log({url, html});
    //var len = html.length;
    //console.log({url,len});
});
/*
async.forEachOf(list, (value, key, callback) => {
    //console.log({value, key});
    
    
});

console.log(configs);
*/

