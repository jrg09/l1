'use strict'
const http = require('http');
const body = require('body');
const textBody = require('body');

const server = http.createServer((req,res) => {

    if(req.method == "POST"){
        textBody(req, res, (err,bodydata) => {
            if(err){
                res.statusCode = 500;
                res.end('NO U');
            }
            res.end(bodydata.toUpperCase());
        });
    }else {
        res.end('send a post request pls');
    }
    
});

server.listen(process.argv[2]);