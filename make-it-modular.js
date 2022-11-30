const mm = require('./mymodule');

mm(process.argv[2], process.argv[3], (err, list) => {
    if(err) {
        console.log(err);
        return;
    }

    list.forEach(element => {
        console.log(element);
    });
});