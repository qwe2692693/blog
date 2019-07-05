layui.use(['table', 'jquery', 'layer'], function() {
    let table = layui.table,
        $ = layui.jquery,
        layer = layui.layer;

    $.get('/content', function(res) {
        console.log(res)
    })
    return

    function conFun() {

    }
    table.render({
        elem: '#content-table',
        url: 'content',
        cols: [
            [ //表头
                { field: 'id', title: 'ID', width: 80, sort: true, fixed: 'left' }
            ]
        ]

    })

})