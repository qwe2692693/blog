const express = require('express')
const router = express.Router()
const formidable = require('formidable')
const fs = require('fs');
let dir = "./public/upload";
let date = new Date(),
    year = date.getFullYear(),
    month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1),
    d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
    dateStr = year + month + d;
let dirDate = dir + '/' + dateStr;
router.post('/', (req, res) => {

    fs.access(dir, fs.constants.F_OK, (err) => {
        if (err) {
            mkdirFun(dir)
        }
        fs.access(dirDate, fs.constants.F_OK, (err) => {
            if (err) {
                mkdirFun(dirDate)
            }
            let form = new formidable.IncomingForm(),
                temDir = form.uploadDir = dirDate;
            form.parse(req, (err, fields, files) => {
                if (err) {
                    console.log(err)
                    return false;
                }

                //根据前端设置
                let filspath = files.myFileName.path;
                let filsname = files.myFileName.name;
                let newPath = temDir + '/' + filsname;
                fs.rename(filspath, newPath, (err) => {
                    if (err) {
                        console.log("上传错误" + err)
                        return res.json({ isOk: false, err })
                    }
                    let resPath = newPath.replace("./public", "/static"); //处理图片路径  让前端能访问
                    res.json({ isOk: true, imgPath: resPath, errno: 0 }) //返回图片路径
                })

            })
        });
    });


})

function mkdirFun(obj) {
    fs.mkdirSync(obj, (err) => {
        if (err) {
            console.log(err)
        }
        console.log('创建成功')
    })
}




module.exports = router;