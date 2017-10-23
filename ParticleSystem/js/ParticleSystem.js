
class ParticleSystem {
	constructor() {
		this.particleControllers = [];
	}
	
	addController(newController){
		this.particleControllers.push(newController);
	}
	
	step() {
		for(var i = 0; i < this.particleControllers.length; i++) {
			this.particleControllers[i].step();
		}
	}
	
	draw() {
		for(var i = 0; i < this.particleControllers.length; i++) {
			this.particleControllers[i].draw();
		}
	}
}