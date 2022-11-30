'use strict'

const fs = require('fs');
const path = require('path');

fs.readdir(process.argv[2], (err,list) => {
    if(err){
        console.log(err);
        return;
    }
    //console.log(list);
    const listFiltered = list.filter(el => path.extname(el) == '.'+process.argv[3]);
    
    listFiltered.forEach( el => {
        console.log(el);
    })

});