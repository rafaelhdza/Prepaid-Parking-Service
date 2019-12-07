var spot_array = new Array(40);
var priceperhour;
function layout(){
    var n = 0;
    for (let i=0; i<40; i++){
        spot_array[i] = n+1;
        document.getElementById('layout').innerHTML += '<div onClick="spotpressed(this,'+spot_array[i]+')" id="spot_'+spot_array[i]+'">'+spot_array[i]+'</div>';
        n+=1;
    }
}
function spotpressed(currentspot,spotvalue) {

}

function userForm() {
    var datefrom = document.getElementById("datefrom").value;
    if (datefrom=="") {
        alert("Date must be filled out");
    }
    else  {document.getElementById("try").innerHTML = datefrom;
    }

    var dateObj = new Date(datefrom);
    var dayofweek = dateObj.getUTCDay();

    if (dayofweek==5 || dayofweek==6 || dayofweek==7){
        priceperhour = 7;
    }
    else if (dayofweek==1 || dayofweek==2 || dayofweek==4){
        priceperhour = 5;

    }
    else if (dayofweek==3){
        priceperhour =3;
    }
    //0=sunday, 1=Monday, 2=Tuesday, 3=Wednesday, 4=Thurday, 5=Friday, 6=Saturday

    document.getElementById("try2").innerHTML = dayofweek;
    document.getElementById("price").innerHTML = priceperhour;

    ShowPrice()
    document.getElementById("labeltime").style.display = "block";
    document.getElementById("timefrom").style.display = "block";
    document.getElementById("timeto").style.display = "block";

}

function ShowPrice() {
    for (let i=1;i<=10; i++){
        document.getElementById(`spot_${i}`).innerHTML += '<p id="price">'+'$' + (priceperhour * 2)+'</p>';
    }

    for (let i=11;i<=20; i++){
        document.getElementById(`spot_${i}`).innerHTML += '<p id="price">'+'$' + (priceperhour * 1.5)+'</p>';
    }

    for (let i=21;i<=40; i++){
        document.getElementById(`spot_${i}`).innerHTML += '<p id="price">'+'$' + (priceperhour * 1)+'</p>';
    }
}
function Hours(priceperhour) {

}