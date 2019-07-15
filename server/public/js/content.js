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

    function openPageFun(title, obj) {
        index = layer.open({
            title: title,
            type: 2,
            content: 'contentAdd',
            success: function(layero, index) {
                let body = layer.getChildFrame('body', index);
                if (obj) {
                    body.find('#contentId').val(obj._id)
                    body.find('#editId').val(obj.category._id)
                    body.find('input[name=title]').val(obj.title)
                    body.find('textarea[name=cateDes]').val(obj.description)
                    body.find('input[name=editor]').val(obj.content)
                    body.find('a#submitBtn').attr('lay-filter', 'edit')
                    if (obj.contentImg) {
                        body.find('#dateAddUpload .zw').html('<div class="showImgBox"><img src=/static/upload/' + obj.contentImg + '></div>')
                    }
                }
            }
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
    table.on('tool(contentTable)', function(obj) {
        let data = obj.data;
        if (obj.event == 'edit') {
            openPageFun('编辑页面', data)
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

    $(".addCon").on('click', function() {
        openPageFun('添加页面')
    })
    $(".allDelet").on('click', function() {

        let checkStatus = table.checkStatus('tableId');
        let checkId = [];
        for (let i = 0; i < checkStatus.data.length; i++) {
            checkId.push(checkStatus.data[i]._id);
        }
        if (checkId == 0) {
            layer.msg('选择要删除的文章', { anim: 5, time: 1000 })
        } else {
            layer.confirm('是否全部删除', function(index) {
                $.post('/content/content_remove', {
                    appid: checkId
                }, function(res) {
                    if (res.code == 1) {
                        layer.msg(res.message, { icon: 5, anim: 6, time: 1000 });
                    } else if (res.code == 0) {
                        layer.msg(res.message, { anim: 5, time: 1000 }, function() {
                            location.reload();
                            layer.close(index);
                        })
                    }
                })
                layer.close(index)
            })
        }

    })

})