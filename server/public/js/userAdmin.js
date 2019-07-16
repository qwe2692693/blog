layui.use(['jquery', 'table'], function() {
    let $ = layui.jquery,
        table = layui.table;
    table.render({
        elem: '#table',
        url: '/user',
        cols: [
            [
                { field: '_id', title: 'ID', sort: true, fixed: 'left' },
                { field: 'nickname', title: '昵称' },
                { field: 'username', title: '用户名' },
                { field: 'addTime', title: '注册时间' }
            ]
        ],
        page: true

    })
    $.get('/user', function(data) {
        console.log(data)
    })
})