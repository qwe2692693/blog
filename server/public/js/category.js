layui.config({
    base: '/static/layui/treeTable/', //假设这是你存放拓展模块的根目录
})
layui.use(['treeTable', 'layer', 'form', 'jquery'], function() {
    let $ = layui.jquery,
        layer = layui.layer,
        treeTable = layui.treeTable,
        form = layui.form,
        index;

    $.get('/category', function(data) {
        treeFun(data.CategoryList)
    })

    function treeFun(data) {
        treeTable.render({
            elem: '#tree-table',
            data: data,
            icon_key: 'title',
            is_checkbox: true,
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
                    template: function(item) {
                        return '<div class="more">' +
                            '<a href = "javascript:;" >' +
                            '<i class="layui-icon">&#xe65f;</i>' +
                            '</a>' +
                            '<dl class="more-child">' +
                            '<dd><a href="javascript:;" class="addChild" lay-filter="add">增加子类</a></dd>' +
                            '<dd><a href="javascript:;" class="delete">删除</a></dd>' +
                            '<dd><a href="javascript:;" class="edit">编辑</a></dd>' +
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
                        body.find('#parentId').val(obj.item._id)
                    }
                }
            }
        })
        setTimeout(function() {
            layer.tips('点击此处返回文章列表', '.layui-layer-setwin .layui-layer-close', {
                tips: 3
            });
        }, 500)
        layer.full(index);

    }

    $(window).on('resize', function() {
        layer.full(index);
    })

    $('.addCategory').on('click', function() {
        addCategory()
    })

    treeTable.on('tree(add)', function(data) {
        addCategory(data)
    })
})