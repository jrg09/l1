'use strict'

const fs = require('fs');
const path = require('path');

module.exports = function(dirName, ext, callback) {
    fs.readdir(dirName, (err,list) => {
        if(err)
            return callback(err);

        const ext_f = `.${ext}`;
        return callback(null, list.filter(el => path.extname(el) == ext_f));
    });
};

let getr = (url) => {
    console.log(url)
}
