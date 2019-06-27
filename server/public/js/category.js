layui.config({
    base: '/static/layui/treeTable/' //假设这是你存放拓展模块的根目录
}).extend({ //设定模块别名
    mymod: 'treeTable' //如果 mymod.js 是在根目录，也可以不用设定别名
});

layui.use(['treeTable', 'layer', 'form', 'jquery'], function() {
    let $ = layui.jquery,
        layer = layui.layer,
        index;

    function addCategory() {
        index = layui.layer.open({
            title: "添加栏目",
            type: 2,
            content: 'categoryAdd'
        })

        setTimeout(function() {
            layer.tips('点击此处返回文章列表', '.layui-layer-setwin .layui-layer-close', {
                tips: 3
            });
        }, 500)
        layui.layer.full(index);
        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）

    }
    $(window).on("resize", function() {
        layui.layer.full(index);
    })
    $(".addCategory").on('click', function() {
        addCategory()
    })

})