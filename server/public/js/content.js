layui.use(['table', 'jquery', 'layer'], function() {
    let table = layui.table,
        $ = layui.jquery,
        layer = layui.layer,
        index;

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
    table.render({
        elem: '#contentTable',
        url: '/content',
        height: "full-125",
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
            alert('删除')
        }
    })
})