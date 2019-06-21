/* eslint-disable no-console */
const express = require('express')
const router = express.Router()
const User = require('../modules/User')


// 返回统一格式
let responseData
router.use((req, res, next) => {
  responseData = {
    code: 0,
    message: ''
  }
  next()
})

router.get('/', function (req, res) {
  res.render('login')
})

/**
 * 注册逻辑
 * 
 * 数据库查询
 */
router.post('/user/register', (req, res) => {
  let nickname = req.body.nickname,
  email = req.body.email == '' ? '暂无邮箱' : req.body.email,
  username = req.body.username,
  password = req.body.password,
  passwords = req.body.passwords
  // 验证用户名密码
  if (username == '') {
    responseData.code = 1
    responseData.message = '用户名不能为空'
    res.json(responseData)
    return
  }
  if (password == '') {
    responseData.code = 2
    responseData.message = '密码不能为空'
    res.json(responseData)
    return
  }
  if (passwords == '') {
    responseData.code = 3
    responseData.message = '确认密码不能为空'
    res.json(responseData)
    return
  }
  if (password != passwords) {
    responseData.code = 4
    responseData.message = '两次输入的密码不一致'
    res.json(responseData)
    return
  }
  if (nickname == '') {
    responseData.code = 6
    responseData.message = '请输入昵称'
    res.json(responseData)
    return
  }

  // 数据库查询Es6语法
  User.findOne({
    username: username
  }).then((userInfo) => {
    if (userInfo) {
      responseData.code = 5
      responseData.message = '用户名已经存在'
      res.json(responseData)
      return
    }
    let user = new User({
      nickname: nickname,
      email: email,
      isAdmin: false,
      username: username,
      password: password
    })
    responseData.message = '注册成功'
    res.json(responseData)
    return user.save()
  }).catch((err) => {
    console.log(err)
    return
  })
  // 数据库查询
  // User.findOne({username: username}, (err, doc) => {
  //   if (doc) {
  //     // responseData.code = 5
  //     // responseData.message = '用户名已经存在'
  //     res.json({
  //       code: 5,
  //       message: '用户名已经存在'
  //     })
  //     return
  //   }else {
  //     let user = new User({
  //       username: username,
  //       password: password
  //     })
  //     user.save((err, doc) => {
  //       responseData.message = '注册成功'
  //       res.json(responseData)
  //     })
  //   }
  // })
})

// 登陆
router.post('/user/login', (req, res) => {
  let username = req.body.username,
      password = req.body.password
  if (username == '' || password == '') {
    responseData.code = 1,
      responseData.message = '用户名和密码不能为空',
      res.json(responseData)
    return
  }
  // 数据库中查询 账号密码
  User.findOne({
    username: username,
    password: password
  }).then((userInfo) => {
    if (!userInfo) {
      responseData.code = 2
      responseData.message = '用户名密码错误'
      res.json(responseData)
      return
    }
    if (!userInfo.isAdmin) {
      responseData.code = 3
      responseData.message = '亲不是管理员无法登录后台'
      res.json(responseData)
      return
    }
    responseData.message = '登陆成功'
    responseData.userInfo = {
      nickname:userInfo.nickname,
      _id: userInfo._id,
      username: username
    }
    req.session.user = responseData.userInfo;   
    res.json(responseData)
    return
  }).catch((err) => {
    console.error(err)
    return
  })
})
//退出
router.get('/user/logout', (req, res) => {
  delete  req.session.user;
  res.json(responseData);
})
module.exports = router
