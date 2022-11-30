const http = require('http');

let getr = (url, callback) => {
    let body = [];

    http.get(url, (response) => {
        response.on('data', (chunk) => {
            body.push(chunk);
        });
        response.on('end',()=>{
            body = Buffer.concat(body).toString();
            callback(null, body);
        });
        response.on('error',(err)=>{
            callback(err);
        });        
    }).on('error', console.error);
}

module.exports.getr = getr;