const express = require('express')
const router = express.Router()
const Category = require('../modules/Category')
const Content = require('../modules/Content')
const pinyin = require('node-pinyin')

// 返回统一格式
let responseData
router.use((req, res, next) => {
        responseData = {
            code: 0,
            message: ''
        }
        next()
    })
    /**
     * 分类显示
     */
router.get('/', async(req, res) => {
    try {

        let CategoryList = await Category.find({ catname: { $ne: null } })
        res.json({
            CategoryList,
        })

    } catch (err) {
        console.log(err)
    }
})

router.get('/category_err', async(req, res) => {
        try {
            res.render('category/category_err', {
                username: req.session.user.nickname
            })
        } catch (err) {
            console.log(err)
        }
    })
    /**
     * 分类保存和修改
     **/
router.post('/category_addORedit', async(req, res) => {
        try {
            let editId = await req.body.editId || '',
                cateName = await req.body.cateName || '',
                cateDes = await req.body.cateDes || '',
                cateContent = await req.body.cateContent || '',
                cateImg = await req.body.cateImg || '',
                cateId = await req.body.cateId || '';
            if (editId == '') {
                // 类名是否为空
                if (cateName == '') {
                    responseData.code = 1
                    responseData.message = '名称不能为空'
                    res.json(responseData)
                    return
                }
                let catName = await Category.findOne({ catname: cateName })
                    // 类名是否存在
                if (catName) {
                    responseData.code = 2
                    responseData.message = '当前类名已存在,请勿重复添加'
                    res.json(responseData)
                    return
                }
                if (cateId != '') {
                    categoryName = await new Category({
                        catname: cateName,
                        cateDes: cateDes,
                        cateContent: cateContent,
                        cateImg: cateImg,
                        pid: cateId
                    })
                } else {
                    categoryName = await new Category({
                        catname: cateName,
                        cateDes: cateDes,
                        cateContent: cateContent,
                        cateImg: cateImg
                    })
                }
                responseData.code = 0
                responseData.message = '保存成功'
                res.json(responseData)
                return categoryName.save()
            } else {
                // 类名是否为空
                if (cateName == '') {
                    responseData.code = 1
                    responseData.message = '名称不能为空'
                    res.json(responseData)
                    return
                }
                let category = await Category.findOne({
                    _id: editId
                })

                if (!category) {
                    responseData.code = 2
                    responseData.message = '分类信息不存在'
                    res.json(responseData)
                    return
                }
                responseData.message = '修改成功'
                res.json(responseData)

                if (cateId != '') {
                    return Category.updateOne({
                        _id: editId
                    }, {
                        catname: cateName,
                        cateDes: cateDes,
                        cateContent: cateContent,
                        cateImg: cateImg,
                        pid: cateId
                    })
                } else {
                    return Category.updateOne({
                        _id: editId
                    }, {
                        catname: cateName,
                        cateDes: cateDes,
                        cateContent: cateContent,
                        cateImg: cateImg
                    })
                }

            }

        } catch (err) {
            console.log('这是错误' + err)
        }
    })
    /**
     * 分类查询删除
     */
router.post('/category_removeFind', async(req, res) => {
    try {
        let appid = await req.body.appid || '';
        if (appid == '') {
            responseData.code = 1
            responseData.message = '条件不能为空'
            res.json(responseData)
            return
        }
        let categor = await Category.findOne({
            _id: appid
        })
        if (!categor) {
            responseData.code = 2
            responseData.message = '该条目不存在'
            res.json(responseData)
            return
        }
        let categorChild = await Category.find({
            $or: [
                { _id: appid },
                { pid: categor.id }
            ]
        })

        let deCategor = await Content.find({
            category: appid
        }).populate(['category'])
        if (!categorChild) {
            responseData.code = 3
            responseData.message = '该条目不存在'
            res.json(responseData)
            return
        } else if (categorChild.length > 1 || deCategor.length > 0) {
            responseData.code = 4
            responseData.message = '该类目下有内容是否删除'
            res.json(responseData)
            return
        }

        responseData.code = 0
        responseData.message = '是否删除'
        res.json(responseData)
        return
    } catch (err) {
        console.log(err)
    }
})
router.post('/category_remove', async(req, res) => {
    try {
        let appid = await req.body.appid || '';
        let allid = await req.body.allid || '';
        if (allid.length > 0 && allid != '' && allid != 0) {
            let categorAll = await Category.find({ id: allid })
            if (categorAll) {
                responseData.message = '全部删除成功'
                res.json(responseData)
                return await Category.deleteMany({
                    id: allid
                })
            }
        }
        let categor = await Category.findOne({
            _id: appid
        })
        let categorChild = await Category.find({
            $or: [
                { _id: appid },
                { pid: categor.id }
            ]
        })
        let dcategory = await Content.find({
            category: appid
        }).populate(['category'])
        if (categorChild.length > 1 || dcategory.length > 0) {
            responseData.code = 4
            responseData.message = '全部删除成功'
            res.json(responseData)
            return await Category.deleteMany({
                $or: [
                    { _id: appid },
                    { pid: categor.id }
                ]
            }), await Content.deleteMany({
                category: appid
            }).populate(['category'])
        }
        responseData.message = '该条目删除成功'
        res.json(responseData)
        return await Category.deleteOne({
            _id: appid
        })
    } catch (err) {
        console.log(err)
    }

})
module.exports = router