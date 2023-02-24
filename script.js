var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
//ctx.font = "50px serif";

var score = localStorage.getItem( "score" );

if( score == undefined ) {
localStorage.setItem( "score", 0);
}


var state = 0;
var state = localStorage.getItem( "state" );

if( state == undefined ) {
localStorage.setItem( "state", 0);
}


setInterval( loop, 33 );


function loop() {
  clearBackground();
  //canvas size equals window size
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;

  score = localStorage.getItem("score" );
  ctx.fillText("Points: "+score, 50, 50);

  state = localStorage.getItem("state" );

  //console.log(state);


    checkState();

}


function clearBackground() {
  ctx.fillStyle = "white";
  ctx.fillRect( 0, 0, canvas.width, canvas.height);
}


function checkState(){

  if(state==0){

    stateZero();

  }else if(state==1){

    stateOne();

  }else if(state ==2){

    stateTwo();

  }else if(state==3){

    stateThree();

  }

}


function stateZero(){

}


function stateOne(){

}


function stateTwo(){

}


function stateThree(){

}


function drawAnimatedSprite(spriteSheet, numbImages, imageWidth, imageHeight, x, y) {
  this.spriteSheet=spriteSheet;
  this.numbImages=numbImages;
  this.imageWidth=imageWidth;
  this.imageHeight=imageHeight;
  this.x=x;
  this.y=y;
  console.log(this.spriteSheet);
  this.currImage = 0;

  this.draw = function(){

    alert("please god help");
    ctx.drawImage( this.spriteSheet, this.currImage*this.imageWidth , 0, this.imageWidth, this.imageHeight,this.x, this.y, this.imageWidth, this.imageHeight );
    this.currImage++;
    this.currImage %= this.numbImages;
  }
}
