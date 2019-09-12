const dbAPI = "https://epicsevendb-apiserver.herokuapp.com/api/";
const dbURL = "https://epicsevendb.com/";
const assetsURL = "https://assets.epicsevendb.com/";
const randomURL = "https://www.random.org/";

var assetCache

$('.banner-item').click(function(){
    var test = $(this).attr("class");
});


//highlighting selected tab
$('.tablink').click(function(){
    $(".tablink").removeClass("highlight");
    $(".summon-results").removeClass("menu-active").addClass("menu-hide");
    
    $(this).addClass("highlight");  
    
    var current =  $(this).attr("data-menu");
    $('#'+current).removeClass("menu-hide").addClass("menu-active");
});