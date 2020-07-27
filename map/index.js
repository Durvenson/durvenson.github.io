function coords() {
	var wantedcoords = prompt("Coords? (seperate with comma)","0,0");
	wantedcoords = wantedcoords.split(",")
	map.scrollTop = (parseInt(wantedcoords[1].replace(" ","")) + 7000)/10;
	map.scrollLeft = (parseInt(wantedcoords[0].replace(" ","")) + 7000)/10;
}
function geo() {
	map2.style.display = "none";
	map3.style.display = "initial";
}
function pol() {
	map3.style.display = "none";
	map2.style.display = "initial";
}
function update() {
	document.getElementById("coords").innerHTML = (Math.round(map.scrollLeft*10 - 7000)) + ',' + (Math.round(map.scrollTop*10 - 7000));
	document.getElementById("coords2").innerHTML = (Math.round(map.scrollLeft)) + ',' + (Math.round(map.scrollTop));
}
var wantedcoords = [];
var map = document.getElementById("map");
var map2 = document.getElementById("mapbg");
var map3 = document.getElementById("mapbg2");
var mapwidth = map.clientWidth;
var mapheight = map.clientHeight;
map2.style.paddingLeft = mapwidth/2;
map2.style.paddingRight = mapwidth/2;
map2.style.paddingTop = mapheight/2;
map2.style.paddingBottom = mapheight/2;
map3.style.paddingLeft = mapwidth/2;
map3.style.paddingRight = mapwidth/2;
map3.style.paddingTop = mapheight/2;
map3.style.paddingBottom = mapheight/2;
map.scrollTop = 700;
map.scrollLeft = 700;
pol();
var test = setInterval(update,16);