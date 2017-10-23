class BugApplicator extends GenericApplicator{
	constructor(x, y) {
		super();
		this.x = x;
		this.y = y;
	}
		
	step(particleList) {
		for(var i = 0; i < particleList.length; i++) {
			var dir = this.computeDirectionJitter(Math.atan2(this.y - particleList[i].y, this.x - particleList[i].x) * (180 / Math.PI), 0.5);
			particleList[i].applyForce(dir, .35);
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