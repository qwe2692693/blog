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
router.get('/', async (req, res) => {
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
    let categoryCount = await Category.countDocuments()
    data.count = categoryCount
    // 计算总页数
    data.pages = Math.ceil(data.count / data.limit)
    // 取值不能小于pages
    data.page = Math.min(data.page, data.pages)
    // 取值不能小于pages
    data.page = Math.max(data.page, 1)
    let skip = (data.page - 1) * data.limit

    let CategoryList = await Category.find().limit(data.limit).skip(skip)
    res.render('category/category', {
      username:req.session.user.nickname,
      CategoryList: CategoryList,
      data: data
    })
  } catch (err) {
    console.log(err)
  }
})

router.get('/category_err', async (req, res) => {
  try {
    res.render('category/category_err', {
      username:req.session.user.nickname
    })
  } catch (err) {
    console.log(err)
  }
})

router.get('/category_add', async (req, res) => {
  try {
    res.render('category/category_add', {
      username:req.session.user.nickname
    })
  } catch (err) {
    console.log(err)
  }
})
/**
 * 分类保存
**/
router.post('/category_add', async (req, res) => {
  try {
    let cateName = await req.body.cateName || '';
    let cateShort = await req.body.cateShort || '';
    // 类名是否为空
    if (cateName == '') {
      responseData.code = 1,
        responseData.message = '名称不能为空'
      res.json(responseData)
      return
    }
    if (cateShort == '') {
      cateShort = pinyin(cateName, {
        style: 'normal',
      }).join().replace(/,/g, '')
    }
    let catName = await Category.findOne({ catname: cateName })
    if (catName) {
      responseData.code = 2,
        responseData.message = '当前类名已存在,请勿重复添加'
      res.json(responseData)
      return
    }
    let categoryName = await new Category({
      catname: cateName,
      cateShort: cateShort
    })
    responseData.message = '保存成功'
    res.json(responseData)
    return categoryName.save()
  } catch (err) {
    console.log('这是错误' + err)
  }
})
/**
 * 分类修改
 */
router.get('/category_edit', async (req, res) => {
  try {
    let editId = await req.query.id || '';
    let category = await Category.findOne({
      _id: editId
    })
    if (!category) {
      responseData.code = 1
      responseData.message = '分类信息不存在'
      res.render('category/category_err', {
        username:req.session.user.nickname,
        responseData: responseData
      })
      return
    } else {
      res.render('category/category_edit', {
        username:req.session.user.nickname,
        category: category
      })
      return
    }
  } catch (err) {
    console.log(err)
  }
})

router.post('/category_edit', async (req, res) => {
  try {
    let editName = req.body.cateName || '',
      editId = req.body.cateId || '',
      editcateShort = req.body.cateShort || '';
    // 类名是否为空
    if (editName == '') {
      responseData.code = 1
      responseData.message = '名称不能为空'
      res.json(responseData)
      return
    }
    let category = await Category.findOne({
      _id: editId
    })

    if (!category) {
      responseData.code = 1
      responseData.message = '分类信息不存在'
      res.json(responseData)
      return
    }
    // if (editName == category.catname) {
    //   responseData.code = 2
    //   responseData.message = '名称未修改'
    //   res.json(responseData)
    // }
    if ((editcateShort == '') || (editcateShort != category.cateShort)) {
      editcateShort = pinyin(editName, {
        style: 'normal'
      }).join().replace(/,/g, '')
    }
    responseData.message = '修改成功'
    res.json(responseData)
    return Category.updateOne({
      _id: editId
    }, {
        catname: editName,
        cateShort: editcateShort
      })

  } catch (err) {
    console.log(err)
  }
})
/**
 * 分类删除
 */
router.post('/category_remove', async (req, res) => {
  try {
    let appid = req.body.appid || '',
        flag =!req.body.flag  ? false : req.body.flag
    if (appid == '') {
      responseData.code = 1
      responseData.message = '条件不能为空'
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
    } else {

      let deCategor = await Content.find({
        category: appid
      }).populate(['category'])
      if(!flag){
        if (deCategor.length > 0) {
          responseData.code = 3
          responseData.message = '该条目下有内容是否删除'
          res.json(responseData)
          return
        }
      }else if(flag && deCategor.length>0){
        responseData.message = '该条目以及内容删除成功'
        res.json(responseData)
        return await Content.deleteMany({
             category: appid
           }).populate(['category']),await Category.deleteOne({
          _id: appid
        })
      }else{
        responseData.message = '该条目删除成功'
        res.json(responseData)
        return Category.deleteOne({
          _id: appid
        })
      }
    }
  } catch (err) {
    console.log(err)
  }

})
module.exports = router
