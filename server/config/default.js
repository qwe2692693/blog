// 配置
module.exports = {
    port: process.env.PORT || 8082,
    url: 'mongodb://localhost:27018/blog',
    session: {
        secret: 'SID',
        name: 'SID',
        resave: true,
        saveUninitialized: false, // 是否保存未初始化的会话
        cookie: {
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000
        }
    }
}