var spot_array = new Array(40);
var priceperhour;
var starthour;
var startmin;
var finishhour;
var finishmin;
var datefrom;
var dayofweek;
var hourdif;
var mindif;
var section;
function layout(){
    document.getElementById("layout").style.display = "block";

    var n = 0;
    for (let i=0; i<40; i++){
        spot_array[i] = n+1;
        n+=1;
        document.getElementById('layout').innerHTML += '<div onClick="spotpressed(this,'+n+')" id="spot_'+spot_array[i]+'">'+spot_array[i]+'</div>';

    }

}

function spotpressed(currentspot,spotvalue) {
    var priceselected = document.getElementById(`price_${spotvalue}`).innerHTML;

    document.getElementById("totalprice").style.display = "block";

    var days = ["Sunday","Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday"];

   var totalsum = (priceselected*hourdif) + (priceselected*mindif);

    document.getElementById("totalprice").innerHTML = "Your reservation subtotal is $" + totalsum
    + "\n on " + days[dayofweek] + " "+ datefrom + "\n for " + hourdif + " hours and " + mindif + "minutes.";

    document.getElementById("button").innerHTML = "Reserve";
    document.getElementById("button").onclick = Reserve;
    PaymentInfo(totalsum)
}

function Reserve(){
    window.location.replace("ParkingPayment.html");
}

function userForm() {
    datefrom = document.getElementById("datefrom").value;
    if (datefrom=="") {
        alert("Date must be filled out");
    }


    var dateObj = new Date(datefrom);
    dayofweek = dateObj.getUTCDay();

    if (dayofweek==5 || dayofweek==6 || dayofweek==7){
        priceperhour = 7;
    }
    else if (dayofweek==1 || dayofweek==2 || dayofweek==4){
        priceperhour = 3;

    }
    else if (dayofweek==3){
        priceperhour =2;
    }
    //0=sunday, 1=Monday, 2=Tuesday, 3=Wednesday, 4=Thurday, 5=Friday, 6=Saturday


    document.getElementById("labeltime").style.display = "block";
    document.getElementById("timefrom").style.display = "block";
    document.getElementById("timeto").style.display = "block";

    document.getElementById("button").onclick = Duration;


}

function ShowPrice() {
    for (let i=1;i<=10; i++){
        document.getElementById(`spot_${i}`).innerHTML += '$<p id="price_'+i+'">'+ (priceperhour * 2)+'</p>';
        section = "VIP";
    }

    for (let i=11;i<=20; i++){
        document.getElementById(`spot_${i}`).innerHTML += '$<p id="price_'+i+'">'+ (priceperhour * 1.5)+'</p>';
        section = "Plus";

    }

    for (let i=21;i<=40; i++){
        document.getElementById(`spot_${i}`).innerHTML += '$<p id="price_'+i+'">'+ (priceperhour * 1)+'</p>';
        section = "Simple";

    }

}
function Duration() {
   var timefrom =  document.getElementById("timefrom").value;
   var timeto =  document.getElementById("timeto").value;

   starthour = timefrom.substring(0,2);
   startmin = timefrom.substring(3,5);

   finishhour = timeto.substring(0,2);
   finishmin = timeto.substring(3,5);

    hourdif = finishhour- starthour ;
    mindif = Math.abs(finishmin-startmin)/60;
    mindif = mindif.toFixed(2);
    if (starthour>= finishhour || finishhour<=starthour){
       alert("Please choose a different set of hours")
   }
    else if (starthour>=8 && starthour<12){
        priceperhour = priceperhour +0.5;
    }
    else if (starthour>=12 && starthour<5){
        priceperhour = priceperhour +1;
    }

    document.getElementById("message").innerHTML = "Choose a parking spot";
    layout()
    ShowPrice()
    spotpressed()
}
//--------------------------------------------------------------------------------

function PaymentInfo(totalsum){
    document.getElementById("subtotal").innerHTML = "$"+totalsum;
    document.getElementById("total").innerText= "$"+(totalsum+1.5);
}