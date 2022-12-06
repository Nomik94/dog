// window.onload = () => {
$(document).ready(() => {
  setBoards();
});

const setBoards = (page) => {
  if (page == undefined) {
    $.ajax({
      type: "GET",
      url: '/boards',
      data: {},
      success: (res) => {
        if (res.response.total_page === 0) {
          $('#boards').append(`<h1>등록된 게시글이 없습니다.</h1>`);
        } else {
          setBoardsContent(res.response);
          setPagination(res.response);
        }
      }
    });
  } else {
    $.ajax({
      type: "GET",
      url: `/boards?p=${page}`,
      data: {},
      success: (res) => {
        if (res.response.total_page === 0) {
          $('#boards').append(`<h1>등록된 게시글이 없습니다.</h1>`);
        } else {
          setBoardsContent(res.response);
          setPagination(res.response);
        }
      }
    });
  }
  
};

const setBoardsContent = (response) => {
  let temp = '';
  $('#boards').empty();
  response.boards.forEach((board) => {
    temp += `<div class="card mb-2" style="cursor: pointer;" onclick="(alert('${board.id} 게시글 이동'))">
              <div class="d-flex">
                <div class="p-2 w-100">
                  <div class="card-body">
                    <h5 class="card-title">${board.title}</h5>
                    <p class="card-text">${board.content}</p>
                  </div>
                </div>
                <div class="p-2 flex-shrink-1">
                  <img src="https://placeimg.com/100/100/any" class="img-fluid rounded-start" alt="...">
                </div>
              </div>
            </div>`;
  })
  $('#boards').append(temp);
};

const setPagination = (response) => {
  let page = parseInt(response.page);
  let total_page = parseInt(response.total_page);
  let start_page = parseInt(response.start_page);
  let end_page = parseInt(response.end_page);

  let temp = '';
  if (start_page != 1) {
    temp += `<li class="page-item">
              <a class="page-link" onclick="setBoards(${start_page-1})">이전</a>
            </li>`;
  } else {
    temp += `<li class="page-item disabled">
              <a class="page-link">이전</a>
            </li>`;
  }
  for (let i=start_page;i<=end_page;i++) {
    if (i == page) {
      temp += `<li class="page-item active"><a class="page-link" onclick="setBoards(${i})">${i}</a></li>`;
    } else {
      temp += `<li class="page-item"><a class="page-link" onclick="setBoards(${i})">${i}</a></li>`;
    }
  }
  if (end_page != total_page) {
    temp += `<li class="page-item">
              <a class="page-link" onclick="setBoards(${end_page+1})">다음</a>
            </li>`;
  } else {
    temp += `<li class="page-item disabled">
              <a class="page-link">다음</a>
            </li>`;
  }
  $('.pagination').empty();
  $('.pagination').append(temp);
};