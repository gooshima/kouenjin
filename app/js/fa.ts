/// <reference path="typings/jquery.d.ts" />

var urlBase = 'http://localhost'; //TODO debug
//var urlBase = 'http://kouen';

var appUrl = urlBase + '/app';
var luaUrl = appUrl + '/lua';
var cgiUrl = urlBase + "/command.cgi?op=131&ADDR=0&LEN=3&DATA=";


/**
 * FlashAirに対してHTTP通信 GETをする
 * @param param
 */
function flashair_get(param) {
    var request = new XMLHttpRequest();
    request.open("GET", param, false);
    request.send(null);
    //通信結果
    //console.log(request.responseText);
}

/**
 * 共有メモリを初期化
 */
function memory_init() {
    var url = cgiUrl + 0;
    flashair_get(url);
}


/**
 * 共有メモリに書き込み
 * @param argByte
 */
function write_memory(argByte) {
    var url = cgiUrl + argByte;
    flashair_get(url);
}

/**TODO Lua 未使用*/
function runLua(argNum) {
    var url = luaUrl + "/hello" + argNum + ".lua";
    $.ajax({
        url: url,
        type: "GET",
        data: 'test',
        success: function (data, textStatus, jqXHR) {
            console.log("success");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("err");
        }
    });
}

$(document).ready( () => {

    write_memory(0);

    $('#iconStop').hide();
    $('#neonDisp').hide();

    var neonTimer;
    var isPlay = false;
    $('#syncStartBtn').click(function () {
        if (isPlay) {
            //音楽停止
            //ゼロを書き込み
            write_memory(0);
            document.getElementById('demoBgm').pause();
            $('#syncTxt').text('同期 開始');
            isPlay = false;
            clearInterval(neonTimer);
            window.location.href = "neon_v2.html";
        } else {
            //音源を開始
            $('#neonDisp').show();
            $('#syncTxt').text('同期 Stop');
            $('#iconStart').hide();
            $('#iconStop').show();
            isPlay = true;

            //TODO ちょっとずらして音を鳴らす
            var neonDelay = setTimeout(function(){
                document.getElementById('demoBgm').play();
                clearTimeout(neonDelay);
            }, 550);

            //タイマー制御
            var i = 0;
            neonTimer = setInterval(function () {
                i++;

                //楽譜に合わせてメモリを書き込み
                switch (i){
                    case 1:
                        write_memory(1);
                        //console.log('1個目 = 1を書き込み');
                        //console.log((i -0.1) + 'sec');
                        //runLua(1);
                        break;
                    case 2:
                        write_memory(2);
                        //console.log('2個目 = 2を書き込み');
                        //console.log((i -0.1) + 'sec');
                        //runLua(2);
                        break;
                    case 3:
                        write_memory(3);
                        //console.log('3個目 = 3を書き込み');
                        //console.log((i -0.1) + 'sec');
                        //runLua(3);
                        break;
                    case 4:
                        write_memory(4);
                        //console.log('4個目 = 4を書き込み');
                        //console.log((i -0.1) + 'sec');
                        //runLua(4);
                        break;
                    case 5:
                        write_memory(5);
                        //console.log('5個目 = 5を書き込み');
                        //console.log((i -0.1) + 'sec');
                        //runLua(5);
                        break;
                    case 9:
                        write_memory(6);
                        //console.log('6個目 = 6を書き込み');
                        //console.log((i -0.1) + 'sec');
                        //runLua(6);
                        break;
                    case 15:
                        write_memory(7);
                        //console.log('7秒目 = 7を書き込み');
                        //console.log((i -0.1) + 'sec');
                        //runLua(7);
                        break;
                    case 20:
                        write_memory(8);
                        //console.log('20秒目 = 8を書き込み');
                        //console.log((i -0.1) + 'sec');
                        //runLua(8);
                        break;
                    case 45:
                        write_memory(0);
                        //console.log('45秒目 = 0を書き込み');
                        //console.log((i -0.1) + 'sec');
                        alert("曲が終了しました。");
                        //runLua(0);
                        break;
                    default :
                        break;
                }
            }, 900);
        }
    });
});