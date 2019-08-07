layui.use(['form', 'jquery', 'layer', 'laytpl', 'upload'], function() {
    let form = layui.form,
        $ = layui.jquery,
        laytpl = layui.laytpl,
        layer = layui.layer,
        upload = layui.upload;
    
    initEditor(editor);
    let imgStr = '';
    //上传图片
    upload.render({
            elem: '#dateAddUpload',
            url: '/upload/',
            auto: false, //选择文件后不自动上传
            bindAction: '#submitBtn', //指向一个按钮触发上传
            field: 'myFileName',
            before:function (obj){
                layer.load();
            },
            choose: function(obj) {
                obj.preview(function(index, file, result) {
                    let imgSrc = '<div class="showImgBox"><img src=' + result + '></div>';
                    $("#dateAddUpload .zw").html(imgSrc)
                })
            },
            done: function(res, index, upload) {
               if(res.isOk){
                imgStr = res.imgPath
                    layer.closeAll('loading')
                    formSubmitFun(imgStr);
               }
            },
        })
        /**
         * 获取栏目
         */

    $.get('/category', { async: false }, function(res) {
        let getTpl = parendFun.innerHTML,
            view = document.getElementById('parentView'),
            editId = $('#editId').val(),
            cateDatas = '';
        if (editId != '') {
            cateDatas = {
                CategoryList: res.CategoryList,
                editId: editId
            }
        } else {
            cateDatas = {
                CategoryList: res.CategoryList,
            }
        }
        laytpl(getTpl).render(cateDatas, function(html) {
            view.innerHTML = html;
        });
        form.render('select')
    })

    function formSubmitFun(obj){
        editFun('/content/content_addORedit', {
            contentId: $("#contentId").val(),
            title: $("input[name=title]").val(),
            description: $("textarea[name=cateDes]").val(),
            content: editor.txt.html(),
            contentImg: obj,
            cateId: $("#cateNameVal").val(),
            cateName:$("#cateNameVal").val()
        }, function(res) {
            if (res.code == 1) {
                $('input[name=title]').addClass('layui-form-danger').focus()
                layer.msg(res.message, {
                    anim: 6,
                    icon: 5,
                    time: 1000,
                });
                return
            }
            if (res.code == 2 || res.code == 5) {
                layer.msg(res.message, {
                    anim: 6,
                    icon: 5,
                    time: 1000,
                });
                return
            }
            if (res.code == 4 || res.code == 3) {
                $('select[name=cateId]').addClass('layui-form-danger')
                layer.msg(res.message, {
                    anim: 6,
                    icon: 5,
                    time: 1000,
                });
                return
            }
            if (res.code == 0) {
                layer.msg(res.message, {
                    time: 1000,
                }, function() {
                    layer.closeAll("iframe");
                    //刷新父页面
                    parent.location.reload();
                });
            }
        })

    }

form.on("submit(submit)",function (){
    formSubmitFun(imgStr)
})


    // form.on('submit(edit)', function(data) {
    //     editFun('/content/content_edit', {
    //         contentId: $("#contentId").val(),
    //         title: data.field.title,
    //         description: data.field.cateDes,
    //         content: editor.txt.html(),
    //         contentImg: contentImg,
    //         cateName: data.field.cateId
    //     }, function(res) {
    //         if (res.code == 1) {
    //             layer.msg(res.message, {
    //                 anim: 6,
    //                 icon: 5,
    //                 time: 1000,
    //             });
    //         }
    //         if (res.code == 0) {
    //             layer.msg(res.message, {
    //                 time: 1000,
    //             }, function() {
    //                 layer.closeAll("iframe");
    //                 //刷新父页面
    //                 parent.location.reload();
    //             });
    //         }
    //     })
    // })
    if ($("input[name=editor]").val() != '') {
        editor.txt.html($("input[name=editor]").val())
        $("input[name=editor]").val('')
    }

    function editFun(url, obj, funObj) {
        if (editor.txt.html().match('<p><br></p>')) {
            layer.msg('不添内容写他干什么', { icon: 5, anim: 6 })
            return
        }
        $.post(url, obj, funObj)
    }

})