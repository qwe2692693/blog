const express = require('express')
const router = express.Router()
const fs = require('fs');

router.get('/', function (req, res) {
    let filePath = "./public/upload/",
        imgArr = [],
        files = fs.readdirSync(filePath);
    files.map(item => {
        fs.readdirSync(filePath + item).map(citem => {
            imgArr.push(item+"/"+citem)
        })
    })
    res.send(imgArr)
})

function getReddir(path) {
    return new Promise((resolve, reject) => {
        fs.readdir(path, (err, files) => {
            if (err) {
                reject(err)
            } else {
                resolve(files)
            }
        })
    })
}

function getFileList() {

}



module.exports = router;