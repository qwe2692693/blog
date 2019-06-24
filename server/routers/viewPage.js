const express = require('express')
const router = express.Router()

router.get('/main',(req,res)=>{
    res.render('main',{
        title: 'main页面',
        username: req.session.user.nickname,
    })
})
module.exports = router;