const express = require('express')
const router = express.Router()
const fs = require('fs');

router.get('/', function() {

    fs.open('./ceshi/file.txt', 'r', (err, fd) => {
        if (err) throw err;
        fs.fstat(fd, (err, stat) => {
            if (err) throw err;
            // 使用文件属性。
            console.log(fd)
                // 始终关闭文件描述符！
            fs.close(fd, (err) => {
                if (err) throw err;
            });
        });
    });

})


module.exports = router;