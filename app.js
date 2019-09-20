const dbAPI = "https://epicsevendb-apiserver.herokuapp.com/api/";
const dbURL = "https://epicsevendb.com/";
const assetsURL = "https://assets.epicsevendb.com/";
const randomURL = "https://www.random.org/";

var cardList = [];
var unitsAccquired = 0;

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

$("#reset").click(function() {
    unitsAccquired = 0;
    cardList = [];
});


function getImgExtension(type){
    if(type == "hero") 
        return ".png";
    return ".jpg";
}

var $summon_grid = $(".summon-grid").isotope({
    itemSelector: ".summon-card"
});

$("#summon").click(function(){
    var unitType = Math.random()<0.5 ? "hero" : "artifact";
    var randUnit = Object.keys(unitCache[unitType]);
    var unitId =  unitCache[unitType][randUnit[randUnit.length * Math.random()<<0]].fileId;
    
    var $banner_select = $(".highlight");
    var banner = $banner_select.attr("data-banner");
    
    var $new_card = $("<div class='summon-card' id='unit-" + unitsAccquired + "'></div>");
    var $card_image = $("<a class='summon-card-image shadow'></div></a>");
    var $color_divs = $("<div class='color-div unit-overlay'></div><div class='color-div unit-bg shadow'>");
    var $loading = $("<img class='load-icon'>").attr("src","assets/loading.svg");
    
    $card_image.append($color_divs);
    $card_image.append($loading);
    $new_card.append($card_image);
    $new_card.attr("data-banner", banner);
    $summon_grid.prepend($new_card);
    cardList[unitsAccquired] = $new_card;
    unitsAccquired++;

    summonUnit(unitType, unitId, unitsAccquired);
    filterGrid();

    if(!$(".grid-placeholder").hasClass("grid-placeholder-hide")) {
        $(".grid-placeholder").hasClass("grid-placeholder-hide");
        //$summon_grid.isotope("hideItemElements,", $(".grid-placeholder")).isotope("layout");
    }

});

function summonUnit(type, fileId, idx){
    var unit = unitCache[type][fileId];
    var $card = cardList[idx - 1];
    var imageUnit = assetsURL + type + "/" + fileId + "/small" + getImgExtension(type);
    var imageError = assetsURL + type + "/_placeholder/small_missing" + getImgExtension(type);
    var image = $("<img>")
    .on("error", function() {
        $(this).attr("src", imageError);
    })
    .on("load", function(){
        var $name_div = $("<div class='name-div'></div>");
        if((type == "hero") || (type == "artifact" && unit.rarity > 3)) {
            var classURL = assetsURL + "class/cm_icon_role_" + (type == "hero" ? unit.classType : unit.exclusive[0]) + ".png";
            var $class_img = $("<img class='class-icon' src='" + classURL + "'>");
            $name_div.append($class_img);
        }

        var $unit_name = $("<div class='unit-name'>" + unit.name + "</div>");
        $name_div.append($unit_name);
        $card.append($name_div);

        var $attribute_div = $("<div class='attribute-div'></div>");
        if(type == "hero") {
            var elementURL = assetsURL + "attribute/cm_icon_pro" + ((unit.element == "dark" || unit.element == "light") ? "m" : "") + unit.element + ".png";
            var $element_img = $("<img class='element-icon' src='" + elementURL +"'>");
            $attribute_div.append($element_img);
        }
        var $star = $("<div class='star-" + unit.rarity + "'></div>");
        $attribute_div.append($star);
        $card.append($attribute_div);
        
        $card.find(".summon-card-image").attr("href", dbURL + type + "/" + fileId).attr("target", "_blank"); console.log(unit.name);
        $card.find(".unit-overlay").addClass("unit-loaded");
        $card.find(".load-icon").addClass("load-icon-hide");
    })
    .attr("src", imageUnit)
    .addClass("unit-img");
    $card.find(".summon-card-image").addClass("rarity-" + unit.rarity).append(image).attr("data-type", type).attr("data-unit", fileId);

}

$(".banner-item").click(function(){
    var test = $(this).attr("class");
});

function filterGrid() {
    var $banner_select = $(".highlight");
    $summon_grid.isotope({
        filter: function() {
            if($(this).hasClass("grid-placeholder"))
                return(!$(this).hasClass("grid-placeholder-hide"));
            return($(this).attr("data-banner") == $banner_select.attr("data-banner"));
        }
    });
}

var loadCheck = setInterval(function() {
    if(unitCache.hero.loaded && unitCache.artifact.loaded) {
        $("#summon").text("Summon")
        .find(".summon-load-icon").addClass("load-icon-hide");
        console.log("Unit Info Cached");
        clearInterval(loadCheck);
    }
}, 100);

//highlighting selected tab
$(".tablink").click(function(){
    $(".tablink").removeClass("highlight");
    $(".menu-active").removeClass("menu-active").addClass("menu-hide");
    
    $(this).addClass("highlight");
    if($(this).hasClass("banner-item")){
        $(".output-panel").removeClass("menu-hide").addClass("menu-active");
    }
    else{
        $("#about").removeClass("menu-hide").addClass("menu-active");
    }
       
    /*var current =  $(this).attr("data-menu");
    $('#'+current).removeClass("menu-hide").addClass("menu-active");*/
});