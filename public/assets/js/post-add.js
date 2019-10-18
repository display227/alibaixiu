$.ajax({
    type: 'get',
    url: '/categories',
    success: function (res) {
        var html = template('categoryTpl', { data: res });
        $('#category').html(html);
        // var status = template('statusTpl', { status: res });
        // $('#status').html(status);
    }
})
// 管理员选择文件时触发 图片上传
$('#feature').on('change', function () {
    var formData = new FormData();
    formData.append('avatar', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (res) {
            $('.thumbnail').attr('src', res[0].avatar).show();
            $('#thumbnail').val(res[0].avatar);
        }
    })
})

$('#addForm').on('submit', function () {
    $.ajax({
        type: 'post',
        url: '/posts',
        data: $(this).serialize(),
        success: function (res) {
            location.href = 'posts.html';
        }
    })
    return false;
})