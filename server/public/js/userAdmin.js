layui.use(['jquery', 'table', 'form'], function() {
    let $ = layui.jquery,
        table = layui.table,
        form = layui.form;
    table.render({
        elem: '#table',
        url: '/user',
        cols: [
            [
                { field: '_id', title: 'ID', sort: true, fixed: 'left' },
                { field: 'nickname', title: '昵称' },
                { field: 'username', title: '用户名' },
                { field: 'addTime', title: '注册时间' },
                { field: 'isAdmin', title: '管理员', templet: '#userTpl', width: 85, }
            ]
        ],
        page: true

    })
    form.on('switch(isAdminBtn)', function(obj) {
        console.log(obj)
            // layer.tips(this.value + ' ' + this.name + '：' + obj.elem.checked, obj.othis);
    });

})