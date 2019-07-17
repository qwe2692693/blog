const express = require('express')
const router = express.Router()
const User = require('../modules/User')

let responseData
router.use((req, res, next) => {
    responseData = {
        code: 0,
        message: ''
    }
    next()
})

// 暴露首页
router.get('/', function(req, res) {
    res.render('index', {
        title: '后台管理界面',
        username: req.session.user.nickname,
    })
})

router.get('/user', function(req, res) {
    /**
     * 读取所有的用户记录
     * skip: 忽略几条
     * limit: 查询的最大条数
     * req.query 获取后面的参数
     */
    let dataPage = {
        page: req.query.page <= 0 ? 1 : req.query.page || 1,
        limit: Number(req.query.limit) || 10,
    }

    User.countDocuments().then((count) => {
        let skip = (dataPage.page - 1) * dataPage.limit
        User.find({ $and: [{ _id: { $ne: req.session.user.userId } }, { _id: { $ne: '5cb9c2fdd662d11de8680d67' } }] }).limit(dataPage.limit).skip(skip).sort({ '_id': -1 }).then((data) => {
            res.json({
                data,
                count: count - 1,
                code: 0,
                msg: '加载完成'
            })
        })
    })
})

// router.get('/user', function (req, res) {
//   /**
//    * 读取所有的用户记录
//    * skip: 忽略几条
//    * limit: 查询的最大条数
//    * req.query 获取后面的参数
//    */
//   let data = {
//     page: req.query.page <= 0 ? 1 : req.query.page || 1,
//     limit: 10,
//     count: [],
//     pages: 0,
//   }

//   User.countDocuments().then((count) => {

//     data.count = count
//     // 计算总页数
//     data.pages = Math.ceil(data.count / data.limit)
//     // 取值不能小于pages
//     data.page = Math.min(data.page, data.pages)
//     // 取值不能小于pages
//     data.page = Math.max(data.page, 1)
//     let skip = (data.page - 1) * data.limit
//     User.find({ $and: [{ _id: { $ne: req.session.user.userId } }, { _id: { $ne: '5cb9c2fdd662d11de8680d67' } }] }).limit(data.limit).skip(skip).sort({ '_id': -1 }).then((users) => {
//       res.render('user_index', {
//         username: req.session.user.nickname,
//         users: users,
//         data: data
//       })
//     })
//   })
// })
/**
 * 用户编辑
 */
router.route('/user_edit')
    .get(async(req, res) => {
        try {
            let userId = req.query.id || ''
            let user = await User.findOne({ _id: userId })
            res.render('user/user_edit', {
                user
            })
        } catch (err) {
            console.log("这是admin页面错误" + err)
        }
    })
    .post(async(req, res) => {
        try {
            let userId = req.body.userId || '',
                nickname = req.body.nickname || '',
                email = req.body.email == '' ? '暂无邮箱' : req.body.email,
                isAdmin = req.body.isAdmin
            if (userId == '') {
                responseData.code = 1
                responseData.message = 'id不能为空'
                res.send(responseData)
                return
            }
            let user = await User.findOne({ _id: userId })
            if (user) {
                responseData.message = '修改成功'
                res.json(responseData)
                return User.updateOne({
                    _id: userId
                }, {

                    nickname: nickname,
                    email: email,
                    isAdmin: isAdmin
                })
            }
        } catch (err) {
            console.log(err)
        }
    })
    /**
     * 删除
     */
router.post('/user_remove', async(req, res) => {
    try {
        let userId = req.body.appId || '';
        if (userId == '') {
            responseData.code = 1,
                responseData.message = '当前查询不存在'
            res.json(responseData)
            return
        }
        let user = await User.findById(userId);
        if (!user) {
            responseData.code = 2,
                responseData.message = '删除失败当前ID不存在'
            res.json(responseData)
            return
        } else {
            responseData.message = '删除成功'
            res.json(responseData)
            return User.deleteOne({
                _id: userId
            })
        }

    } catch (err) {
        console.log('用户界面错误' + err)
    }
})
module.exports = router