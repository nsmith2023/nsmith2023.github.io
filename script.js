var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var spriteSheet = new Image();
spriteSheet.src = "coin.png";

var numbImages = 6;
var currImage = 0;
var imageWidth = 85, imageHeight = 150;

var x = 25;
var y = 25;

setInterval( animate, 33 );

function animate() {
  	clearBackground();
  	drawSprite();
}

function clearBackground() {
  ctx.fillStyle = "white";
  ctx.fillRect( 0, 0, canvas.width, canvas.height);
}

function drawSprite() {

ctx.drawImage( spriteSheet,
  currImage*imageWidth , 0, imageWidth, imageHeight,x, y, imageWidth, imageHeight );

  currImage++;
  currImage %= numbImages;
}
