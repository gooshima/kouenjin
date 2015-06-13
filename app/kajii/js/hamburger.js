//libs from //pnra.hatenablog.com/entry/2014/09/24/220950

$(function(){
    $('.button').click(function(){
        $(this).toggleClass('action');
		$('.navigation-contents').toggleClass('open');
		$('section').toggleClass('close');
    });
});

var WindowHeight = $(window).height(); //WindowHeightは変数で任意の名前
$(function(){
  if(WindowHeight > 0){ //開いた画面が100px以上なら実行
    //class="section"の要素に高さを書き込む
    $('.section').css('height',WindowHeight+'px');
  }
});
