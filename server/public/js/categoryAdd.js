layui.use(['form', 'layer', 'upload', 'laytpl'], function() {
    let form = layui.form,
        layer = layui.layer,
        upload = layui.upload,
        laytpl = layui.laytpl,
        $ = layui.jquery;
    initEditor(editor)
        //上传栏目图片
    let imgStr = '';
    upload.render({
        elem: '#dateAddUpload',
        url: '/upload/',
        auto: false, //选择文件后不自动上传
        bindAction: '#submitBtn', //指向一个按钮触发上传
        field: 'myFileName',
        before: function(obj) { //obj参数包含的信息，跟 choose回调完全一致，可参见上文。
            layer.load(); //上传loading
        },
        choose: function(obj) {
            obj.preview(function(index, file, result) {
                let imgSrc = '<div class="showImgBox"><img src=' + result + '></div>';
                $("#dateAddUpload .zw").html(imgSrc)
            })
        },
        done: function(res, index, upload) { //上传后的回调
            layer.closeAll('loading')
            imgStr = res.imgPath
            submitFun(res.imgPath)

        },
        error: function(index, upload) {
            layer.closeAll('loading'); //关闭loading
        }
    })


    function submitFun(obj) {
        if ($("#parentId").val() != '') {
            cateAddFun('/category/category_addORedit', {
                editId: $("#editId").val(),
                cateName: $("input[name=cateName]").val(),
                cateDes: $("textarea[name=cateDes]").val(),
                cateContent: editor.txt.text(),
                cateImg: obj,
                cateId: $("#cateNameVal").val(),
            })
        } else {
            cateAddFun('/category/category_addORedit', {
                editId: $("#editId").val(),
                cateName: $("input[name=cateName]").val(),
                cateDes: $("textarea[name=cateDes]").val(),
                cateContent: editor.txt.html(),
                cateImg: obj
            })
        }
    }

    form.on("submit(submit)", function() {
        if (imgStr == '') {
            submitFun(imgStr)
        } else if (imgStr != '') {
            submitFun(imgStr)
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
                }, function() {
                    layer.closeAll("iframe");
                    //刷新父页面
                    parent.location.reload();
                });

            }
        })
    }

    editor.txt.html($("input[name=editor]").val())
    $("input[name=editor]").val('')

    if (!$("#parentS").hasClass('layui-hide')) {
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
    }
})