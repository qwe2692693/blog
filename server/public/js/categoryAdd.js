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

layui.use(['form', 'layer', 'upload', 'laytpl'], function () {
    let form = layui.form,
        layer = layui.layer,
        upload = layui.upload,
        laytpl = layui.laytpl,
        $ = layui.jquery;
    let imgErr = true,
        cateImg;
    initEditor(editor)
    //上传栏目图片
    upload.render({
        elem: '#dateAddUpload',
        url: '/upload/',
        auto: false, //选择文件后不自动上传
        bindAction: '#submitBtn', //指向一个按钮触发上传
        field: 'myFileName',
        done: function (res, index, upload) {
            if (!res.isOk) {
                imgErr = false;
            }
        },
        choose: function (obj) {
            obj.preview(function (index, file, result) {
                let imgSrc = '<div class="showImgBox"><img src=' + result + '></div>';
                cateImg = file.name;
                $("#dateAddUpload .zw").html(imgSrc)
            })
        }
    })

    form.on('submit(submit)', function (data) {
        if (!imgErr) {
            layer.msg('图片上传错误', {
                anim: 6,
                icon: 5,
                time: 1000,
            });
            return
        }
        if ($("#parentId").val() != '') {
            cateAddFun('/category/category_add', {
                cateName: data.field.cateName,
                cateDes: data.field.cateDes,
                cateContent: editor.txt.text(),
                cateImg: cateImg,
                cateId: $("#cateNameVal").val(),
            })

        } else {
            cateAddFun('/category/category_add', {
                cateName: data.field.cateName,
                cateDes: data.field.cateDes,
                cateContent: editor.txt.html(),
                cateImg: cateImg
            })
        }
    })


    form.on('submit(edit)', function (data) {
        if (!imgErr) {
            layer.msg('图片上传错误', {
                anim: 6,
                icon: 5,
                time: 1000,
            });
            return
        }
        if ($("#parentId").val() != '') {
            cateAddFun('/category/category_edit', {
                editId: $("#editId").val(),
                cateName: data.field.cateName,
                cateDes: data.field.cateDes,
                cateContent: editor.txt.text(),
                cateImg: cateImg,
                cateId: $("#cateNameVal").val(),
            })

        } else {
            cateAddFun('/category/category_edit', {
                editId: $("#editId").val(),
                cateName: data.field.cateName,
                cateDes: data.field.cateDes,
                cateContent: editor.txt.html(),
                cateImg: cateImg
            })
        }
    })


    function cateAddFun(url, data) {
        $.post(url, data, (req) => {
            if (req.code == 1 || req.code == 2) {
                $('input[name=cateName]').addClass('layui-form-danger').focus()
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
                }, function () {
                    layer.closeAll("iframe");
                    //刷新父页面
                    parent.location.reload();
                });

            }
        })
    }

    if ($("#submitBtn").attr('lay-filter') == 'edit') {
        editor.txt.html($("input[name=editor]").val())
        $("input[name=editor]").val('')
    }

    if (!$("#parentS").hasClass('layui-hide')) {
        $.get('/category', { async: false }, function (data) {
            let getTpl = parentFun.innerHTML,
                view = document.getElementById('parentView'),
                cateId = $("#parentId").val();

            let cateDatas = {
                CategoryList: data.CategoryList,
                CateId: cateId
            }
            laytpl(getTpl).render(cateDatas, function (html) {
                view.innerHTML = html;
            });
            form.render('select')
        })
    }
})