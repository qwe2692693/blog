const express = require('express')
const router = express.Router()
const fs = require('fs');

router.get('/', function(req, res) {
    let imgArr = [];
    fs.readdir("./public/upload/", function(err, files) {
        if (err) {
            return console.error(err);
        }
        files.forEach(function(file) {
            imgArr.push(file)
        });
        res.send(imgArr)
    });

})


module.exports = router;