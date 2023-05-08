// import Game from "./game.js";
// How come I don't need to import Game if I am invoking a Game instance method on a Game instance here?
import * as Util from "./util.js";
// import Game from "./game.js";

class MovingObject{
	constructor(options){
		this.pos = options.pos;
		this.vel = options.vel;
		this.radius = options.radius;
		this.color = options.color;
		this.game = options.game;
		this.isWrappable = true;
	}

	draw(ctx){
		ctx.beginPath();
		ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
		this.displayCoords(ctx);
		this.customDraw(ctx);
	}

	customDraw(ctx){

	}

	displayCoords(ctx){
		ctx.font = "10px Arial";
		ctx.fillStyle = "yellow";
		ctx.fillText(`X: ${Math.floor(this.pos[0])}, Y: ${Math.floor(this.pos[1])}`,this.pos[0] + 30, this.pos[1] + 30)
	}

	displayCoordsOfPos(ctx,pos) {
		ctx.beginPath();
		ctx.font = "20px Arial";
		ctx.fillStyle = "white";
		ctx.fillText(`X: ${Math.floor(pos[0])}, Y: ${Math.floor(pos[1])}`,pos[0] + 30, pos[1] + 30)
		ctx.closePath();
	}

	isCollidedWith(otherObject){
		// this.game.asteroids.forEach(asteroid => {
		// 	if(asteroid !== this) {
		// 		let distance = Util.distance(this.pos, otherObject.pos);

		// 		if(distance < (this.radius + otherObject.radius)){
		// 			console.log(`${this.pos} collided with ${asteroid.pos}!!`)	
		// 			return true;
		// 		}
		// 	}
		// });

		let distance = Util.distance(this.pos, otherObject.pos);
		if(distance < (this.radius + otherObject.radius)){
			// console.log(`${this.pos} collided with ${otherObject.pos}!!`)	
			return true;
		}
	}

	collideWith(otherObject){
		// if(this.isCollidedWith(otherObject)){
		// 	this.game.remove(otherObject);
		// 	this.game.remove(this);
		// }
	}

	// Add comment - testing pushing changes to a git branch and merging back to main.

	move(){
		// debugger
		let newX = this.pos[0] + this.vel[0];
		let newY = this.pos[1] + this.vel[1];
		this.pos = [newX, newY];
		// this.pos = this.game.wrap([newX, newY]);
		if(this.game.isOutOfBounds(this.pos)){
			if(this.isWrappable) {
				this.pos = this.game.wrap([newX, newY]);
			} else {
				this.game.remove(this);
			}
		}
		// console.log(this.pos)
		this.customMove();
	}

	customMove(){};
}

export default MovingObject;