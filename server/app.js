const express = require('express')
const db = require('./mongodb/db')
const config = require('config-lite')(__dirname)
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')



// 路由连接
const admin = require('./routers/admin')
const login = require('./routers/login')
const category = require('./routers/category')
const content = require('./routers/content')
const api = require('./routers/api')
const upload = require('./routers/upload')
const err404 = require('./routers/404')

// 注册ejs模板为html页。简单的讲，就是原来以.ejs为后缀的模板页，现在的后缀名可以//是.html了
app.engine('.html', require('pug').__express)

// 设置视图模板的默认后缀名为.html,避免了每次res.Render("xx.html")的尴尬
app.set('view engine', 'pug')

// 设置模板文件文件夹,__dirname为全局变量,表示网站根目录
app.set('views', __dirname + '/views')

// 挂在静态路由
app.use('/static', express.static(__dirname + '/public'))

// bodyParser 设置
app.use(bodyParser.urlencoded({ extended: true }))

// session设置
app.use(session({
  secret: config.session.secret,
  resave: config.session.resave,
  name: config.session.name,
  saveUninitialized: config.session.saveUninitialized,
  cookie: config.session.cookie
}))



// 路由
app.use('/api',(req,res,next)=>{
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  next();
})
app.use('/api',api)

/**
 * 判断用户是否登陆顺序很重要
 */
app.use('/login', login)

app.use((req, res, next) => {
  var url = req.originalUrl;
  if (url != "/login" && !req.session.user) {
    return res.redirect("/login");
  }
  next();
});
app.use('/admin', admin)
app.use('/category', category)
app.use('/content', content)
app.use('/upload',upload)
app.use('/404', err404)

app.use((req, res, next) => {
  res.render("404")
});


const server = app.listen(config.port, function () {
  const host = server.address().address
  const port = server.address().port
  console.log('当前访问地址: http://%s:%s', host, port)
})
