function color(x,y,color) {
	if (!(gridcolors[x] == null)) {
		if (!(gridcolors[x][y] == null)) {
			if (!(color == null)) {
				gridcolors[x][y] = color;
			} else {
				gridcolors[x][y] = (gridcolors[x][y] + 1) % 5;
				color = gridcolors[x][y];
			}
			document.getElementsByClassName(x + "," + y)[0].style.backgroundColor = gridcolorchoices[color];
			for (j = 0; j < empires.length; j++) {
				if (empires[j][x]) {
					if (empires[j][x][y]) {
						empires[j][x][y] = null;
					}
				}
			}
			if ((empires[color][x] == null)) {
				empires[color][x] = []
			}
			empires[color][x][y] = true
		} else {
			if (!(color == null)) {
				gridcolors[x][y] = color;
			} else {
				if (gridcolors[x][y] == null) {
					gridcolors[x][y] = 0
				}
				gridcolors[x][y] = (gridcolors[x][y] + 1) % 5;
				color = gridcolors[x][y];
			}
			document.getElementsByClassName(x + "," + y)[0].style.backgroundColor = gridcolorchoices[color];
			for (j = 0; j < empires.length; j++) {
				if (empires[j][x]) {
					if (empires[j][x][y]) {
						empires[j][x][y] = null;
					}
				}
			}
			if ((empires[color][x] == null)) {
				empires[color][x] = []
			}
			empires[color][x][y] = true
		}
	} else {
		gridcolors[x] = [];
		if (!(color == null)) {
			gridcolors[x][y] = color;
		} else {
			gridcolors[x][y] = 1;
			color = 1;
		}
		document.getElementsByClassName(x + "," + y)[0].style.backgroundColor = gridcolorchoices[color];
		for (j = 0; j < empires.length; j++) {
			if (empires[j][x]) {
				if (empires[j][x][y]) {
					empires[j][x][y] = null;
				}
			}
		}
		if ((empires[color][x] == null)) {
			empires[color][x] = []
		}
		empires[color][x][y] = true
	}
}
var map = document.getElementById("map");
var map2 = document.getElementById("map2");
var mapwidth = map.clientWidth;
var mapheight = map.clientHeight;
var gridwidth = 0;
var gridheight = 0;
var gridcolors = [];
var gridcolorchoices = ["#FFF","#000","#00F","#0F0","#F00"];
var empires = [[],[],[],[],[]];
map2.style.left = "calc(50% - 700px)";
map2.style.top = "calc(50% - 225px)";
for (i = 0; i < 252; i++) {
	document.getElementById("blocks").innerHTML = document.getElementById("blocks").innerHTML + '<button class="block ' + ((i % 28) * 50) + ',' + (Math.floor(i / 28) * 50) +'" id="' + i + '"onclick="color(' + + ((i % 28) * 50) + ',' + (Math.floor(i / 28) * 50) + ');" tabindex="-1"></button>'
	if (i == 0) {
		color((i % 28) * 50,Math.floor(i / 28) * 50,1)
	}
	if (i == 27) {
		color((i % 28) * 50,Math.floor(i / 28) * 50,2)
	}
	if (i == 224) {
		color((i % 28) * 50,Math.floor(i / 28) * 50,3)
	}
	if (i == 251) {
		color((i % 28) * 50,Math.floor(i / 28) * 50,4)
	}
	document.getElementById(i).style.left = (i % 28) * 50;
	document.getElementById(i).style.top = Math.floor(i / 28) * 50;
}
var test = setInterval(update,16);