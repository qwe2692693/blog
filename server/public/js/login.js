layui.use(['form', 'layer', 'jquery'], function() {
    let form = layui.form,
        layer = layui.layer,
        $ = layui.jquery;

    //弹窗动画
    layer.config({
        anim: 6, //默认动画风格
    });
    // 登陆
    form.on('submit(login)', function(data) {
        $.ajax({
            type: 'post',
            url: '/login/user/login',
            data: {
                username: data.field.username,
                password: data.field.password
            },
            dataType: 'json',
            success(result) {
                if (result.code == 1) {
                    layer.msg(result.message, { icon: 5 });
                    return
                }
                if (result.code == 2) {
                    layer.msg(result.message, { icon: 5 });
                    return
                }
                if (result.code == 3) {
                    layer.msg(result.message, { icon: 5 });
                    return
                }
                $(data.elem).text('登录中...').attr('disabled', 'disabled').addClass('layui-disabled');
                setTimeout(function() {
                    window.location.href = 'admin';
                }, 1000);
                form.val('rest', {
                    'username': '',
                    'password': ''
                })
                return false;
            }
        })

    })

    $('.loginBody .input-item').click(function(e) {
        e.stopPropagation();
        $(this).addClass('input-focus').find('.layui-input').focus();
    })

    $('.loginBody .input-item .layui-input').focus(function() {
        $(this).parent().addClass('input-focus');
    })

    $('.loginBody .input-item .layui-input').blur(function() {
        $(this).parent().removeClass('input-focus');
        if ($(this).val() != '') {
            $(this).parent().addClass('input-focus-active');
        } else {
            $(this).parent().removeClass('input-focus-active');
        }
    })

    form.verify({
        nickname: (value) => {
            if (value == '') {
                return '昵称空啦';
            }
        },
        email: (value) => {
            if (value == '') {
                return '邮箱空啦';
            }
        },
        username: (value) => { //value：表单的值、item：表单的DOM对象
            if (value == '') {
                return '用户名空啦';
            }
            if (!new RegExp('^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$').test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }
        },
        password: (value) => {
            if (value == '') {
                return '写个密码怎么样';
            }
        },
        passwords: (value) => {
            if (value == '') {
                return '确认密码也不能空哦';
            }
        }
    })

    //注册

    $('#regSub').on('click', function() {
        $('#regBox').removeClass('layui-hide');
        $('#loginBox').addClass('layui-hide');

    })
    $('#returnLogin').on('click', function() {
        $('#loginBox').removeClass('layui-hide');
        $('#regBox').addClass('layui-hide');

    })
    form.on('submit(regSub)', function(data) {
        $.ajax({
            type: 'post',
            url: '/login/user/register',
            data: {
                nickname: data.field.nicknamee,
                email: data.field.email,
                username: data.field.username,
                password: data.field.password,
                passwords: data.field.passwords,
            },
            dataType: 'json',
            success(result) {
                console.log()
                if (result.code == 1 || result.code == 5) {
                    layer.msg(result.message, { icon: 5 });
                    return
                }
                if (result.code == 2) {
                    layer.msg(result.message, { icon: 5 });
                    return
                }
                if (result.code == 3 || result.code == 4) {
                    layer.msg(result.message, { icon: 5 });
                    return
                }
                if (result.code == 6) {
                    layer.msg(result.message, { icon: 5 });
                    return
                }
                if (result.code == 0) {
                    $('#loginBox').removeClass('layui-hide');
                    $('#regBox').addClass('layui-hide');
                    form.val('rest', {
                        'username': data.field.username,
                        'password': data.field.password,
                    })
                    $('.loginBody .input-item .layui-input').parent().addClass('input-focus-active')
                    form.val('restF', {
                        'nickname': '',
                        'email': '',
                        'username': '',
                        'password': '',
                        'passwords': ''
                    })
                    return false
                }
            }

        })
    })
})