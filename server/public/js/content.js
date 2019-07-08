layui.use(['table', 'jquery', 'layer'], function() {
    let table = layui.table,
        $ = layui.jquery,
        layer = layui.layer,
        index;
    $(".addCon").on('click', function() {
        index = layer.open({
            title: '添加内容',
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
    })
    table.render({
        elem: '#contentTable',
        url: '/content',
        cols: [
            [ //表头
                { checkbox: true },
                { field: '_id', title: 'ID', sort: true, },
                { field: 'title', title: '文章标题' },
                { field: 'category', title: '所属栏目', templet: '#categoryTpl' },
                { field: 'user', title: '发布者', templet: '#userTpl' },
                { field: 'addTime', title: '发布时间' }
            ]
        ],
        page: true, //开启分页

    })


})