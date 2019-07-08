const express = require('express')
const db = require('./mongodb/db')
const config = require('config-lite')(__dirname)
const bodyParser = require('body-parser')
//暂时不用
// const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
// 路由连接
const admin = require('./routers/admin')
const login = require('./routers/login')
const viewPage = require('./routers/viewPage')
const category = require('./routers/category')
const content = require('./routers/content')
const api = require('./routers/api')
const upload = require('./routers/upload')
const err404 = require('./routers/404')
const app = express()



// 注册ejs模板为html页。简单的讲，就是原来以.ejs为后缀的模板页，现在的后缀名可以//是.html了
app.engine('.html', require('ejs').__express)

// 设置视图模板的默认后缀名为.html,避免了每次res.Render("xx.html")的尴尬
app.set('view engine', 'html')

// 设置模板文件文件夹,__dirname为全局变量,表示网站根目录
app.set('views', __dirname + '/views')

// 挂在静态路由
app.use('/static', express.static(__dirname + '/public'))

// bodyParser 设置
app.use(bodyParser.urlencoded({ extended: true }))

//设置cookies
// app.use(cookieParser(config.session.secret))
// session设置
app.use(session({
    store: new MongoStore({
        url: config.url,
    }),
    secret: config.session.secret,
    resave: config.session.resave,
    name: config.session.name,
    saveUninitialized: config.session.saveUninitialized,
    cookie: config.session.cookie
}))



// 路由
app.use('/api', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    next();
})
app.use('/api', api)

/**
 * 判断用户是否登陆顺序很重要
 */
app.use('/login', login)
app.use((req, res, next) => {
    // var url = req.originalUrl;
    if (!req.session.user) {
        res.redirect("/login");
        return
    } else {
        next();
    }
});
app.use('/', admin)
app.use('/viewPage', viewPage)
app.use('/category', category)
app.use('/content', content)
app.use('/upload', upload)
// app.use('/404', err404)

app.use((req, res,next) => {
    res.send('当前页面不存在')
});


const server = app.listen(config.port, 'localhost', function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('当前访问地址:  http://%s:%s', host, port)
})