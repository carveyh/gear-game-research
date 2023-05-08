import Asteroid from "./asteroid.js";
import Ship from "./ship.js";
import Bullet from "./bullet.js";
import SpaceStation from "./space_station.js";

class Game {
	static DIM_X = 960;
	static DIM_Y = 600;
	// static DIM_X = 480;
	// static DIM_Y = 300;
	static NUM_ASTEROIDS = 5;

	constructor(){
		this.asteroids = [];
		this.bullets = [];
		this.ship = new Ship({
			pos: this.randomPosition(),
			game: this
		});

		this.stations = [];

		// this.station = new SpaceStation({
		// 	game: this
		// });

		this.addStations();
		this.addAsteroids();
		this.background = new Image();
		this.background.src = './img/spacebg.jpg';
		this.gearShiny = new Image();
		this.gearShiny.src = './img/gear_shiny.png';
		// this.img.onload = function() {
		// 	// ctx.drawImage(this.img,0,0);
		// }
	}

	addAsteroids(){
		for(let i = 0; i < Game.NUM_ASTEROIDS; i++){
			this.add(new Asteroid({
				pos: this.randomPosition(),
				game: this
			}));
		};
	};

	addStations(){
		this.addOneStation([633.6, 278]);
		this.addOneStation([633.6, 358]);
		this.addOneStation([633.6, 438]);
		this.addOneStation([633.6, 498], 20);
		
	}

	addOneStation(pos, radius){
		this.add(new SpaceStation({
			pos: pos,
			radius: radius
			// game: this
		}))
	}

	add(obj){
		obj.game = this;
		if(obj instanceof Bullet){
			this.bullets.push(obj);
		} else if(obj instanceof Asteroid) {
			this.asteroids.push(obj);
		} else if(obj instanceof SpaceStation) {
			this.stations.push(obj);
		}
	}

	allObjects(){
		// return [].concat([this.station]).concat(this.stations).concat(this.asteroids).concat(this.bullets).concat([this.ship]);
		return [].concat(this.stations).concat(this.asteroids).concat(this.bullets).concat([this.ship]);
	}

	checkCollisions(){
		this.allObjects().forEach(obj1 => {
			this.allObjects().forEach(obj2 => {
				if(obj1 !== obj2 && obj1.isCollidedWith(obj2)) {
					obj1.collideWith(obj2);
				}
			})
		})
	}

	draw(ctx){
		ctx.clearRect(0,0,Game.DIM_X,Game.DIM_Y);


		
		ctx.drawImage(this.background,0,0, Game.DIM_X, Game.DIM_Y);
		// console.log(this.allObjects())
		this.allObjects().forEach(obj => {
			// console.log(this.allObjects())
			obj.draw(ctx);
		});
	};

	isOutOfBounds(pos){
		if(((pos[0] > Game.DIM_X) || (pos[0] < 0)) || ((pos[1] > Game.DIM_Y) || (pos[1] < 0))){
			// console.log("oob!");
			return true;
		}
		return false;
	}

	moveObjects(timeDelta){
		this.allObjects().forEach(obj => {
			// debugger
			obj.move(timeDelta);
		});
		// console.log(this.allObjects())
	};

	randomPosition(){
		return [Game.DIM_X * Math.random(), Game.DIM_Y * Math.random()];
	}

	remove(obj){

		if(obj instanceof Asteroid){
			this.asteroids = this.removeFromCollection(this.asteroids, obj)
			// let idx = this.asteroids.indexOf(obj)
			// this.asteroids = this.asteroids.slice(0, idx)
			// 	.concat(this.asteroids.slice(idx + 1, this.asteroids.length))
		} else if(obj instanceof Bullet) {
			this.bullets = this.removeFromCollection(this.bullets, obj)
		} else if(obj instanceof Ship) {

		}

		
	}

	removeFromCollection(arr, obj){
		let idx = arr.indexOf(obj);
		arr = arr.slice(0, idx)
			.concat(arr.slice(idx + 1, arr.length));
		return arr;
	}

	step(timeDelta){
		this.moveObjects(timeDelta);
		this.checkCollisions();
	}

	wrap(pos){
		return [
			(pos[0] + Game.DIM_X) % Game.DIM_X,
			(pos[1] + Game.DIM_Y) % Game.DIM_Y
		];
	}
}

export default Game;