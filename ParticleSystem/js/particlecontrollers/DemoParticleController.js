class DemoParticleController extends ParticleController{
	constructor(particleProperties, graphicsController) {
		super(particleProperties, graphicsController);
	}
	
	step() {
		super.step();
		
		//a demo controller should do everything that a regular controller does except delete particles that go off screen
		for(var i = 0; i < this.particleList.length; i++) {
			if(this.particleList[i].y > SCREEN_HEIGHT) {
				this.particleList.splice(i, 1);
				i--;
			}
		}
	}
}