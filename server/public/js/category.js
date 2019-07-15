layui.config({
    base: '/static/layui/treeTable/', //假设这是你存放拓展模块的根目录
})
layui.use(['treeTable', 'layer', 'form', 'jquery'], function() {
    let $ = layui.jquery,
        layer = layui.layer,
        treeTable = layui.treeTable,
        form = layui.form,
        flag = false,
        index, re;

    $.get('/category', function(data) {
        flag = true
        if (flag) {
            $("#loading").hide()
            treeFun(data.CategoryList)
            flag = false
        }
    })

    function treeFun(data) {
        re = treeTable.render({
            elem: '#tree-table',
            data: data,
            icon_key: 'title',
            is_checkbox: true,
            end: function() {
                form.render();
            },
            cols: [{
                    key: 'title',
                    title: '名称',
                    template: function(item) {
                        return '<span>' + item.catname + '</span>';
                    }
                },
                {
                    title: '操作',
                    align: 'center',
                    width: '50px',
                    template: function() {
                        return '<div class="more">' +
                            '<a href = "javascript:;" >' +
                            '<i class="layui-icon">&#xe65f;</i>' +
                            '</a>' +
                            '<dl class="more-child">' +
                            '<dd><a href="javascript:;" class="addChild" lay-filter="add">增加子类</a></dd>' +
                            '<dd><a href="javascript:;" class="edit" lay-filter="edit">编辑</a></dd>' +
                            '<dd><a href="javascript:;" class="delete" lay-filter="delete">删除</a></dd>' +
                            '</dl>' +
                            '</div > '
                    }
                }
            ]
        })
    }

    function addCategory(obj) {
        index = layer.open({
            title: "添加栏目",
            type: 2,
            content: 'categoryAdd',
            success: function(layero, index) {
                let body = layer.getChildFrame('body', index);
                if (obj) {
                    if (obj.elem.className == 'addChild') {
                        body.find('#parentS').removeClass('layui-hide');
                        body.find('#parentId').val(obj.item._id);
                    }

                    if (obj.item.pid != 0 && obj.elem.className == 'edit') {
                        body.find('#parentS').removeClass('layui-hide');
                        body.find('#parentId').val(obj.item.pid);
                        body.find('#editId').val(obj.item._id)
                        body.find('input[name=cateName]').val(obj.item.catname)
                        body.find('textarea[name=cateDes]').val(obj.item.cateDes)
                        body.find('input[name=editor]').val(obj.item.cateContent)
                        body.find('a#submitBtn').attr('lay-filter', 'edit')
                        if (obj.item.cateImg) {
                            body.find('#dateAddUpload .zw').html('<div class="showImgBox"><img src=/static/upload/' + obj.item.cateImg + '></div>')
                        }
                    }

                    if (obj.elem.className == 'edit') {
                        body.find('#editId').val(obj.item._id)
                        body.find('input[name=cateName]').val(obj.item.catname)
                        body.find('textarea[name=cateDes]').val(obj.item.cateDes)
                        body.find('input[name=editor]').val(obj.item.cateContent)
                        body.find('a#submitBtn').attr('lay-filter', 'edit')
                        if (obj.item.cateImg) {
                            body.find('#dateAddUpload .zw').html('<div class="showImgBox"><img src=/static/upload/' + obj.item.cateImg + '></div>')
                        }
                    }
                }
            }
        })
        setTimeout(function() {
            layer.tips('点击此处返回类目列表', '.layui-layer-setwin .layui-layer-close', {
                tips: 3
            });
        }, 500)
        layer.full(index);
        $(window).on('resize', function() {
            layer.full(index);
        })
    }

    $('.addCategory').on('click', function() {
        addCategory()
    })

    treeTable.on('tree(add)', function(data) {
        addCategory(data)
    })

    treeTable.on('tree(edit)', function(data) {
        addCategory(data)
    })

    treeTable.on('tree(delete)', function(data) {
        $.post('/category/category_removeFind', {
            appid: data.item._id,
        }, function(res) {
            if (res.code == 4 || res.code == 0) {
                deleteFu(res.message, data.item._id)
                return
            } else if (res.code == 1 || res.code == 2 || res.code == 3) {
                layer.msg(res.message, { icon: 5, anim: 6 });
                return
            }
        })
    })

    function deleteFu(msg, obj) {
        layer.confirm(msg, { closeBtn: 0 }, function(index) {
            $.post('/category/category_remove', {
                appid: obj,
            }, function(res) {
                layer.msg(res.message, { time: 1000, anim: 5 }, function() {
                    location.reload()
                })
                layer.close(index)

            })
        });
    }

    $(".allDelet").click(function() {
        if (treeTable.checked(re).length == 0 || treeTable.checked(re) == 0) {
            layer.msg('选择参数')
            return
        }
        layer.confirm('是否全部删除', { closeBtn: 0 }, function(index) {
            $.post('/category/category_remove', {
                allid: treeTable.checked(re),
            }, function(res) {
                layer.msg(res.message, { anim: 5, time: 1000 }, function() {
                    location.reload()
                })
                layer.close(index)

            })
        })
    })

    $(".openAll").click(function() {
        treeTable.openAll(re);
    })

    $(".closeAll").click(function() {
        treeTable.closeAll(re);
    })
})