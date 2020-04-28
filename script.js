var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

var scoreSound = new Audio();
scoreSound.src = "sound/a.mp3";

var level = prompt('lvl? (1/2)', '');
if(level == '1') {
	bird.src = "textures/img/gorin.player.jpg";
	bg.src = "textures/img/bg.png";
	pipeUp.src = "textures/img/vilka.topenemy.jpg";
	pipeBottom.src = "textures/img/taburetka.bottomenemy.jpg";
} else if(level == '2') {
	bird.src = "textures/img2/gorin.player.jpg";
	bg.src = "/textures/img2/bg.jpg";
	pipeUp.src = "textures/img2/lopata.topenemy.png";
	pipeBottom.src = "textures/img2/dver.bottomenemy.png";
} else if(level == '666') {
	bird.src = "textures/sl/poroshenko.player.png";
	bg.src = "textures/sl/bg.png";
	pipeUp.src = "textures/sl/putin.topenemy.jpg";
	pipeBottom.src = "textures/sl/zel.bottomenemy.jpg";
} else if(level === null || level === undefined || level === NaN){
	alert('што');
} else if(level === ''){
	alert('но тут же пусто'); 
} else {
	alert('тебе сказали русским языков блять 1 или 2, какой ' + level + '?!');
}

var gap = 95;

// При нажатии на какую-либо кнопку
document.addEventListener("keydown", moveUp);

function moveUp() {
	yPos -= 25;
}

// Создание блоков
var pipe = [];

pipe[0] = {
	x : cvs.width,
	y : 0
}

var score = 0;
// Позиция Горина
var xPos = 10;
var yPos = 150;
var grav = 1.5;

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


		if(xPos + bird.width >= pipe[i].x
		&& xPos <= pipe[i].x + pipeUp.width
		&& (yPos <= pipe[i].y + pipeUp.height
		|| yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
			alert('Смерть')
			location.reload(); // Перезагрузка страницы
		}

		if(pipe[i].x == 5) {
			score++;
			scoreSound.play();
		}
	}

	ctx.drawImage(fg, 0, cvs.height - fg.height);
	ctx.drawImage(bird, xPos, yPos);

	yPos += grav;

	ctx.fillStyle = "#000";
	ctx.font = "24px Verdana";
	ctx.fillText("Счет: " + score, 10, cvs.height - 20);

	requestAnimationFrame(draw);
}

pipeBottom.onload = draw;

function hack (value) {
	score += value;
}
 