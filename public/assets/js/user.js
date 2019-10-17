// 添加新用户
$.ajax({
    type: 'get',
    url: '/users',
    success: function (res) {
        var html = template('userTpl', { data: res });
        $('#userBox').html(html);
    }
})
// 渲染新用户
$('#userForm').on('submit', function () {
    // jq提供的方法 可以自动把当前表单所有的表单数据序列化 自动收集
    var formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function (res) {
            location.reload(); // 刷新当前页面
        }
    })
    return false; // 兼容性最强的
})
// 添加图片功能
$('#modifyBox').on('change', '#avatar', function () {
    var formData = new FormData();
    formData.append('avatar', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (res) {
            $('#hiddenImg').val(res[0].avatar);
            $('#preview').attr('src', res[0].avatar);
        }
    })
})
// 点击编辑按钮
$('#userBox').on('click', '.edit', function () {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function (res) {
            var html = template('modifyTpl', res);
            $('#modifyBox').html(html);
        }
    })
})
// 渲染编辑功能
$('#modifyBox').on('submit', '#modifyForm', function () {
    var formData = $(this).serialize();
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: formData,
        success: function () {
            location.reload();
        }
    })
    return false;
})
// 点击删除按钮
$('#userBox').on('click', '.delete', function () {
    if (confirm('您真的确定删除吗？')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function () {
                location.reload();
            }
        })
    }
})
// 批量删除
$('#checkAll').on('change', function () {
    var bool = $(this).prop('checked');
    var checkList = $('#userBox input[type="checkbox');
    checkList.prop('checked', bool);
    if (bool == true) {
        $('#deleteAll').show();
    } else {
        $('#deleteAll').hide();
    }
})
$('#userBox').on('change', 'input[type="checkbox"]', function () {
    if ($('#userBox input[type="checkbox"]').length == $('#userBox input[type="checkbox"]:checked').length) {
        $('#checkAll').prop('checked', true);
    } else {
        $('#checkAll').prop('checked', false);
    }
    if ($('#userBox input[type="checkbox"]:checked').length > 0) {
        $('#deleteAll').show();
    } else {
        $('#deleteAll').hide();
    }
})
$('#deleteAll').on('click', function () {
    var checkList = $('#userBox input[type="checkbox"]:checked');
    var str = '';
    checkList.each(function (index, item) {
        str += $(item).attr('data-id') + '-';
    })
    str = str.substr(0, str.length - 1);
    $.ajax({
        type: 'delete',
        url: '/users/' + str,
        success: function () {
            location.reload();
        }
    })

})
