layui.use(['layer', 'form', 'jquery'], function () {
    let $ = layui.jquery,
        layer = layui.layer,
        form = layui.form;

    $("#adminData").on('click', function () {
        let users = ''
        $.get({
            url: "/user_now",
            type: "get",
            success(res) {
                if (res.code == 200) {
                    users = res.data
                }
            }
        })
    })




    $("#signOut").on("click", function () {
        layer.confirm('确定退出？', {
            btn: ['确定', '取消']
        }, function () {
            $.ajax({
                type: 'post',
                url: '/login/user/logout',
                success(res) {
                    if (res.code == 100) {
                        window.location.href = "/login"
                    }
                }
            })
        });
    })




})