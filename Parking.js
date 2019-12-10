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
var totalsum;

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

   totalsum = (priceselected*hourdif) + (priceselected*mindif);

   if (mindif.substring(2,4)== '00') {
       var min_short = 0;
   }
   else  var min_short = mindif.substring(2, 4);

    document.getElementById("totalprice").innerHTML = "Your reservation subtotal is $" + totalsum
    + "\n on " + days[dayofweek] + " "+ datefrom + "\n for " + hourdif + " hours and " + min_short + " minutes.";

    document.getElementById("button").innerHTML = "Reserve";
    document.getElementById("button").onclick = Reserve;

    PaymentInfo(totalsum);
}

function Reserve(){
    window.localStorage.setItem('totalsum',totalsum);
    window.location.assign("ParkingPayment.html");

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

    document.getElementById("message").innerHTML = "Choose your duration";
    document.getElementById("message").style.display = "block";
    document.getElementById("timefrom").style.display = "block";
    document.getElementById("timeto").style.display = "block";

    document.getElementById("button").onclick = Duration;


}

function ShowPrice() {
    for (let i=1;i<=10; i++){
        section = "VIP";
        document.getElementById(`spot_${i}`).innerHTML += "\n"+section + "\n$"+'<p id="price_'+i+'">'+ (priceperhour * 2)+'</p>';
    }

    for (let i=11;i<=20; i++){
        section = "Plus";
        document.getElementById(`spot_${i}`).innerHTML += section +' $<p id="price_'+i+'">'+ (priceperhour * 1.5)+'</p>';


    }

    for (let i=21;i<=40; i++){
        section = "Simple";
        document.getElementById(`spot_${i}`).innerHTML += section +' $<p id="price_'+i+'">'+ (priceperhour * 1)+'</p>';

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
       alert("Please choose a different set of hours");
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

function PaymentInfo(){
    var subtotal = localStorage.getItem('totalsum');
    var total = parseInt(subtotal) + 1.5;
    document.getElementById("subtotal").innerHTML = "$"+subtotal;
    document.getElementById("total").innerText= "$"+(total);

   /* document.getElementById("personalinfo").style.display = "block";
    document.getElementById("paymentinfo").style.display = "none";
    document.getElementById("paymentbutton").innerHTML = "Continue";
    document.getElementById("backbutton").style.display = "none";
    document.getElementById("paymentbutton").onclick = Payment();*/


    window.localStorage.setItem('name',document.getElementById("fname").value);
    window.localStorage.setItem('midname',document.getElementById("mname").value);
    window.localStorage.setItem('street',document.getElementById("streetad").value);
    window.localStorage.setItem('apt',document.getElementById("aptsuite").value);
    window.localStorage.setItem('city',document.getElementById("citytown").value);
    window.localStorage.setItem('country',document.getElementById("country").value);
    window.localStorage.setItem('phone',document.getElementById("number").value);


}


function Payment(){
    document.getElementById("personalinfo").style.display = "none";
    document.getElementById("creditcard").style.display = "block";
    document.getElementById("backbutton").style.display = "block";

    document.getElementById("paymentbutton").innerHTML = "Reserve";
    document.getElementById("paymentbutton").onclick = Reservation;

    window.localStorage.setItem('cardtype',document.getElementById("cardtype").value);
    window.localStorage.setItem('cardholder',document.getElementById("fullname").value);
    window.localStorage.setItem('cardnumber',document.getElementById("cardnumber").value);
    window.localStorage.setItem('expiration',document.getElementById("expiration").value);
    window.localStorage.setItem('cvv',document.getElementById("cvv").value);


}

function Reservation(){

    window.location.assign("Confirmation.html");

}