function initEditor(obj){
    obj.customConfig = {
        debug: true,//开启debug调试
        uploadImgServer: 'http://localhost:8081/upload/',//配置上传图片的接口api
        uploadImgMaxSize: 5 * 1024 * 1024,//图片大小限制为 5M
        uploadImgMaxLength: 10,// 限制一次最多上传 10 张图片
        uploadFileName: 'myFileName',//配置文件参数名（这个参数必需配置，后台用这个值接收图片）
        showLinkImg:true  //隐藏网络图片tab
    };
    // obj.customConfig.debug = true
    obj.create()
}