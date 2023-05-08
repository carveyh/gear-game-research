import MovingObject from "./moving_object";
import Ship from "./ship.js";
import * as Util from "./util.js";
import Bullet from "./bullet.js";
import SpaceStation from "./space_station";

class Asteroid extends MovingObject {
	static RADIUS = 25;
	static COLOR = "cyan";
	static SPEED = 4;

	// new Asteroid({ pos: [30, 30] })
	constructor(options){ //caller can specify pos, radius and color will be set to Asteroid's static properties.
		super({
			pos: options.pos,
			vel: Util.randomVector(Asteroid.SPEED),
			radius: Asteroid.RADIUS,
			color: Asteroid.COLOR,
			game: options.game
		})
	}

	collideWith(otherObject){
		if(otherObject instanceof Ship && this.isCollidedWith(otherObject)){
		// if(this.isCollidedWith(otherObject)){
			// console.log("collision!")
			// this.game.remove(otherObject);
			// this.game.remove(this);
			otherObject.relocate();
			otherObject.vel = [0,0];
			// console.log("hi")
		} else if(otherObject instanceof Bullet) {
			this.game.remove(otherObject);
			this.game.remove(this);
		} else if(otherObject instanceof SpaceStation) {
			// a very simplified version of "bouncing"
			this.vel = [this.vel[0] * -1, this.vel[1] * -1];
		}
	}
}

export default Asteroid;