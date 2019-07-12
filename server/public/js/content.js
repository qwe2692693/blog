layui.use(['table', 'jquery', 'layer'], function() {
    let table = layui.table,
        $ = layui.jquery,
        layer = layui.layer,
        index;
    table.render({
        elem: '#contentTable',
        url: '/content',
        height: "full-125",
        id: 'tableId',
        cols: [
            [ //表头
                { checkbox: true, fixed: 'left' },
                { field: '_id', title: 'ID', sort: true, },
                { field: 'title', title: '文章标题' },
                { field: 'category', title: '所属栏目', templet: '#categoryTpl' },
                { field: 'user', title: '发布者', templet: '#userTpl' },
                { field: 'addTime', title: '发布时间' },
                { title: '操作', width: 110, templet: '#oper' }
            ]
        ],
        page: true, //开启分页
    })
    table.on('tool(contentTable)', function(obj) {
        let data = obj.data;
        if (obj.event == 'edit') {
            alert('编辑')
        } else if (obj.event == 'delet') {
            layer.confirm('是否删除', (index) => {
                $.post('/content/content_remove', {
                    appid: data._id
                }, function(res) {
                    if (res.code == 0) {
                        layer.msg(res.message, { anim: 5, time: 1000 }, function() {
                            location.reload();
                            layer.close(index);
                        })
                        return
                    }
                    if (res.code == 1) {
                        layer.msg(res.message)
                        return
                    }
                })
            })
        }
    })

    function openPageFun(title) {
        index = layer.open({
            title: title,
            type: 2,
            content: 'contentAdd',
        });
        setTimeout(function() {
            layer.tips('点击此处返回文章列表', '.layui-layer-setwin .layui-layer-close', {
                tips: 3
            });
        }, 500)
        layer.full(index);
        $(window).on('resize', function() {
            layer.full(index);
        })
    }


    $(".addCon").on('click', function() {
        openPageFun('添加页面')
    })
    $(".allDelet").on('click', function() {
        let checkStatus = table.checkStatus('tableId');
        if (checkStatus.data.length == 0) {
            layer.msg('选择要删除的文章', { anim: 5, time: 1000 })
        } else {
            layer.confirm('是否全部删除', function(index) {
                $.post('/content/content_remove', {
                    appid: checkStatus.data._id
                }, function(res) {
                    console.log(res)
                })
                layer.close(index)
            })
        }

    })

})