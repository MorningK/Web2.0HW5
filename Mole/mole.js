// 14331025_chenkui

var curTime = 30;
var curScore = 0;
var curState = 0; // 0 代表未开始，1代表正在进行，2代表暂停
var timer = null;

window.onload = function() {
	var index = 0; // 记录mole的下标
	var startStop = document.getElementById("StartStop");
	var time = document.getElementById("Time");
	var score = document.getElementById("Score");
	var state = document.getElementById("State");
	var game = document.getElementById("Radio");
	createMole(game);
	var radios = document.getElementsByName("Mole");
	startStop.onclick = function() {
		if (curState == 0) {
			curTime = 30;
			curScore = 0;
			curState = 1;
			time.value = curTime;
			score.value = curScore;
			timer = setInterval(reduceTime, 1000, time, state);
			index = Math.floor(Math.random()*60);
			radios[index].checked = true;
			state.value = "Playing";
		} else if (curState == 1) {
			curState = 2;
			clearInterval(timer);
			state.value = "Pause";
		} else if (curState == 2) {
			curState = 1;
			timer = setInterval(reduceTime, 1000, time, state);
			state.value = "Playing";
		}
	}
	for (var i = 0; i < 60; ++i) {
		radios[i].onclick = function() {
			if (curState == 1) {
				if (this.accessKey == radios[index].accessKey) {
					++curScore;
					score.value = curScore;
					while (this.accessKey == radios[index].accessKey)
						index = Math.floor(Math.random()*60);
				} else {
					curScore = curScore > 1 ? curScore-1 : 0;
					score.value = curScore;
				}
				radios[index].checked = true;
			} else if (curState == 0) {
				this.checked = false;
			} else {
				radios[index].checked = true;
			}
			
		}
	}
}

function createMole(parent) {
	for (var i = 0; i < 60; ++i) {
		var input = document.createElement("input");
		input.type = "radio";
		input.className = "mole";
		input.name = "Mole";
		input.accessKey = i;
		parent.appendChild(input);
	}
}

function reduceTime(time, state){
	if (curTime > 0) {
		--curTime;
		time.value = curTime;
	} else {
		state.value = "Game Over";
		curState = 0;
		alert("Game Over.\nYour Score is:" + curScore);
		clearInterval(timer);
	}
}
