function update() {
	ground = false;
	playerx = playerx + xvel;
	if (playerx > 1350) {
		playerx = 1350
	}
	if (playerx < 0) {
		playerx = 0
	}
	if (jumping == true) {
		jump = 30;
		jumping = false;
	}
	xvel = xvel * 0.9;
	if (xvel > 0) {
		var thing = Math.ceil(playerx / 50) * 50 + "," + Math.ceil(playery / 50) * 50;
		if (document.getElementsByClassName(thing)[0] != null) {
			playerx = Math.ceil(playerx / 50) * 50 - 51;
			ground = true;
		}
		var thing = Math.ceil(playerx / 50) * 50 + "," + Math.floor(playery / 50) * 50;
		if (document.getElementsByClassName(thing)[0] != null) {
			playerx = Math.ceil(playerx / 50) * 50 - 51;
			ground = true;
		}
	}
	if (xvel < 0) {
		var thing = Math.floor(playerx / 50) * 50 + "," + Math.ceil(playery / 50) * 50;
		if (document.getElementsByClassName(thing)[0] != null) {
			playerx = Math.floor(playerx / 50) * 50 + 51;
			ground = true;
		}
		var thing = Math.floor(playerx / 50) * 50 + "," + Math.floor(playery / 50) * 50;
		if (document.getElementsByClassName(thing)[0] != null) {
			playerx = Math.floor(playerx / 50) * 50 + 51;
			ground = true;
		}
	}
	if (jump > 0) {
		jump = jump - 1;
		playery = playery - (jump*jump/120);
		var thing = Math.floor(playerx / 50) * 50 + "," + Math.floor(playery / 50) * 50;
		if (document.getElementsByClassName(thing)[0] != null) {
			playery = Math.floor(playery / 50) * 50 + 50;
			jump = 0;
		}
		var thing = Math.ceil(playerx / 50) * 50 + "," + Math.floor(playery / 50) * 50;
		if (document.getElementsByClassName(thing)[0] != null) {
			playery = Math.floor(playery / 50) * 50 + 50;
			jump = 0;
		}
	} else {
		playery = playery + 10;
		var thing = Math.floor(playerx / 50) * 50 + "," + Math.ceil(playery / 50) * 50;
		if (document.getElementsByClassName(thing)[0] != null) {
			playery = Math.ceil(playery / 50) * 50 - 50;
			ground = true;
			
		}
		var thing = Math.ceil(playerx / 50) * 50 + "," + Math.ceil(playery / 50) * 50;
		if (document.getElementsByClassName(thing)[0] != null) {
			playery = Math.ceil(playery / 50) * 50 - 50;
			ground = true;
		}
	}
	document.getElementById("blocks").style.left = 700 - playerx + "px";
	document.getElementById("blocks").style.top = 225 - playery + "px";
	document.getElementById("depth").innerHTML = 25 - parseInt(document.getElementById("blocks").style.top.slice(0,document.getElementById("blocks").style.top.length - 2)) + "m";
	if (((Math.ceil(playery / 50) * 50) - (Math.ceil(playery2 / 50) * 50)) > 0) {
		playery2 = playery;
		setTimeout(rendernewblocks,160);
	}
}
function newfunc(i) {
	if (breakable == true) {
		breakable = false;
		var thing = i;
		blockhealths[thing] = blockhealths[thing] - picks[picklevel][0];
		document.getElementById(thing).innerHTML = blockhealths[thing];
		if (blockhealths[thing] < 1) {
			coins = coins + cointable[document.getElementById(thing).className.split(' ')[0]];
			document.getElementById(thing).remove();
			document.getElementById("coins").innerHTML = "You have " + coins + " coins to spend."
		}
		setTimeout(makebreakable,1000)
	}
}
function makebreakable() {
	breakable = true;
}
async function rendernewblocks() {
	var lengthh = blockhealths.length;
	for (j = (lengthh - 504); j < (lengthh - 476); j++) {
		if (document.getElementById(j)) {
			document.getElementById(j).remove();
		}
		blockhealths[j] = null;
	}
	for (j = (lengthh + 0); j < (lengthh + 28); j++) {
		for (k = 0; k < depthtable.length; k++) {
			if (Math.floor(j / 28) >= depthtable[k]) {
				var randomnumber = Math.random();
				for (l = 0; l < Object.keys(raritytable[k]).length; l++) {
					if (randomnumber >= Object.values(raritytable[k])[l]) {
						currentblock = Object.keys(raritytable[k])[l];
					} else {
						break
					}
				}
				break
			}
		}
		document.getElementById("blocks").innerHTML = document.getElementById("blocks").innerHTML + '<button class="' + currentblock + ' block ' + ((j % 28) * 50) + ',' + (Math.floor(j / 28) * 50) +'" id="' + j + '"onclick="newfunc(' + j + ');" tabindex="-1">' + healthtable[currentblock] + '</button>'
		document.getElementById(j).style.left = (j % 28) * 50;
		document.getElementById(j).style.top = Math.floor(j / 28) * 50;
		blockhealths[j] = healthtable[currentblock];
	}
}
function upgrade(item) {
	if (item == "pick") {
		if (coins >= picks[picklevel+1][2]) {
			picklevel = picklevel + 1;
			coins = coins - picks[picklevel][2];
			document.getElementById("pick").innerHTML = picks[picklevel][1] + " (" + picks[picklevel][0] + " block damage, costed " + picks[picklevel][2] + " coins )";
			document.getElementById("pickupgrades").innerHTML = picks[picklevel+1][1] + " (" + picks[picklevel+1][0] + " block damage, costs " + picks[picklevel+1][2] + " coins )";
			document.getElementById("coins").innerHTML = "You have " + coins + " coins to spend.";
		}
	}
}
var coins = 0;
var picklevel = 0;
var picks = [[1,"Bare Hands",0],[1.25,"Dirt Shovel",2.5],[1.5,"Dirt Pickaxe",10],[1.75,"Shovel",33.75],[2.5,"Soft Rock Pickaxe",68.87],[4.5,"Stone Pickaxe",223.14],[8.5,"Pickaxe",796.14]]
var breakable = true;
var depthtable = [16,15,13,10,6,5]
var raritytable = [{"stone": 0},{"dirt": 0, "stone": 0.25},{"dirt": 0, "stone": 0.5},{"dirt": 0, "stone": 0.75},{"dirt": 0},{"grass":0,"dirt":0.9}]
var healthtable = {"dirt": 5, "grass": 3, "stone": 20}
var cointable = {"dirt": 1, "grass": 0, "stone": 3}
var blockhealths = [];
var jumping = false;
var xvel = 1;
var ground = false;
var jump = 0;
var map = document.getElementById("map");
var map2 = document.getElementById("map2");
var mapwidth = map.clientWidth;
var mapheight = map.clientHeight;
var playerx = 700;
var playery = 100;
var playery2 = 100;
var currentblock;
var randomnumber;
map2.style.left = "calc(50% - 700px)";
map2.style.top = "calc(50% - 225px)";
for (i = 140; i < 252; i++) {
	for (k = 0; k < depthtable.length; k++) {
		if (Math.floor(i / 28) >= depthtable[k]) {
			var randomnumber = Math.random();
			for (l = 0; l < Object.keys(raritytable[k]).length; l++) {
				if (randomnumber >= Object.values(raritytable[k])[l]) {
					currentblock = Object.keys(raritytable[k])[l];
				} else {
					break
				}
			}
			break
		}
	}
	document.getElementById("blocks").innerHTML = document.getElementById("blocks").innerHTML + '<button class="' + currentblock + ' block ' + ((i % 28) * 50) + ',' + (Math.floor(i / 28) * 50) +'" id="' + i + '"onclick="newfunc(' + i + ');" tabindex="-1">' + healthtable[currentblock] + '</button>'
	document.getElementById(i).style.left = (i % 28) * 50;
	document.getElementById(i).style.top = Math.floor(i / 28) * 50;
	blockhealths[i] = healthtable[currentblock];
}
document.addEventListener('keydown', function (event) {
	var key = event.key || event.keyCode;
	if ((key == 'ArrowUp' || key == 38) && ground == true) {
		jumping = true;
	}
	if ((key == 'ArrowLeft' || key == 37)) {
		xvel = xvel - 1;
	}
	if ((key == 'ArrowRight' || key == 39)) {
		xvel = xvel + 1;
	}
});
var test = setInterval(update,16);