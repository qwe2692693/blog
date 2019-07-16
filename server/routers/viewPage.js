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
            })
        } catch (err) {
            console.log(err)
        }

    })
    //添加内容页面
router.get('/contentAdd', async(req, res, next) => {
        try {
            res.render('pages/contentAdd', {
                title: '添加内容',
            })
        } catch (err) {
            console.log(err)
        }

    })
    //图片管理页面
router.get('/imgPage', async(req, res, next) => {
    try {
        res.render('pages/imgPage', {
            title: '图片显示页面',
        })
    } catch (err) {
        console.log(err)
    }

})
router.get('/userAdmin', async(req, res, next) => {
    try {
        res.render('pages/userAdmin', {
            title: '图片显示页面',
        })
    } catch (err) {
        console.log(err)
    }

})
module.exports = router;