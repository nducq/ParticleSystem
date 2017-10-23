
class Particle {
	constructor(x, y, forceDirection, forceMagnitude, color, weight, graphic) {
		this.x = x;
		this.y = y;
		this.color = color;
		this.graphic = graphic;
		this.xSpeed = Math.cos(forceDirection * (Math.PI / 180)) * (forceMagnitude / weight);
		this.ySpeed = Math.sin(forceDirection * (Math.PI / 180)) * (forceMagnitude / weight);
		this.weight = weight;
	}
	
	applyForce(forceDirection, forceMagnitude) {
		this.xSpeed += Math.cos(forceDirection * (Math.PI / 180)) * (forceMagnitude / this.weight);
		this.ySpeed += Math.sin(forceDirection * (Math.PI / 180)) * (forceMagnitude / this.weight);
	}
	
	step() {
		this.x += this.xSpeed;
		this.y += this.ySpeed;
	}
	
	draw(device) {
		this.graphic.draw(this.x, this.y, this.color, device);
	}
}