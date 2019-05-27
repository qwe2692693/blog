function hintErr(html, classObj) {
    if ($(".is-invalid")) {
        $(".is-invalid").removeClass("is-invalid");
    }
    if ($(".invalid-feedback")) {
        $(".invalid-feedback").remove();
    }
    var str = `<div class="invalid-feedback">${html}</div>`;
    classObj.addClass("is-invalid");
    if ($(".invalid-feedback").length > 0) {
        return
    }
    return str
}
function alertBox(str) {
    if ($(".alert")) {
        $(".alert").remove()
    }
    var str = `<div class="alert alert-danger" role="alert">${str}</div>`;
    if (($(".alert").length > 0)) {
        return
    }
    return str
}

