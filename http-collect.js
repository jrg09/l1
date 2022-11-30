'use strict'
const http = require('http');

let body = [];

http.get(process.argv[2], (response) => {
    //response.setEncoding('utf-8');
    response.on('data', (chunk) => {
        body.push(chunk);
    });
    response.on('end',()=>{
        body = Buffer.concat(body).toString();
        console.log(body.length);
        console.log(body);
    });
    response.on('error',(err)=>{
        console.log(`Ocurrió el sgte error: \n${err}`);
    });
}).on('error', console.error);