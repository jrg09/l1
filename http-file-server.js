'use strict'
const http = require('http');
const fs = require('fs');

if(process.argv.length < 3) {
    console.log('Envía parámetro de puerto y archivo a servir');
    return;
}

const server = http.createServer((req,res)=>{
    res.writeHead(200, { 'content-type': 'text/plain' })
    var readStream = fs.createReadStream(process.argv[3],'utf-8');

    readStream.on('open',()=>{
        readStream.pipe(res);
    });
    readStream.on('error',(err)=>{
        console.log(err);
        res.end(err);
    });
});

server.listen(process.argv[2]);