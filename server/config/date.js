let date = new Date();
module.exports = function dateFun() {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}