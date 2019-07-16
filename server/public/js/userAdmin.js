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
    let flag = true,
        time = null;
    form.on('switch(isAdminBtn)', function(obj) {
        if (flag) {
            console.log('我点了')
            flag = false
            setTimeout(function() {
                flag = true
            }, 5000)
        }
        if (!flag) {
            console.log("等会再点")
        }


        // layer.tips(this.value + ' ' + this.name + '：' + obj.elem.checked, obj.othis);
    });

})