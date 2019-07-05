const express = require('express')
const router = express.Router()
const Category = require('../modules/Category')
const Content = require('../modules/Content')

// 返回统一格式
let responseData
router.use((req, res, next) => {
        responseData = {
            code: 0,
            message: ''
        }
        next()
    })
    /***
     * 内容列表首页
     */
router.get('/', async(req, res, next) => {
        try {
            /**
             * 读取所有的用户记录
             * skip: 忽略几条
             * limit: 查询的最大条数
             * req.query 获取后面的参数
             */
            let data = {
                page: req.query.page <= 0 ? 1 : req.query.page || 1,
                limit: 10,
                count: [],
                pages: 0,
            }
            let contentCount = await Content.countDocuments()
            data.count = contentCount
                // 计算总页数
            data.pages = Math.ceil(data.count / data.limit)
                // 取值不能小于pages
            data.page = Math.min(data.page, data.pages)
                // 取值不能小于pages
            data.page = Math.max(data.page, 1)
            let skip = (data.page - 1) * data.limit

            let contents = await Content.find().limit(data.limit).skip(skip).sort({ '_id': -1 }).populate(['category', 'user'])
            res.json({
                contents: contents,
                data: data
            })
        } catch (err) {
            console.log("这是个错误content页面错误" + err)
        }
    })
    /***
     * 添加内容页面
     */
router.get('/content_add', async(req, res) => {
    try {
        let category = await Category.find().sort({ _id: -1 })
        res.render('content/content_add', {
            category: category,
        })
    } catch (err) {
        console.log(err)
    }
})
router.post('/content_add', async(req, res) => {
        try {
            let cateName = req.body.cateName || ''
            let title = req.body.title || ''
            let description = req.body.description || ''
            let content = req.body.content || ''
            if (title == '') {
                responseData.code = 1
                responseData.message = "标题不能为空"
                res.json(responseData)
                return
            }
            if (description == '') {
                responseData.code = 2
                responseData.message = "简介不能为空"
                res.json(responseData)
                return
            }
            if (content == '') {
                responseData.code = 3
                responseData.message = "内容不能为空"
                res.json(responseData)
                return
            }
            if (!cateName || cateName == '') {
                responseData.code = 4
                responseData.message = "当前栏目不存在"
                res.json(responseData)
                return
            }
            let contents = await Content.findOne({
                title: title,
            })

            if (!contents) {
                let contentBox = new Content({
                    category: cateName,
                    user: req.session.user.userId,
                    title: title,
                    description: description,
                    content: content
                })
                responseData.message = "保存成功"
                res.json(responseData)
                return contentBox.save()
            }


        } catch (err) {
            console.log("这是错误" + err)
        }
    })
    /***
     * 内容页编辑
     */
router.get('/content_edit', async(req, res) => {
    try {
        let contentId = req.query.id || ''
        let category = await Category.find()
        let content = await Content.findOne({
            _id: contentId
        }).populate(['category'])
        res.render('content/content_edit', {
            username: req.session.user.nickname,
            content: content,
            category: category
        })
    } catch (err) {
        console.log("这是错误" + err)
    }
})
router.post('/content_edit', async(req, res) => {
        try {
            let cateName = req.body.cateName || ''
            let title = req.body.title || ''
            let description = req.body.description || ''
            let content = req.body.content || ''
            let contentId = req.body.contentId || ''
            let contents = await Content.findOne({ _id: contentId })
            if (!contents) {
                responseData.code = 1
                responseData.message = '当前类目不存在'
                res.json(responseData)
                return
            }
            responseData.message = '更新完成'
            res.json(responseData)

            return Content.updateOne({
                _id: contentId,
            }, {
                category: cateName,
                user: req.session.user._id,
                title: title,
                content: content,
                description: description
            })

        } catch (err) {
            console.log("这是个错误" + err)
        }
    })
    /**
     * 内容页面删除
     */
router.post('/category_remove', async(req, res) => {
    try {
        let appid = req.body.appid || ''
        let contentId = await Content.findById({ _id: appid })
        if (!contentId) {
            responseData.code = 1
            responseData.message = '删除失败,请查看当前ID是否存在'
            res.json(responseData)
            return
        } else {
            responseData.message = '删除成功'
            res.json(responseData)
            return Content.deleteOne({
                _id: appid
            })
        }
    } catch (err) {
        console.log("这是category_remove" + err)
    }
})
module.exports = router