var spot_array = new Array(25);

function layout(){
    var n = 0;
    for (var i=0; i<25; i++){
        spot_array[i] = n+1;
        document.getElementById('layout').innerHTML += '<div id="spot_'+spot_array[i]+'">'+spot_array[i]+'</div>';
        n+=1;
    }
}

function userForm() {
    var fname = document.getElementById("myDate").innerHTML;

}

