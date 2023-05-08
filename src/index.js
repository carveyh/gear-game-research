console.log("Webpack is working!");
console.log("And updating the build file dynamically with each save!")

// import MovingObject from "./moving_object.js";
// import Asteroid from "./asteroid.js";
import GameView from "./game_view.js";
import Game from "./game.js";


// window.MovingObject = MovingObject;
// window.Asteroid = Asteroid;

// document.addEventListener("DOMContentLoaded", () => {
	
	let canvas = document.getElementById('game-canvas');
	let ctx = canvas.getContext('2d');
	let game = new Game();
	canvas.width = Game.DIM_X;
	canvas.height = Game.DIM_Y;
	let gameview = new GameView(game, ctx);
	gameview.start();
	
	
	
	// let moving1 = new MovingObject({
	// 	pos: [300,300],
	// 	vel: [-20,-20],
	// 	radius: 10,
	// 	color: "yellow"
	// });

	// let ast = new Asteroid({
	// 	pos: [200,200]
	// })

	// ctx.beginPath();
	// moving1.draw(ctx);
	// moving1.move();
	// moving1.draw(ctx);
	// moving1.move();
	// moving1.draw(ctx);
	// moving1.move();
	// moving1.draw(ctx);
	// moving1.move();
	// moving1.draw(ctx);
	// moving1.move();
	// moving1.draw(ctx);
	// moving1.move();
	// moving1.draw(ctx);
	// moving1.move();
	// moving1.draw(ctx);
	// moving1.move();
	// moving1.draw(ctx);
	// ctx.beginPath();
	// ast.draw(ctx);
	// ast.move();
	// ast.draw(ctx);
	// ast.move();
	// ast.draw(ctx);
	// ast.move();
	// ast.draw(ctx);
	// ast.move();
// })