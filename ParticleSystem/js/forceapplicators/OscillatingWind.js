class OscillatingWind extends GenericApplicator{
	constructor(direction, minStrength, maxStrength, rate, rising = true) {
		super();
		this.direction = direction;
		this.maxStrength = maxStrength;
		this.minStrength = minStrength;
		this.strength = maxStrength;
		this.rising = rising;
		this.rate = rate;
		
		if(rising) 
			this.strength = minStrength;
	}
		
	step(particleList) {
		if(this.rising) {
			this.strength += this.rate;
			if(this.strength > this.maxStrength)
				this.rising = false;
		}
		else {
			this.strength -= this.rate;
			if(this.strength < this.minStrength)
				this.rising = true;
		}
		for(var i = 0; i < particleList.length; i++) {
			var dir = this.computeDirectionJitter(Math.atan2(this.y - particleList[i].y, this.x - particleList[i].x) * (180 / Math.PI), 0.4);
			particleList[i].applyForce(this.direction, this.strength);
		}
	}	
	
	computeDirectionJitter(direction, Jitter) {
		var min = direction - (direction * Jitter);
		var max = direction + (direction * Jitter);
		return ((max - min) * Math.random()) + min;
	}
	
	draw(device) {
		
	}
}