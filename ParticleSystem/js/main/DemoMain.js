
var FPS = 60;
var framePeriod = (1000 / FPS);
var particleSystem = new ParticleSystem();
var device;

var playButton = document.getElementById("playButton");
var pauseButton = document.getElementById("pauseButton");

var rainButton = document.getElementById("rainButton");
var snowButton = document.getElementById("snowButton");
var bugSwarmButton = document.getElementById("bugSwarmButton");
var starFieldButton = document.getElementById("starFieldButton");
var explosionButton = document.getElementById("explosionButton");

var canvasSpace = document.getElementById("canvasSpace");

var SCREEN_WIDTH = 640;
var SCREEN_HEIGHT = 480;

var isPlaying = true;

function main() {
	var canvas = document.createElement('canvas');
	
	canvas.id = "canvas";
	canvas.width = SCREEN_WIDTH;
	canvas.height = SCREEN_HEIGHT;
	
	canvasSpace.appendChild(canvas);
	
	device = new HTMLCanvasController(SCREEN_WIDTH, SCREEN_HEIGHT, canvas, true, 0x000000FF);
	
	lastTime = Date.now();
    startTime = lastTime;
    animate();
	
	playButton.addEventListener("click", function() {isPlaying = true; animate();});
	pauseButton.addEventListener("click", function() {isPlaying = false;});
	
	starFieldButton.addEventListener("click", createStarField);
	snowButton.addEventListener("click", createSnow);
	rainButton.addEventListener("click", createRain);
	bugSwarmButton.addEventListener("click", createBugSwarm);
	explosionButton.addEventListener("click", createExplosion);
	
	console.log("Launching particle system demo!");
}

function createRain() {
	var properties = new ParticleProperties();
	var pc = new DemoParticleController(properties, device);
	var fa = new OscillatingWind(0, -0.1, 0.25, .03, false);
	var rainGraphic = new GraphicCircle(3);
	
	device.backgroundColor = 0x4F4F4FFF
	
	properties.minDirection = 90;
	properties.maxDirection = 100;
	properties.minVel = 18;
	properties.maxVel = 25;
	properties.frequency = 15;
	properties.amount = 120;
	properties.color = 0x00FFFF;
	properties.graphic = rainGraphic;
	
	particleSystem = new ParticleSystem();
	particleSystem.addController(pc);
	//pc.addForceApplicator(fa);
}

function createSnow() {
	var properties = new ParticleProperties();
	var pc = new DemoParticleController(properties, device);
	var fa = new OscillatingWind(0, -0.1, 0.3, .01, false);
	var img = new Image();
	var snowGraphic = new GraphicImage(img);
	
	img.src = "js/graphics/images/snowflake.png";
	
	device.backgroundColor = 0x008F8FFF
	
	properties.minDirection = 70;
	properties.maxDirection = 110;
	properties.minVel = 5;
	properties.maxVel = 9;
	properties.frequency = 15;
	properties.amount = 60;
	properties.color = 0xFFFFFF;

	properties.x = -(SCREEN_WIDTH / 2);
	properties.width = SCREEN_WIDTH * 2;
	properties.graphic = snowGraphic;
	
	particleSystem = new ParticleSystem();
	particleSystem.addController(pc);
	pc.addForceApplicator(fa);
}

function createStarField() {
	var propertiesBackground = new ParticleProperties();
	var propertiesForeground = new ParticleProperties();
	var pc1 = new DemoParticleController(propertiesBackground, device);
	var pc2 = new DemoParticleController(propertiesForeground, device);
	var starGraphic = new GraphicCircle(1);
	
	device.backgroundColor = 0x000000FF
	
	propertiesBackground.minDirection = 90;
	propertiesBackground.maxDirection = 90;
	propertiesBackground.minVel = 4;
	propertiesBackground.maxVel = 7;
	propertiesBackground.frequency = 15;
	propertiesBackground.amount = 75;
	propertiesBackground.color = 0xFFFFFF;
	
	propertiesForeground.minDirection = 90;
	propertiesForeground.maxDirection = 90;
	propertiesForeground.minVel = 8;
	propertiesForeground.maxVel = 11;
	propertiesForeground.frequency = 30;
	propertiesForeground.amount = 50;
	propertiesForeground.color = 0xFFFFFF;
	propertiesForeground.graphic = starGraphic;
	
	particleSystem = new ParticleSystem();
	particleSystem.addController(pc1);
	particleSystem.addController(pc2);
}

function createBugSwarm() {
	var properties = new ParticleProperties();
	var pc = new ParticleController(properties, device);
	var fa1 = new BugApplicator(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);
	var fa2 = new OscillatingWind(90, -0.3, 0.3, .1, false);
	var fa3 = new OscillatingWind(0, -0.3, 0.3, .1, false);
	var bugGraphic = new GraphicCircle(2);
	
	device.backgroundColor = 0xFFFFFFFF
	
	properties.minDirection = 0;
	properties.maxDirection = 360;
	properties.minVel = 5;
	properties.maxVel = 10;
	properties.frequency = -1;
	properties.amount = 600;
	properties.color = 0x000000;
	properties.graphic = bugGraphic;

	properties.x = 100;
	properties.y = 100;
	properties.width = SCREEN_WIDTH - 200;
	properties.height = SCREEN_HEIGHT - 200;
	
	particleSystem = new ParticleSystem();
	particleSystem.addController(pc);
	pc.addForceApplicator(fa1);
	pc.addForceApplicator(fa2);
	pc.addForceApplicator(fa3);
	pc.spawnParticles();
}

function createExplosion() {
	var properties = new ParticleProperties();
	var pc = new DemoParticleController(properties, device);
	//oscillatig winds can also apply a steady force in some direction if the minimum and maximum amplitudes are the same
	var fa = new OscillatingWind(90, 0.75, 0.75, .5, false);
	var shrapnelGraphic = new GraphicCircle(1);
	
	device.backgroundColor = 0x00000FF
	
	properties.minDirection = 250;
	properties.maxDirection = 290;
	properties.minVel = 1;
	properties.maxVel = 25;
	properties.frequency = -1;
	properties.amount = 160;
	properties.color = 0xFFEE60;

	properties.x = (SCREEN_WIDTH - 30) / 2;
	properties.y = SCREEN_HEIGHT;
	properties.width = 30;
	properties.height = 1;
	properties.graphic = shrapnelGraphic;
	
	particleSystem = new ParticleSystem();
	particleSystem.addController(pc);
	pc.addForceApplicator(fa);
	pc.spawnParticles();
}

function animate() {
	if(isPlaying)
		requestAnimationFrame(animate);

    currentTime = Date.now();
    elapsedTime = currentTime - lastTime;

    if (elapsedTime > framePeriod) {
        lastTime = currentTime - (elapsedTime % framePeriod);

		particleSystem.step();
		device.drawFrame();
		particleSystem.draw();
    }
}

main();