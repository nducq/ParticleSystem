
class ParticleController{
	
	constructor(particleProperties, graphicsController) {
		this.particleProperties = particleProperties;
		this.graphicsController = graphicsController;
		this.particleList = [];
		this.forceApplicators = [];
		this.drawApplicators = false;
		
		this.pulseTimer = (this.particleProperties.frequency);
	}
	
	addForceApplicator(newForce){
		this.forceApplicators.push(newForce);
	}
	
	step() {	
		if(this.particleProperties.frequency > 0)
			this.pulseTimer = this.pulseTimer - 1;
		
		if(this.pulseTimer == 0) {
			this.pulseTimer = (this.particleProperties.frequency);
			this.spawnParticles();
		}
		
		for(var i = 0; i < this.forceApplicators.length; i++) {
			this.forceApplicators[i].step(this.particleList);
		}
		
		for(var i = 0; i < this.particleList.length; i++) {
			this.particleList[i].step();
		}
	}
	
	draw() {
		if(this.drawApplicators) {
			for(var i = 0; i < this.forceApplicators.length; i++) {
				this.forceApplicators[i].draw(this.graphicsController);
			}
		}
		
		for(var i = 0; i < this.particleList.length; i++) {
			this.particleList[i].draw(this.graphicsController);
		}
	}
	
	spawnParticles() {
		for(var i = 0; i < this.particleProperties.amount; i++) {
			var vel = (Math.random() * (this.particleProperties.maxVel - this.particleProperties.minVel)) + this.particleProperties.minVel;
			var dir = (Math.random() * (this.particleProperties.maxDirection - this.particleProperties.minDirection)) + this.particleProperties.minDirection;
					
			var x = (Math.random() *  this.particleProperties.width) + this.particleProperties.x;
			var y = (Math.random() *  this.particleProperties.height) + this.particleProperties.y;

			this.particleList.push(new Particle(x, y, dir, vel, this.computeColor(), this.particleProperties.weight, this.particleProperties.graphic));
		}
	}
	
	computeColor() {
		return (this.particleProperties.getColor() << 8) + this.particleProperties.getAlpha();
	}
}