const express = require("express")
const router = express.Router()
const Category = require("../modules/Category")
const Content = require("../modules/Content")

/**
 * 导航查询
 */
router.get('/category', async(req, res) => {
        try {
            let category = await Category.find({ catname: { $ne: null } });
            res.json(category)
        } catch (err) {
            console.log(err)
        }
    })
    /**
     * 首页推荐查询
     */
router.get('/homeHot', async(req, res) => {
        try {
            let homeHot = await Content.find({ homePageTj: '1' }).limit(0, 8).sort({ '_id': -1 }).populate(['category']);
            res.json(homeHot)
        } catch (err) {
            console.log(err)
        }

    })
    /**
     * 内容查询
     */
router.get('/contentAll', async(req, res) => {
        try {
            let limitInt = req.query.limit || 5,
                content = await Content.find().limit(0, limitInt).sort({ '_id': -1 }).populate(['category']);
            if (content) {
                res.json(content)
            } else {
                res.json({
                    msg: '加载失败'
                })
            }
        } catch (err) {
            console.log(err)
        }
    })
    /**
     * 列表id查询
     */
router.get('/content', async(req, res) => {
        try {
            let id = req.query.id || ''
            let content = await Content.find({
                category: id
            }).populate(['category'])
            res.json(content)
        } catch (err) {
            console.log(err)
        }
    })
    /**
     * 内容id查询
     */
router.get('/contentName', async(req, res) => {
    try {
        let name = req.query.name || ''
        let content = await Content.findOne({
            _id: name
        }).populate(['category'])
        let contentPrve = await Content.findOne({
            category: content.category._id,
            _id: { $lt: name }
        }).populate(['category']).sort({ _id: -1 }).limit(1)

        let contentNext = await Content.findOne({
            category: content.category._id,
            _id: { $gt: name }
        }).populate(['category']).sort({ _id: 1 }).limit(1)

        res.json({
            content,
            contentPrve,
            contentNext
        })
    } catch (err) {
        console.log(err)
    }
})

module.exports = router