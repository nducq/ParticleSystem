class GraphicCircle{
	constructor(radius){
		this.radius = radius;
	}
	
	draw(x, y, color, device) {
		device.drawCircle(x, y, this.radius, color, true);
	}
}