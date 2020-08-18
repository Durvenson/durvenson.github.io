var isPlaying = false;
var audio = document.getElementById("audio");
var img = document.getElementById("img");
audio.loop = true;
function noExist() {
	window.alert("lol this doesn't exist yet")
}
function select(thing) {
	img.src = thing + ".png";
}