// 获取当前的系时间
let nowDate = '';

function dateFilter(date) {
    return date < 10 ? '0' + date : date;
}
getNowDat()
//获取时间的方法
function getNowDat() {
    let dateObj = new Date(),
        year = dateObj.getFullYear(), //年
        month = dateObj.getMonth() + 1, //月
        date = dateObj.getDate(), //日
        day = dateObj.getDay(), //天
        hours = dateObj.getHours(), //时
        minutes = dateObj.getMinutes(), //分
        seconds = dateObj.getSeconds(), //秒
        pam = ((hours >= 12) ? (hours >= 18) ? "晚上" : "下午" : "上午"), //当前时间属于上午、晚上还是下午
        dayStr;
    switch (day) {
        case 1:
            dayStr = '星期一'
            break;
        case 2:
            dayStr = '星期二'
            break;
        case 3:
            dayStr = '星期三'
            break;
        case 4:
            dayStr = '星期四'
            break;
        case 5:
            dayStr = '星期五'
            break;
        case 6:
            dayStr = '星期六'
            break;
        default:
            dayStr = '星期日';
    }

    nowDate = '当前时间' + year + '年' + dateFilter(month) + '月' + dateFilter(date) + '日' + dateFilter(hours) + ':' + dateFilter(minutes) + ':' + dateFilter(seconds) + '&nbsp;' + dayStr + '&nbsp;' + pam
    document.getElementById('nowTime').innerHTML = nowDate;
    setTimeout('getNowDat()', 1000)
}
layui.use(['jquery'], () => {
    let $ = layui.jquery,
        tabHtml = '',
        i = 0;
    $.get('/content', (data) => {
        while (i < 10) {
            tabHtml += '<tr>' +
                '<td>' + data.data[i].title + '</td>' +
                '<td>' + data.data[i].addTime + '</td>' +
                '</tr>';
            i++;
        }
        $('.bodyList').html(tabHtml)
    })
})