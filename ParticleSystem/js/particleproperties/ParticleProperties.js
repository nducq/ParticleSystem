
var RANDOM = -1;
var UNIFORM = -2;

class ParticleProperties{
	constructor() {
		this.frequency = 30;
		this.amount = 30;
		this.color = RANDOM;
		this.alpha = 0xFF;
		this.graphic = new GenericGraphic();
		
		this.minDirection = 0;
		this.maxDirection = 360;
		
		this.weight = 1;
		
		this.minVel = 0;
		this.maxVel = 0;
		
		this.x = 0;
		this.y = -SCREEN_HEIGHT;
		
		this.width = SCREEN_WIDTH;
		this.height = SCREEN_HEIGHT;
	}
	
	getAlpha() {
		if (this.alpha == RANDOM) {
			return Math.round((Math.random() * 0xFF));
		}
		return this.alpha;
	}
	
	getColor() {
		if (this.color == RANDOM) {
			return Math.round((Math.random() * 0xFFFFFF));
		}
		return this.color;
	}
}