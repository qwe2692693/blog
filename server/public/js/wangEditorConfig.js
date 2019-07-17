var E = window.wangEditor
var editor = new E('#editor')

function initEditor(obj) {
    obj.customConfig = {
        debug: true, //开启debug调试
        uploadImgMaxLength: 10, // 限制一次最多上传 10 张图片
        showLinkImg: true //隐藏网络图片tab
    };
    // obj.customConfig.debug = true
    obj.customConfig.uploadImgShowBase64 = true
    obj.customConfig.zIndex = 100;
    obj.create()
}