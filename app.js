function summonGach(){
    console.log("test");
}

function openCity(evt, cityName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("city");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" w3-red", ""); 
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " w3-red";
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
    document.getElementById(summonType).style.display = "table";
    evt.currentTarget.className += " w3-red";
}