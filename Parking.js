var spot_array = new Array(40); var sectionnumber;
var priceperhour; var starthour; var startmin; var finishhour; var finishmin; var dayofweek; var thedayofweek;  var fulldate;
var timefrom; var timeto; var hourdif; var mindif; var min_short; var section; var subtotal; var total;
var fname; var mname; var lname; var streetad; var aptsuite; var citytown; var country; var number; var email;
var cardtype; var cardholder; var cardnumber; var expiration; var cvv;
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
    sectionnumber = spotvalue;
    window.localStorage.setItem('sectionnumber',sectionnumber);

    document.getElementById("totalprice").style.display = "block";

    var days = ["Sunday","Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday"];

   subtotal = (priceselected*hourdif) + (priceselected*mindif);

   if (mindif.substring(2,4)== '00') {
       min_short = 0;
   }
   else min_short = mindif.substring(2, 4);

    thedayofweek = days[dayofweek];
    document.getElementById("totalprice").innerHTML = "Your reservation subtotal is $" + subtotal
    + "\n on " + thedayofweek + " "+ fulldate + "\n for " + hourdif + " hours and " + min_short + " minutes.";

    document.getElementById("button").innerHTML = "Reserve";
    document.getElementById("button").onclick = Reserve;

    window.localStorage.setItem('hourdif',hourdif);
    window.localStorage.setItem('minutes',min_short);
    window.localStorage.setItem('date',thedayofweek+ " "+ fulldate);

    PaymentInfo(subtotal);


}

function Reserve(){
    window.localStorage.setItem('subtotal',subtotal);
    window.location.assign("ParkingPayment.html");

}

function userForm() {

    var month = [ "January", "February", "March", "April","May","June","July","August", "September", "October", "November","December"];
    var datefrom = document.getElementById("datefrom").value;

        if (datefrom=="") {
        alert("Date must be filled out");
    }

    else {

            var dateObj = new Date(datefrom);
    dayofweek = dateObj.getUTCDay();

    fulldate = month[dateObj.getUTCMonth()] + " " + dateObj.getUTCDate() + ", " + dateObj.getUTCFullYear();

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

}

function ShowPrice() {
    for (let i=1;i<=10; i++){
        section = "VIP";
        document.getElementById(`spot_${i}`).innerHTML += '<br>'+section +'<br>'+ "$"+'<span id="price_'+i+'">'+ (priceperhour * 2)+'</span>';
    }

    for (let i=11;i<=20; i++){
        section = "Plus";
        document.getElementById(`spot_${i}`).innerHTML += '<br>'+ section +'<br>'+' $<span id="price_'+i+'">'+ (priceperhour * 1.5)+'</span>';


    }

    for (let i=21;i<=40; i++){
        section = "Simple";
        document.getElementById(`spot_${i}`).innerHTML += '<br>'+ section +'<br>'+' $<span id="price_'+i+'">'+ (priceperhour * 1)+'</span>';

    }
    window.localStorage.setItem('section', section);
}
function Duration() {
    timefrom =  document.getElementById("timefrom").value;
    timeto =  document.getElementById("timeto").value;
    window.localStorage.setItem('timefrom', timefrom);
    window.localStorage.setItem('timeto', timeto);


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
    var subtotal = localStorage.getItem('subtotal');
    total = parseInt(subtotal) + 1.5;
    window.localStorage.setItem('total',total);

    document.getElementById("subtotal").innerHTML = "$"+subtotal;
    document.getElementById("total").innerText= "$"+(total);

}

function Payment(){
    document.getElementById("message").innerHTML = "Enter your credit/debit card information:";

    fname = document.getElementById("fname").value;
    mname = document.getElementById("mname").value;
    lname  = document.getElementById("lname").value;
    streetad = document.getElementById("streetad").value;
    aptsuite = document.getElementById("aptsuite").value;
    citytown = document.getElementById("citytown").value;
    country = document.getElementById("country").value;
    number = document.getElementById("phonenumber").value;
    email = document.getElementById("email").value;

    window.localStorage.setItem('name',fname);
    window.localStorage.setItem('midname',mname);
    window.localStorage.setItem('lastname', lname);
    window.localStorage.setItem('street',streetad);
    window.localStorage.setItem('apt',aptsuite);
    window.localStorage.setItem('city', citytown);
    window.localStorage.setItem('country', country);
    window.localStorage.setItem('phone',number);
    window.localStorage.setItem('email',email);

    document.getElementById("personalinfo").style.display = "none";
    document.getElementById("creditcard").style.display = "block";
 //   document.getElementById("backbutton").style.display = "block";

    document.getElementById("button").innerHTML = "Reserve";
    document.getElementById("button").onclick = Reservation;

}

function Reservation(){

    cardtype = document.getElementById("cardtype").value;
    cardholder = document.getElementById("fullname").value;
    cardnumber = document.getElementById("cardnumber").value;
    expiration = document.getElementById("expiration").value;
    cvv = document.getElementById("cvv").value;

    window.localStorage.setItem('cardtype',cardtype);
    window.localStorage.setItem('cardholder',cardholder);
    window.localStorage.setItem('cardnumber', cardnumber);
    window.localStorage.setItem('expiration',expiration);
    window.localStorage.setItem('cvv',cvv);

    window.location.assign("Confirmation.html");

}

function Overview(){

    document.getElementById("name").innerHTML = localStorage.getItem('name');
    document.getElementById("midname").innerHTML = localStorage.getItem('midname');
    document.getElementById("lastname").innerHTML = localStorage.getItem('lastname');
    document.getElementById("street").innerHTML = localStorage.getItem('street');
    document.getElementById("apt").innerHTML = localStorage.getItem('apt');
    document.getElementById("city").innerHTML = localStorage.getItem('city');
    document.getElementById("country").innerHTML = localStorage.getItem('country');
    document.getElementById("phone").innerHTML = localStorage.getItem('phone');
    document.getElementById("email").innerHTML = localStorage.getItem('email');

    document.getElementById("cardtype").innerHTML = localStorage.getItem('cardtype');
    document.getElementById("cardnumber").innerHTML = localStorage.getItem('cardnumber');
    document.getElementById("expiration").innerHTML = localStorage.getItem('expiration');

    document.getElementById("amount").innerHTML = "$"+localStorage.getItem('total');
    document.getElementById("date").innerHTML = localStorage.getItem('date');
    document.getElementById("time").innerHTML = localStorage.getItem('timefrom') + "-"+ localStorage.getItem('timeto');
    document.getElementById("duration").innerHTML = localStorage.getItem('hourdif')+ " hour(s) and ";
    document.getElementById("duration").innerHTML += localStorage.getItem('minutes')+ " minute(s)";
    document.getElementById("section").innerHTML = localStorage.getItem('section') + " #" + localStorage.getItem('sectionnumber');



}

function Confirmation() {
    document.getElementById("Overview").style.display = "none";
    document.getElementById("order").style.display = "block";
    document.getElementById("order").innerHTML += Math.floor((Math.random() * 8999999) + 8000000);
    document.getElementById("message").innerHTML = "Thanks for your order. Your confirmation will be sent to: " + localStorage.getItem('email');
    document.getElementById("confirm").style.display = "none";
    window.localStorage.clear();
}