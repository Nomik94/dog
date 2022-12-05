let query = window.location.search;
let param = new URLSearchParams(query);
let id = param.get('id');
alert(id + '번째 게시글로 이동합니다.')

$(document).ready(function(){
    view_post_get(id);
})

function view_post_get(id) {
    console.log(id + '번 게시글 페이지')
            $.ajax({
                type: "get", 
                url: `/views/${id}`,
                // data: {view_post_give: id},
                success: function (response) {
                    let rows = response['view_post_list']
                    console.log(rows)
                    let title = rows[0]['title']
                    let content = rows[0]['content']
                    let temp_html =  `<h1>${title}</h1>
                                        <h5>${content}</h5>
                                        <button onclick="delete_post(${id})" type="button" id="delete_comment" class="btn btn-dark delete_ment">삭제</button>
                                        <button onclick="update_post(${id})" type="button" id="delete_comment" class="btn btn-dark recover">수정</button>`
    
                    $('#view_post').append(temp_html)
                    }
                }
            );
    }

function delete_post(id) {
    $.ajax({
        type: "POST",
        url: "/post/delete",
        data: { id_give: id },
        success: function (response) {
            alert(response['msg'])
            location.href="/temp";
        }
    });
}

function update_post(id) {
    let update_post_title = prompt('수정할 타이틀을 적어주세요.')
    let update_post_content = prompt('수정할 내용을 적어주세요.')
    
    // if (!(update_post_title === null || update_post_content === null)) {
        $.ajax({
            type: "POST",
            url: "/post/update",
            data: {title_give: update_post_title, content_give: update_post_content ,id_give: id},
            success: function (response) {
                alert(response["msg"])
                window.location.reload()
            },
        });
    // } else {
        // window.location.reload()
    // }
}