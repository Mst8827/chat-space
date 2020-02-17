$(function(){
  function buildHTML(message) {
    var image = message.image ? `<img src="${message.image}" class="lower-message__image">` : "" ;
      var html =
        `<div class="message" data-message-id="${message.id}" >
            <div class="upper-message">
              <div class="upper-message__user-name">
                ${message.user_name}
              </div>
              <div class="upper-message__date">
                ${message.created_at}
              </div>
            </div>
            <div class="lower-message">
              <p class="lower-message__content">
                ${message.content}
              </p>
              ${image}
            </div>
        </div>`
      return html;
  }



$('#new_message').on('submit', function(e){
    e.preventDefault();

    $('#SubmitBtn').removeAttr('data-disable-with');

    var formData = new FormData(this)
    var url = $(this).attr('action')
    $.ajax({
      url: url, 
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
      .done(function(data){
        var html = buildHTML(data);
        $('.MainChat__MessageList').append(html);
        $('.MainChat__MessageList').animate({ scrollTop: $('.MainChat__MessageList')[0].scrollHeight});
        $('form')[0].reset();
      })
      .fail(function(){
        alert('メッセージ送信に失敗しました');
      });
      return false;
})

var reloadMessages = function() {
  //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
  last_message_id = $('.message:last').data("message-id");
  $.ajax({
    //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
    url: "api/messages",
    //ルーティングで設定した通りhttpメソッドをgetに指定
    type: 'get',
    dataType: 'json',
    //dataオプションでリクエストに値を含める
    data: {id: last_message_id}
  })
  .done(function(messages) {
    // console.log('success');
    if (messages.length !== 0) {
      var insertHTML = '';
      $.each(messages, function(i,message) {
        insertHTML += buildHTML(message)
      });
      $('.MainChat__MessageList').append(insertHTML);
      $('.MainChat__MessageList').animate({ scrollTop: $('.MainChat__MessageList')[0].scrollHeight});
    }

  })
  .fail(function() {
    console.log('error');
  });
};
    if (document.location.href.match(/\/groups\/\d+\/messages/)) {
      setInterval(reloadMessages, 7000);
    }
});
