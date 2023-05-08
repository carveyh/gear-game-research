import MovingObject from "./moving_object";
import Bullet from "./bullet.js";
import * as Util from "./util.js";

class Ship extends MovingObject{
	static RADIUS = 10;
	static COLOR = "red";

	constructor(options){
		super({
			pos: options.pos,
			vel: [0,0],
			radius: Ship.RADIUS,
			color: Ship.COLOR,
			game: options.game
		})
	}

	fireBullet(){
		let normVel = Util.norm(this.vel);
		if(normVel === 0){
			return;
		}
		let bullet = new Bullet({
			pos: this.pos,
			// vel: [this.vel[0] * 5, this.vel[1] * 5],
			vel: Util.scale(Util.dir(this.vel), Bullet.SPEED),
			game: this.game
		});
		this.game.add(bullet);
	}

	relocate(){
		this.pos = this.game.randomPosition();
	}

	power(impulse){
		this.vel[0] += impulse[0];
		this.vel[1] += impulse[1];
	}
}

export default Ship;