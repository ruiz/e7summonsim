function summonGach(){
    console.log("test");
}

function getSummonInfo(evt, summonType){
    var i, x, tablinks;
    x = document.getElementsByClassName("summon");
    for(i=0; i<x.length; i++){
        x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for(i=0; i<x.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" w3-red","");
    }
    document.getElementById(summonType).style.display = "block";
    evt.currentTarget.className += " w3-red";
}