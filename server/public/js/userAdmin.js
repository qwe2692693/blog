layui.use(['jquery', 'table', 'form', 'layer'], function() {
    let $ = layui.jquery,
        table = layui.table,
        layer = layui.layer,
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
    let flag = true;
    form.on('switch(isAdminBtn)', function(obj) {
        let _this = this
        if (flag) {
            flag = false
            _this.disabled = true
            $.post('/user_edit', {
                userId: this.value,
                isAdmin: obj.elem.checked
            }, function(data) {
                if (data.code == 1) {
                    layer.msg(result.message, { icon: 5 });
                    return
                }
                if (data.code == 0) {
                    layer.msg(data.message, { time: 1000, anim: 5 }, function() {
                        flag = true
                        _this.disabled = false
                    })
                    return
                }
            })
        } else {
            layer.msg('反应不过来了')
        }



        // layer.tips(this.value + ' ' + this.name + '：' + obj.elem.checked, obj.othis);
    });

})