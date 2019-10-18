$.ajax({
    type: 'get',
    url: '/posts',
    success: function (res) {
        var html = template('postsTpl', res);
        $('#postsBox').html(html);
        var page = template('pageTpl', res);
        $('.pagination').html(page);
    }
})
function dateFormat(date) {
    date = new Date(date);
    return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
}
function changePage(pageNum) {
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page: pageNum
        },
        success: function (res) {
            var html = template('postsTpl', res);
            $('#postsBox').html(html);
            var page = template('pageTpl', res);
            $('.pagination').html(page);
        }
    })
}
// 获取并渲染分类数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (res) {
        var html = template('categoryTpl', { data: res });
        $('#categoryBox').html(html);
        var page = template('pageTpl', res);
        $('.pagination').html(page);
    }
})
$('#filterForm').on('submit', function () {
    var formData = $(this).serialize();
    $.ajax({
        type: 'get',
        url: '/posts',
        data:  formData,
        success: function (res) {
            var html = template('postsTpl', res);
            $('#postsBox').html(html);
            var page = template('pageTpl', res);
            $('.pagination').html(page);
        }
    })
    return false;
})