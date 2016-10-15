// 14331025_chenkui

window.onload = function() {
	var isStart = false;
	var result = 0; // 0 代表未完成，1代表成功，2代表碰墙，3代表作弊
	var walls = document.getElementsByName("Wall");
	var state = document.getElementById("state");
	var startButton = document.getElementById("start");
	var endButton = document.getElementById("end");
	var isCheated = document.getElementById("isCheated");
	startButton.onmouseover = function() {
		isStart = true;
		result = 3;
		state.innerHTML = "";
	}
	for (var i = 0; i < walls.length; ++i) {
		walls[i].onmouseover = function() {
			if (isStart) {
				result = 2;
				state.innerHTML = "You Lose";
				isStart = false;
				this.style.backgroundColor = "#FF0000";
			}
		}
		walls[i].onmouseout = function() {
			this.style.backgroundColor = "#eee";
		}
	}
	isCheated.onmouseover = function(){
		result = 1;
	}
	endButton.onmouseover = function() {
		if (isStart == true) {
			if (result == 1) {
				state.innerHTML = "You Win";
			} else if (result == 3 || result == 0) {
				state.innerHTML = "Don't cheat, you should start from the 'S' and move to the 'E' inside the Maze!";
			}
		}
		isStart = false;
		result = 0;
	}
}
