$.ajax({
    type: 'get',
    url: '/slides',
    success: function (res) {
        var html = template('slidesTpl', { data: res });
        $('#slidesBox').html(html);
    }
})
// 管理员选择文件时触发 图片上传
$('#file').on('change', function () {
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
            $('#image').val(res[0].avatar);
        }
    })
})
$('#slidesForm').on('submit', function () {
    $.ajax({
        type: 'post',
        url: '/slides',
        data: $(this).serialize(),
        success: function (res) {
            location.reload();
        }
    })
    return false;
})
// 删除功能
$('#slidesBox').on('click', '.delete', function () {
    if (confirm('您确定要删除吗？')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: `/slides/${id}`,
            success: function () {
                location.reload();
            }
        })
    }
})