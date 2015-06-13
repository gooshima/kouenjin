/// <reference path="typings/jquery.d.ts" />
$(document).ready(function () {
    var pageId = $('body').attr("id");
    //タイトル表示
    if (pageId == 'top') {
        startTittleAnim();
        //リスト
        $('#btnSyncList').click(function () {
            window.location.href = "list.html";
        });
        //DAT書き出し
        $('#btnWriteDat').click(function () {
            window.location.href = "kouen.html";
        });
        //共有メモリ
        $('#btnShareMemory').click(function () {
            alert("準備中。。。");
        });
    }
    //TODO 一覧ページ
    if (pageId == 'list') {
    }
    //TODO DAT書き出しページ
    if (pageId == 'list') {
    }
});
//TODO タイトル表示
function startTittleAnim() {
    var targetObj = $('.split');
    var delaySpeed = 300;
    var fadeSpeed = 100;
    var targetTxt = targetObj.html();
    targetObj.css({ visibility: 'visible' }).children().addBack().contents().each(function () {
        var elmThis = $(this);
        if (this.nodeType == 3) {
            var $this = $(this);
            $this.replaceWith($this.text().replace(/(\S)/g, '<span class="textSplitLoad">$&</span>'));
        }
    });
    var splitLength = $('.textSplitLoad').length;
    targetObj.find('.textSplitLoad').each(function (i) {
        var splitThis = $(this);
        splitThis.delay(i * (delaySpeed)).css({
            display: 'inline-block',
            opacity: '0'
        }).animate({ opacity: '1' }, fadeSpeed);
    });
    setTimeout(function () {
        targetObj.html(targetTxt);
        $('#mainTitle').fadeOut('slow');
        $('#mainBox').fadeIn('slow');
    }, splitLength * delaySpeed + fadeSpeed);
}
//# sourceMappingURL=app.js.map