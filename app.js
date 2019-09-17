const dbAPI = "https://epicsevendb-apiserver.herokuapp.com/api/";
const dbURL = "https://epicsevendb.com/";
const assetsURL = "https://assets.epicsevendb.com/";
const randomURL = "https://www.random.org/";

var cardList = [];
var unitsAcquired = 0;

var unitCache = {
    hero: {loaded: false},
    artifact: {loaded: false},
}

function cacheUnits(type){
    $.get(dbAPI + type, function(data, status){
        //alert(status);
        if(status == "success"){
            var units = data.results;
            $.each(units, function(i){
                unitCache[type][units[i].fileId] = units[i];
            });
            unitCache[type].loaded = true;
        }
    });
}

function loadUnits(){
    cacheUnits("hero");
    cacheUnits("artifact");
}

loadUnits();

function summonUnit(type, fileId, idx){
    var unit = unitCache[type][fileId];
    var $card = cardList[idx - 1];
    var unitImage = assetsURL + type + "/" + fileId + "/small" + getImgExtension(type);

}

function getImgExtension(type){
    if(type == "hero") return ".png";
    return ".jpg";
}

var $summon_grid = $(".summon-grid").isotope({
    itemSelector: ".summon-card"
});

$("#summon").click(function(){
    var type = Math.random()<0.5 ? "hero" : "artifact";
    var randUnit = Object.keys(unitCache[type]);
    var fileId =  unitCache[type][randUnit[randUnit.length * Math.random()<<0]].fileId;
    unitsAcquired++;
    summonUnit(type, fileId, unitsAcquired);
});

$(".banner-item").click(function(){
    var test = $(this).attr("class");
});

//highlighting selected tab
$(".tablink").click(function(){
    $(".tablink").removeClass("highlight");
    $(".menu-active").removeClass("menu-active").addClass("menu-hide");
    
    $(this).addClass("highlight");
    if($(this).hasClass("banner-item")){
        $("#summon").removeClass("menu-hide").addClass("menu-active");
    }
    else{
        $("#about").removeClass("menu-hide").addClass("menu-active");
    }
       
    /*var current =  $(this).attr("data-menu");
    $('#'+current).removeClass("menu-hide").addClass("menu-active");*/
});