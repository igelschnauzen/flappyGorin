var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var gorin = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

//sounds
var scoreSound = new Audio();
var deathSound = new Audio();

deathSound.src = "sound/death.ogg";

//select lvl
var level = prompt('lvl? (1/2)', '');

//select textures and score sound in relation to lvl
if(level == '1') {
	gorin.src = "textures/img/gorin.player.png";
	bg.src = "textures/img/bg.png";
	pipeUp.src = "textures/img/vilka.topenemy.png";
	pipeBottom.src = "textures/img/taburetka.bottomenemy.png";

	scoreSound.src = "sound/a.mp3";
} else if(level == '2') {
	gorin.src = "textures/img2/gorin.player.png";
	bg.src = "textures/img2/bg2.jpg";
	pipeUp.src = "textures/img2/lopata.topenemy.png";
	pipeBottom.src = "textures/img2/dver.bottomenemy.png";

	scoreSound.src = "sound/a.mp3";
} else if(level == '666') {
	gorin.src = "textures/sl/poroshenko.player.png";
	bg.src = "textures/sl/bg.png";
	pipeUp.src = "textures/sl/putin.topenemy.jpg";
	pipeBottom.src = "textures/sl/zel.bottomenemy.jpg";

	scoreSound.src = "sound/b.mp3";
} else if(level === null || level === undefined || level === NaN){
	alert('што');
} else if(level === ''){
	alert('но тут же пусто'); 
} else {
	alert('тебе сказали русским языком блять 1 или 2, какой ' + level + '?!');
}

var gap = 95; //the distance between the objects

document.addEventListener("keydown", moveUp); //jump

function moveUp() {
	yPos -= 35; //jump height
}

var pipe = [];

pipe[0] = {
	x : cvs.width,
	y : 0
}

var score = 0;

//position and gravity value
var xPos = 10;
var yPos = 150;
var grav = 1.9;

function draw() {
	ctx.drawImage(bg, 0, 0);

	for(var i = 0; i < pipe.length; i++) {
		ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
		ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

		pipe[i].x--;

		if(pipe[i].x == 125) {
			pipe.push({
				x : cvs.width,
				y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
			 });
 		}

 		//death
		if(xPos + gorin.width >= pipe[i].x
		&& xPos <= pipe[i].x + pipeUp.width
		&& (yPos <= pipe[i].y + pipeUp.height
		|| yPos + gorin.height >= pipe[i].y + pipeUp.height + gap) || yPos + gorin.height >= cvs.height - fg.height) {
			deathSound.play();
			alert('Смерть');
			location.reload();
		}

		//giving score
		if(pipe[i].x == 5) {
			score++;
			scoreSound.play();
		}
	}

	ctx.drawImage(fg, 0, cvs.height - fg.height);
	ctx.drawImage(gorin, xPos, yPos);

	yPos += grav; //the effect of gravity

	//score
	ctx.fillStyle = "#000";
	ctx.font = "24px Verdana";
	ctx.fillText("Счет: " + score, 10, cvs.height - 20);

	requestAnimationFrame(draw);
}

pipeBottom.onload = draw;

//cheat, giving score equal value to player
function hack (value) {
	score += value;
}
 