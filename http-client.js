'use strict'
const http = require('https');
const cheerio = require('cheerio');

let body = [];

http.get(process.argv[2], (response) => {
    //console.log(response.headers);
    //response.setEncoding('utf-8');
    response.on('data', (chunk) => {
        body.push(chunk);
        //console.log(`data ok: ${data.length} bytes`);
    });
    response.on('end',()=>{
        body = Buffer.concat(body).toString();

        const $ = cheerio.load(body);
        

        const div = $('ul[data-testid="eventList"]');

        if(div.length > 0){
            const li = $('li', div);
            console.log(li.length);

            li.forEach(item => {console.log(item)});
        }

    })
    response.on('error', (err) => console.log(err));
    //response.on('end', (end) => console.log(end));
}).on('error', console.error);