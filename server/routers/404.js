const express = require('express')
const router = express.Router()

router.get('404', function (req, res) {
    res.render('404', { title: '错误页面' })
})

module.exports = router
