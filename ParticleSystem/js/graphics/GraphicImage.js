class GraphicImage{
	constructor(img){
		this.img = img;
	}
	
	draw(x, y, color, device) {
		device.drawImage(x, y, this.img);
	}
}