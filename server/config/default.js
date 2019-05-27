// 配置
module.exports = {
  port: process.env.PORT || 8081,
  url: 'mongodb://localhost:27018/blog',
  session: {
    secret: 'SID',
    name: 'SID',
    resave: true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie: {
      secure: false,
      // maxAge: 60000
    }
  }
}
