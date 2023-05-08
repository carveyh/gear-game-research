import MovingObject from "./moving_object";
import Game from "./game.js";
import * as Util from "./util.js";


class SpaceStation extends MovingObject{

	static COLOR = "magenta";

	constructor(options) {
		options.pos ||= [Game.DIM_X * 0.66, Game.DIM_Y * 0.33];
		options.vel = [0,0];
		options.radius ||= 40;
		options.color = SpaceStation.COLOR;
		options.isWrappable = false;

		super(options);

		// Angle in degrees. Will be converted to radians.
		this.currentAngle = 0;
		this.counterClock ||= false;

		// A delay for "ticks"
		this.maxDelay = 0;

		// Rotation in degrees per...GameView.INTERVAL ms?
		this.rotationSpeed = -1; 
	}

	customDraw(ctx){
		// console.log(this.pos)
		// ctx.fillStyle = "blue";
		// // Get the starting point on the circle
		// 	// let rad = Util.radians(this.currentAngle);

		// // Go from circle origin, a length of radius, in direction of angle vector.
		
		// let scaledVector = Util.scaledVector(this.currentAngle, this.radius);
		// let oppVector = Util.scale(scaledVector, -1);
		
		// // console.log(scaledVector);
		// // console.log(oppVector);

		// ctx.beginPath();
		// ctx.arc(this.pos[0] + scaledVector[0], this.pos[1] + scaledVector[1], 5, 0, 2* Math.PI, false);
		// ctx.fill();

		// ctx.beginPath();
		// ctx.fillStyle = "green";
		// ctx.arc(this.pos[0] + oppVector[0], this.pos[1] + oppVector[1], 5, 0, 2* Math.PI, false);
		// ctx.fill();

		// ctx.beginPath();
		// ctx.strokeStyle = "black";
		// ctx.moveTo(...Util.addVectors(this.pos, scaledVector));
		// ctx.lineTo(...Util.addVectors(this.pos, oppVector));
		// ctx.stroke();


		// Get the ending point on the circle

		// Use the 2 points to define the line

		// Draw the line

		// this.customDrawRotation(ctx);
	}

	draw(ctx){
		this.customDrawRotation(ctx);
	}

	customDrawRotation(ctx){
		ctx.save();
		ctx.translate(this.pos[0], this.pos[1]);
		ctx.rotate(Util.radians(this.currentAngle));

		// Gear itself - the canvas shape
		// ctx.beginPath();
		// ctx.fillStyle = this.color;
		// ctx.arc(0,0,this.radius,0,2*Math.PI,false);
		// ctx.fill();
		// ctx.closePath();

		// Gear - image file
		// ctx.drawImage(this.game.gearShiny, 0,0, 291, 291, -145.5, -145.5, 291, 291)
		ctx.drawImage(
			this.game.gearShiny, 
			0,
			0, 
			291, // original image width
			291, // original image height
			(this.radius + 5) * -1, 
			(this.radius + 5) * -1, 
			(this.radius + 5) * 2, 
			(this.radius + 5) * 2
		);

		// Linear path entry point
		ctx.beginPath();
		ctx.strokeStyle = "white";
		ctx.fillStyle = "blue";
		ctx.arc(0, this.radius * -1, 5, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.stroke();
		ctx.closePath();

		// Linear path exit point
		ctx.beginPath();
		ctx.strokeStyle = "white";
		ctx.fillStyle = "green";
		ctx.arc(0, this.radius, 5, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
		
		// Linear path
		ctx.beginPath();
		ctx.moveTo(0, this.radius * -1);
		ctx.lineTo(0, this.radius);
		ctx.lineWidth = 20;
		ctx.strokeStyle = "rgb(0,255,0)";
		ctx.stroke();
		ctx.closePath();

		ctx.restore();
	}

	customMove(){
		let rotationVariation = 1;
		(this.game.stations.indexOf(this) % 2 === 0) ? rotationVariation = 1 : rotationVariation = -1;
		this.currentAngle += this.rotationSpeed * rotationVariation;
	}
}

export default SpaceStation;