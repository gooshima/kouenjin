// forked from Hiroshi.Ueda's "DEMO2015-06-14 6th" http://jsdo.it/Hiroshi.Ueda/cOHc
// forked from Hiroshi.Ueda's "2015-06-13 2nd" http://jsdo.it/Hiroshi.Ueda/jKu4
var fsr_data =0;

$("#sound-file1").get(0).load();//ロード 
$("#sound-file2").get(0).load();//ロード 
$("#sound-file3").get(0).load();//ロード  

k.ready(function(){
    $("#debugTxt").text("ready！");
    k.analogReadRequest(k.AIO0);   
});

k.updateAnalogValueAio0(function(data){
    $("#debugTxt").text(data+"mV");
    k.analogReadRequest(k.AIO0);
    
    fsr_data = parseInt(data);//string to int
    
    if(fsr_data> 1000)
    {
        if(flag_sound_on == 1)
        {
            if(time_sitting >= 5)
            {
               $("#sound-file3").get(0).currentTime = 0;//巻き戻し                   
               $("#sound-file3").get(0).play();//再生             
            }
                
            else
            {
                $("#sound-file2").get(0).currentTime = 0;//巻き戻し                   
                $("#sound-file2").get(0).play();//再生
            }
            
            flag_sound_on =0;
        }
    }
    
    //paypal決済
    if(flag_paypal ==1)
    {
        flag_paypal = 0;
        $("#sound-file1").get(0).currentTime = 0;//巻き戻し     
        $("#sound-file1").get(0).play();//再生      
        paypal_func(time_sitting_total);//Paypal決済へ  
    }
});


//タイマー
var time_global = 0;

//座った時間
var time_sitting = 0;

//座った時間累計
var time_sitting_total = 0;

//現在の状態 0:立っている 1:座っている
var state_sitting = 0;

//paypalへ決済させるフラグ
var flag_paypal = 0;

//タイマー
setInterval(test_timer, 1000);

//なぜかタイマーの中で音が鳴らせないため、このような対応としている
var flag_sound_on = 0;
function test_timer()
{
    time_global++;
    
    //if(time_global%2 == 1) //2secに１回だけサウンドフラグをON
        flag_sound_on =1;      
    
    if(fsr_data> 1000)//座っている時間をカウント
    {
          time_sitting++;
          time_sitting_total++;
        
          state_sitting = 1;//座った
    }
    else
    {
        if(state_sitting == 1) //座った -> 立ったときの変化時
            flag_paypal =1 ;
        
        state_sitting = 0;//立った
        time_sitting = 0;//座った時間をクリア
    }
        
    //$("#log").text("last time: "+ time_sitting +"sec");
    //$("#log2").text("total time:"+ time_sitting_total +"sec");
    $("#kouenTimeTxt").text("00:00:"+ time_sitting);//TODO change to timer
    $("#kouenYenTxt").text("¥"+ time_sitting_total);
}



//----------------------------------------------------------------------------
//フェールセーフ込み k.find
//----------------------------------------------------------------------------
//ピリオド付の名前になる場合があることと、名前指定で失敗するときもあるため
var MyKonashiName1 = "konashi20-f012e";
var MyKonashiName2 = "konashi2.0-f012e";

var flag_next_find = 1;
k.findWithName(MyKonashiName1);

k.peripheralNotFound(k_find);
function k_find()
{
    if(flag_next_find==1)
    {
            $("#debugTxt").text("Not found. Try change name...");
            k.findWithName(MyKonashiName2);
            flag_next_find = 0;//名前を変えてもダメな場合は k.find()にする
    }
    else
    {
        $("#debugTxt").text("Not found. Please select name...");
        k.find();
    }
    $('#ready').hide();
    $('#run').show();
}
//----------------------------------------------------------------------------



//おおしまさん関数
var finalPoint = 1;
function paypal_func(time)
{
    $('#ready').hide();
    $('#run').hide();
    $('#conf').show();
    $('#kouenTotalYenTxt').text("¥" + time);
    finalPoint = time;

    setTimeout(function () {
        window.location.href = 'thanks.html';
    }, 1000);

}

