const express = require('express')
const router = express.Router()
const formidable = require('formidable')
const fs = require('fs');


// router.post('/', (req, res) => {
//     let form = new formidable.IncomingForm();
//     // 创建临时目录
//     let dir = form.uploadDir = "./public/upload/"
//     form.parse(req, (err, fields, files) => {
//         // console.log(files.file)
//         // return
//         if (err) {
//             return console.log('formidable, form.parse err' + err);
//         }
//         //根据前端设置
//         let filspath = files.myFileName.path
//         let filsname = files.myFileName.name
//         let newPath = dir + filsname
//         fs.rename(filspath, newPath, (err) => {
//             if (err) {
//                 console.log("上传错误" + err)
//                 return res.send({ isOk: false, err })
//             }
//             let resPath = newPath.replace("./public", "/static"); //处理图片路径  让前端能访问
//             res.json({ isOk: true, data: [resPath], errno: 0 }) //返回图片路径
//         })
//     })
// })

router.get('/', (req, res) => {
    let dir = "./public/";
    fs.stat(dir+'upload',function(error,stats){
        if(error){
            fs.mkdir(dir+'upload', function (error){
                if(error){
                    console.log(error);
                    return false;
                }
                console.log('创建成功')
            })
            console.log(error);
            return false;
        }
    
    })
    res.send('ada')
})

module.exports = router;