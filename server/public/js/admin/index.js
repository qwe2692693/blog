layui.use(['layer', 'form', 'jquery'], function () {
    let $ = layui.jquery,
        layer = layui.layer,
        form = layui.form;

    $(".signOut").on("click", function () {
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