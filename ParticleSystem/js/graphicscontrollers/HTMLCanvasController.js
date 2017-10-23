
class HTMLCanvasController extends GraphicsController {
	
	constructor(displayWidth, displayHeight, canvas, drawBackground = true, backgroundColor = 0xFFFFFFFF){
		super(displayWidth, displayHeight, canvas, drawBackground, backgroundColor);
		this.context = canvas.getContext("2d");
	}
	
	drawFrame(){
		this.drawBackground();
	}
	
	drawBackground() {
		this.context.fillStyle = this.colorToHTML(this.backgroundColor);
		this.context.fillRect(0, 0, this.displayWidth, this.displayHeight);
	}
	
	drawRectangle(x, y, width, height, color, filled = true) {
		if(filled) {
			this.context.fillStyle = this.colorToHTML(color);
			this.context.fillRect(x, y, width, height);
		}
		else {
			this.context.beginPath();
			this.context.strokeStyle = this.colorToHTML(color);
			this.context.rect(x, y, width, height);
			this.context.stroke();
		}
	}
	
	drawCircle(x, y, r, color, filled = true) {
		this.context.beginPath();
		this.context.arc(x, y, r, 0, 2 * Math.PI, false);
		if(filled) {
			this.context.fillStyle = this.colorToHTML(color);
			this.context.fill();
		}
		else {
			this.context.strokeStyle = this.colorToHTML(color);
			this.context.stroke();
		}
	}
	
	drawPoint(x, y, color) {
		this.drawRectangle(x, y, 1, 1, color, true);
	}
	
	drawImage(x, y, img) {
		this.context.drawImage(img, x, y);
	}
	
	colorToHTML(color) {
		return "#" + String("00000000" + (color >>> 0 ).toString(16)).slice(-8);
	}
}