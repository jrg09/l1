'use strict'

const http = require('http');
const url = require('url');

const server = http.createServer((req,res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' })  

    const myURL = new URL(req.url, 'http://localhost:8090');
    console.log(myURL.pathname);
    console.log(myURL.searchParams);

    var time = myURL.searchParams.get('iso');
    var strJson = '', json, date;

    if(time) {
        try{
            date = new Date(time);
        }
        catch(err) {
            res.end(`error: ${err}`);
        }
    }

    switch(myURL.pathname.toLowerCase()) {
        case '/api/parsetime':{
            json = {hour:date.getHours(), minute:date.getMinutes(),second:date.getSeconds()};
            strJson = JSON.stringify(json);
            break;
        }
        case '/api/unixtime': {
            json = {unixtime:date.getTime()};
            strJson = JSON.stringify(json);
            break;
        }
        default: {
            res.writeHead(404, 'api path not allowed');
            res.end();
            break;
        }
    }

    res.end(strJson);
});

server.listen(Number(process.argv[2]));