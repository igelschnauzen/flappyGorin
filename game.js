let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

class Level {
	constructor(levelNumber) {
		this.gorin = new Image();
		this.bg = new Image();
		this.pipeUp = new Image();
		this.pipeBottom = new Image();
		this.fg = new Image();
		
		this.scoreSound = new Audio();
		this.deathSound = new Audio();
		
		this.deathSound.src = "sound/death.mp3";
		this.scoreSound.src = "sound/score.mp3";
		
		switch(levelNumber) {
			case '1':
				this.gorin.src = "textures/img/gorin.player.png";
				this.bg.src = "textures/img/bg.png";
				this.pipeUp.src = "textures/img/vilka.topenemy.png";
				this.pipeBottom.src = "textures/img/taburetka.bottomenemy.png";
				
				break;
			case '2':
				this.gorin.src = "textures/img2/gorin.player.png";
				this.bg.src = "textures/img2/bg2.jpg";
				this.pipeUp.src = "textures/img2/lopata.topenemy.png";
				this.pipeBottom.src = "textures/img2/dver.bottomenemy.png";

				break;

			default:
				alert('Ошибка!');
				location.reload();

		}
	}
}

let level = new Level(document.querySelector("#canvas").getAttribute("level"));

function death() {
	level.deathSound.play();
	alert(`\nСмерть.` +  `\n Счет: ` + score);

	location.reload();

	return;
}

function checkKey(e) {
	switch(e.keyCode) {
		case 27:
			alert('Пауза.');

			break;
		case 8:
			death();

			break;
		case 16:
			grav = -6;

			break;
		case 17:
			grav = +6;

			break;
		default:
			grav = -3;
	}
}

let gap = 95;

document.addEventListener("keydown", checkKey); //jump
setInterval(() => { if(grav < 1.9) grav += 1; else if (grav > 1.9) grav = 1.9; }, 100);

let pipe = [];

pipe[0] = {
	x : cvs.width,
	y : 0
}

let score = 0;

//position and gravity value
let xPos = 10;
let yPos = 150;
let grav = 1.9;

function draw() {

	ctx.drawImage(level.bg, 0, 0);

	for(let i = 0; i < pipe.length; i++) {
		ctx.drawImage(level.pipeUp, pipe[i].x, pipe[i].y);
		ctx.drawImage(level.pipeBottom, pipe[i].x, pipe[i].y + level.pipeUp.height + gap);
	
		pipe[i].x--;
	
		if(pipe[i].x == 125) {
			pipe.push({
				x : cvs.width,
				y : Math.floor(Math.random() * level.pipeUp.height) - level.pipeUp.height
			});
		}
	
		//death
		if(xPos + level.gorin.width >= pipe[i].x
		&& xPos <= pipe[i].x + level.pipeUp.width
		&& (yPos <= pipe[i].y + level.pipeUp.height
		|| yPos + level.gorin.height >= pipe[i].y + level.pipeUp.height + gap) 
		|| yPos + level.gorin.height >= cvs.height - level.fg.height) {
			return death();
		}
	
		//giving score
		if(pipe[i].x == 5) {
			score++;
			level.scoreSound.play();
		}
	}
	
	ctx.drawImage(level.fg, 0, cvs.height - level.fg.height);
	ctx.drawImage(level.gorin, xPos, yPos);
	
	yPos += grav; //the effect of gravity
	
	//score
	ctx.fillStyle = "#000";
	ctx.font = "24px unifont";

	ctx.fillText(+ score, 10, cvs.height - 20);
	
	requestAnimationFrame(draw);

}

function hack (value) {
	score += value;
}

level.pipeBottom.onload = draw;
