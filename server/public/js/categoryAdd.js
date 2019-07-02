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
    obj.customConfig.zIndex = 100;
    obj.create()
}
initEditor(editor)

layui.use(['form', 'layer', 'upload', 'laytpl'], function() {
    let form = layui.form,
        layer = layui.layer,
        upload = layui.upload,
        laytpl = layui.laytpl,
        $ = layui.jquery;
    let imgErr = true,
        cateImg;
    //上传栏目图片
    upload.render({
        elem: '#dateAddUpload',
        url: '/upload/',
        auto: false, //选择文件后不自动上传
        bindAction: '#submitBtn', //指向一个按钮触发上传
        field: 'myFileName',
        done: function(res, index, upload) {
            if (!res.isOk) {
                imgErr = false;
            }
        },
        choose: function(obj) {
            obj.preview(function(index, file, result) {
                let imgSrc = '<div class="showImgBox"><img src=' + result + '></div>';
                cateImg = file.name;
                $("#dateAddUpload").append(imgSrc)
            })
        }
    })

    form.on('submit(submit)', function(data) {
        if (!imgErr) {
            layer.msg('图片上传错误', {
                anim: 6,
                icon: 5,
                time: 1000,
            });
            return
        }
        if ($("#parentId").val() != '') {
            cateAddFun({
                cateName: data.field.cateName,
                cateDes: data.field.cateDes,
                cateContent: editor.txt.text(),
                cateImg: cateImg,
                cateId: $("#cateNameVal").val(),
            })

        } else {
            cateAddFun({
                cateName: data.field.cateName,
                cateDes: data.field.cateDes,
                cateContent: editor.txt.text(),
                cateImg: cateImg
            })
        }
    })

    function cateAddFun(data) {
        $.post('/category/category_add', data, (req) => {
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
    }






    $.get('/category', { async: false }, function(data) {
        let getTpl = parentFun.innerHTML,
            view = document.getElementById('parentView'),
            cateId = $("#parentId").val();

        let cateDatas = {
            CategoryList: data.CategoryList,
            CateId: cateId
        }
        laytpl(getTpl).render(cateDatas, function(html) {
            view.innerHTML = html;
        });
        form.render('select')
    })


})