layui.use(['jquery', 'flow'], function() {
    let $ = layui.jquery,
        flow = layui.flow;
    $.get('/images', function(res) {
        for (let i = 0; i < res.length; i++) {
            $("#imgPage").append('<div class="layui-col-sm6 layui-col-md2"><img lay-src=/static/upload/' + res[i] + ' src=/static/upload/' + res[i] + '></div>')
        }
        flow.lazyimg({
            elem: '#imgPage img'
        });
    })
})