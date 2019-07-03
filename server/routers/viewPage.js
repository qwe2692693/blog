const express = require('express')
const router = express.Router()

//首页显示
router.get('/main', (req, res) => {
    res.render('main', {
        title: 'main页面',
        username: req.session.user.nickname,
    })
})

//栏目管理
router.get('/category', async(req, res) => {
        try {
            res.render('pages/category', {
                title: '栏目页面',
                username: req.session.user.nickname,
            })
        } catch (err) {
            console.log(err)
        }
    })
    //栏目添加
router.get('/categoryAdd', async(req, res) => {
    try {
        res.render('pages/categoryAdd', {
            title: '栏目添加',
            username: req.session.user.nickname
        })
    } catch (err) {
        console.log(err)
    }
})

//内容页面
router.get('/content', async(req, res, next) => {
    try {
        res.render('pages/content', {
            title: '内容页面',
            username: req.session.user.nickname,
        })
    } catch (err) {
        console.log(err)
    }

})
module.exports = router;