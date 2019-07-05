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
    obj.customConfig.uploadImgShowBase64 = true
    obj.customConfig.zIndex = 100;
    obj.create()
}

layui.use(['form', 'jquery', 'layer', 'laytpl'], function() {
    let form = layui.form,
        $ = layui.jquery,
        laytpl = layui.laytpl,
        layer = layui.layer;
    initEditor(editor);

    /**
     * 获取栏目
     */
    $.get('/category', { async: false }, function(res) {
        let getTpl = parendFun.innerHTML,
            view = document.getElementById('parentView');
        let cateDatas = {
            CategoryList: res.CategoryList,
        }
        laytpl(getTpl).render(cateDatas, function(html) {
            view.innerHTML = html;
        });
        form.render('select')
    })



    form.on('submit(submit)', function(data) {
        if (editor.txt.html().match('<p><br></p>')) {
            layer.msg('不添内容写他干什么', { icon: 5, anim: 6 })
            return
        }
        $.post('/content/content_add', {
            title: data.field.title,
            description: data.field.cateDes,
            content: editor.txt.html(),
            cateId: data.field.cateId
        }, function(res) {
            console.log(res)
        })
    })
})