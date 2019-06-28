var E = window.wangEditor
var editor = new E('#editor')

function initEditor(obj) {
    obj.customConfig = {
        debug: true, //开启debug调试
        uploadImgServer: '/upload/', //配置上传图片的接口api
        uploadImgMaxSize: 5 * 1024 * 1024, //图片大小限制为 5M
        uploadImgMaxLength: 10, // 限制一次最多上传 10 张图片
        uploadFileName: 'myFileName', //配置文件参数名（这个参数必需配置，后台用这个值接收图片）
        showLinkImg: true //隐藏网络图片tab
    };
    // obj.customConfig.debug = true
    obj.create()
}
initEditor(editor)

layui.use(['form', 'layer'], function() {
    let form = layui.form,
        layer = layui.layer,
        $ = layui.jquery;
    form.on('submit(submit)', function(data) {
        $.post('/category/category_add', {
            cateName: data.field.cateName,
            cateDes: data.field.cateDes,
            cateContent: editor.txt.text()
        }, (req) => {
            if (req.code == 1) {
                form.verify({
                    cateName: function() {
                        return req.message;
                    }
                })
                layer.msg(req.message, {
                    anim: 6,
                    icon: 5,
                    time: 1000,
                });
                return
            }
            if (req.code == 2) {
                form.verify({
                    cateName: function() {
                        return req.message;
                    }
                })
                layer.msg(req.message, {
                    anim: 6,
                    icon: 5,
                    time: 1000,
                });
                return
            }
            if (req.code == 0) {
                layer.msg(req.message, {
                    time: 1000,
                }, function() {
                    layer.closeAll("iframe");
                    //刷新父页面
                    parent.location.reload();
                });

            }
        })
    })
})