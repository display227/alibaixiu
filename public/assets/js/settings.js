// $.ajax({
//     type: 'post',
//     url: '/settings',
//     success: function (res) {
//         var html = template('slidesTpl', { data: res });
//         $('#slidesBox').html(html);
//     }
// })
// 管理员选择文件时触发 图片上传
$('#logo').on('change', function () {
    var formData = new FormData();
    formData.append('avatar', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (res) {
            $('.logo').attr('src', res[0].avatar).show();
            $('#hiddenLogo').val(res[0].avatar);
        }
    })
})