import MovingObject from "./moving_object";

class Bullet extends MovingObject {

	static RADIUS = 2;
	static COLOR = "yellow";
	static SPEED = 9;

	constructor(options){
		options.radius = Bullet.RADIUS;
		options.color = Bullet.COLOR;
		super(options)
		this.isWrappable = false;
	}	

	customDraw(ctx){
		ctx.strokeStyle = "green";
		ctx.stroke();
	};

	displayCoords(){};
	
}

export default Bullet;