const mongoose = require('mongoose')
const config = require('config-lite')(__dirname)
const crypto = require('crypto')
const secret = 'SID';
const date = require('../config/date')
    // 启用Promise
mongoose.Promise = global.Promise
mongoose.connect(config.url, { useNewUrlParser: true })

const db = mongoose.connection
const User = require("../modules/User")

db.once('open', async() => {
    try {
        const userData = {
            _id: mongoose.Types.ObjectId('5cb9c2fdd662d11de8680d67'),
            nickname: '管理员',
            username: 'admin',
            password: crypto.createHash('md5', secret).update('admin').digest('hex'),
            addTime: date(),
            isAdmin: true
        }

        const adminUser = await User.findOne({ _id: '5cb9c2fdd662d11de8680d67' })
        if (!adminUser) {
            const user = await new User(userData)
            console.log('创建新管理员,数据链接成功')
            return user.save();
        } else {
            console.log('数据链接成功')
        }
    } catch (err) {
        console.log("db模块" + err)
    }
})

db.on('error', () => {
    console.error('数据库连接失败')
    mongoose.disconnect()
})

db.on('close', () => {
    console.log('数据库断开连接')
})

module.exports = db