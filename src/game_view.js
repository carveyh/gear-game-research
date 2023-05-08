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


	bindKeyHandlers(){

		key('w', () => {
			this.game.ship.power(GameView.MOVES['w']);
			return false;
		})
		key('a', () => {
			this.game.ship.power(GameView.MOVES['a']);
			return false;
		})
		key('s', () => {
			this.game.ship.power(GameView.MOVES['s']);
			return false;
		})
		key('d', () => {
			this.game.ship.power(GameView.MOVES['d']);
			return false;
		})
		key('w+d', () => {
			console.log("w+d")
			this.game.ship.power(GameView.MOVES['wd']);
			// this.game.ship.power(GameView.MOVES['d']);
			return false;
		})
		key('s+d', () => {
			console.log("s+d")
			this.game.ship.power(GameView.MOVES['sd']);
			// this.game.ship.power(GameView.MOVES['d']);
			return false;
		})
		key('w+a', () => {
			console.log("w+a")
			this.game.ship.power(GameView.MOVES['wa']);
			// this.game.ship.power(GameView.MOVES['a']);
			return false;
		})
		key('s+a', () => {
			console.log("s+a")
			this.game.ship.power(GameView.MOVES['sa']);
			// this.game.ship.power(GameView.MOVES['a']);
			return false;
		})



		key('e', (event) => {
			this.game.ship.vel = [0,0];
			return false;
		})

		key('space', (event) => {
			if(event.target === document.body){ //checking the target will prevent it from scrolling the website body. However...window scrolling with space won't work even if focus is not on canvas, by clicking outside the canvas...not intended...
				this.game.ship.fireBullet();
				event.preventDefault();
			}
		})
	}

	start(){
		// Because setInterval calls its callbacks functionstyle, need to bind to context.
		// However...why does the callback passed into the forEach in this.game.moveObjects() not need binding?
		// setInterval(this.game.moveObjects.bind(this.game), GameView.INTERVAL);
		setInterval(this.game.step.bind(this.game), GameView.INTERVAL);
		// debugger
		setInterval(this.game.draw.bind(this.game), GameView.INTERVAL, this.ctx);
	}
}

export default GameView;