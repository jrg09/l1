'use strict'
const strftime = require('strftime');
const net = require('net');

let time = strftime(`%Y-%m-%d %H:%M\n`);

//console.log({time});

const server = net.createServer((socket) => {
    socket.end(time);
}).on('error', (err)=>{
    throw err;
});

server.listen(process.argv[2], ()=>{
    console.log('opened server on ', server.address());
});