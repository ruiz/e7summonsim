const dbAPI = "https://epicsevendb-apiserver.herokuapp.com/api/";
const dbURL = "https://epicsevendb.com/";
const assetsURL = "https://assets.epicsevendb.com/";
const randomURL = "https://www.random.org/";

var assetCache

var $summon_grid = $(".summon-grid").isotope({

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