// https://medium.com/@dovern42/handling-multiple-key-presses-at-once-in-vanilla-javascript-for-game-controllers-6dcacae931b7
// ^ Better key handler than keymaster, to handle multiple simultaneous keypresses based on keydown and keyup!

import Game from "./game";

class GameView{

	// static INTERVAL = 1000;
	static INTERVAL = 50;
	static MOVES = {
		w: [0,-1],
		a: [-1,0],
		s: [0,1],
		d: [1,0],
		// wd: [1,-1],
		// sd: [1,1],
		// wa: [-1,-1],
		// sa: [-1,1]
	};

	constructor(game, ctx){
		this.game = game;
		this.ctx = ctx;
		this.lastTime = 0;
		this.keyPresses = {};
		// this.bindKeyHandlers();
		this.bindKeyHandlersWithoutKeyMaster();
	}

	bindKeyHandlersWithoutKeyMaster(){
		let canvas = this.ctx.canvas;
		document.addEventListener('keydown', (e) => {
			let key = e.key;
			// console.log(key);
			this.keyPresses[key] = true;
			// console.log(this.keyPresses);
			// console.log(GameView.MOVES);
			this.keyMapping.call(this);
			e.preventDefault();
		})
		document.addEventListener('keyup', (e) => {
			let key = e.key;
			// console.log("hi?");
			delete this.keyPresses[key];
			this.keyMapping.bind(this);
			e.preventDefault();
		})
	}

	keyMapping(){
		Object.keys(this.keyPresses).forEach(key => {
			console.log(Object.keys(this.keyPresses))
		// this.keyPresses.forEach(key => {
			if(GameView.MOVES[key]){
				// console.log("key found")
				this.game.ship.power(GameView.MOVES[key]);
			}

			if(key === ' '){
				this.game.ship.fireBullet();
			}
		})
	}

	animate(currentTime){
		let timeDelta = currentTime - this.lastTime;
		this.game.step(timeDelta);
		this.game.draw(this.ctx);
		this.lastTime = currentTime;

		requestAnimationFrame(this.animate.bind(this));
	}

	start(){
		// Because setInterval calls its callbacks functionstyle, need to bind to context.
		// However...why does the callback passed into the forEach in this.game.moveObjects() not need binding?
		// setInterval(this.game.moveObjects.bind(this.game), GameView.INTERVAL);
		// setInterval(this.game.step.bind(this.game), GameView.INTERVAL);
		// debugger
		// setInterval(this.game.draw.bind(this.game), GameView.INTERVAL, this.ctx);
		requestAnimationFrame(this.animate.bind(this));
	}
}

export default GameView;