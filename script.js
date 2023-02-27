var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.moveTo(0,0);

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

var credit = localStorage.getItem( "credit" );

if( credit == undefined ) {
localStorage.setItem( "credit", 0);
}


var state = localStorage.getItem( "state" );

if( state == undefined ) {
localStorage.setItem( "state", 0);
}

//localStorage.setItem("state",0);

canvas.addEventListener("click", function(){
  alert(state);
  newState=parseInt(state)+1;
  localStorage.setItem( "state",newState%4 );

});


window.addEventListener("resize", function(){
  //canvas size equals window size
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;

});


const dealerHand = [""];
const myHand = [""];

class Card{

  constructor(){

    this.cards = new Image();
    this.cards.src = "cards.png";
    this.cardNumberImages = 52;
    this.cardWidth =51.5;
    this.cardHeight =71.5;
    this.cardPositionX = Math.trunc(Math.random()*13)*this.cardWidth;
    this.cardPositionY = Math.trunc(Math.random()*4)*this.cardHeight;

  for(let i = 0; i < dealerHand.length; i++){

    while(this.cardPositionX == dealerHand[i].cardPositionX){

      this.cardPositionX = Math.trunc(Math.random()*13)*this.cardWidth;

    }

  }

  for(let p = 0; p < myHand.length; p++){

    while(this.cardPositionY == myHand[p].cardPositionY){

      this.cardPositionY = Math.trunc(Math.random()*4)*this.cardHeight;

    }

  }
}

  drawCard(x,y){

    ctx.drawImage( this.cards, this.cardPositionX , this.cardPositionY, this.cardWidth, this.cardHeight ,x,y, this.cardWidth, this.cardHeight );

  }

  drawBackside(x,y){

    ctx.drawImage( this.cards, this.cardWidth*15 , 0 , this.cardWidth, this.cardHeight ,x,y, this.cardWidth, this.cardHeight );

  }

  getValue(){

    if(this.cardPositionX/this.cardWidth > 0 && this.cardPositionX/this.cardWidth <10){

      return (this.cardPositionX/this.cardWidth)+1;

    }else if(this.cardPositionX/this.cardWidth > 9 && this.cardPositionX/this.cardWidth < 13){

      return 10;

    }else if(this.cardPositionX/this.cardWidth == 0){

      return 11;

    }

  }

}


var card1 = new Card();
dealerHand.push(card1);

var card2 = new Card();
dealerHand.push(card2);

var card3 = new Card();
myHand.push(card3);

var card4 = new Card();
myHand.push(card4);

var card5 = new Card();
var card6 = new Card();
var card7 = new Card();
var card8 = new Card();
var card9 = new Card();
var card10 = new Card();


setInterval( loop, 33 );


function loop() {

  clearBackground();

  credit = localStorage.getItem("credit" );

  state = localStorage.getItem("state" );

  //console.log(state);
  checkState();

}


function clearBackground() {
  ctx.fillStyle = "#38761d";
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
  var rectWidth = window.innerWidth/5;
  var rectHeight = 0.5*window.innerWidth/5;

  ctx.fillStyle ="black";
  ctx.font = "30px Arial";
  var creditText="Credits: "+credit;

  ctx.fillText(creditText, window.innerWidth/2-(ctx.measureText(creditText).width)/2, 5.5*window.innerHeight/6);

  ctx.fillStyle = "#ead1dc";
  ctx.fillRect(2*window.innerWidth/4-rectWidth/2, 1*window.innerHeight/6-rectHeight/2,rectWidth,rectHeight);

  ctx.fillRect(2*window.innerWidth/4-rectWidth/2, 2.5*window.innerHeight/6-rectHeight/2,rectWidth,rectHeight);

  ctx.fillRect(2*window.innerWidth/4-rectWidth/2, 4*window.innerHeight/6-rectHeight/2,rectWidth,rectHeight);


}


function stateOne(){
    var buttonWidth =  window.innerWidth/5;
    var buttonHeight = 0.5*window.innerWidth/5;

    ctx.fillStyle = "#ead1dc";
    ctx.fillRect(1*window.innerWidth/4-buttonWidth/2,2* window.innerHeight/4-buttonHeight/2,buttonWidth,buttonHeight);
    ctx.fillRect(3*window.innerWidth/4-buttonWidth/2, 2* window.innerHeight/4-buttonHeight/2,buttonWidth,buttonHeight);
    //ctx.fillRect(2*window.innerWidth/4-buttonWidth/2,1* window.innerHeight/4-buttonHeight/2,buttonWidth,buttonHeight);
    //ctx.fillRect(2*window.innerWidth/4-buttonWidth/2, 3* window.innerHeight/4-buttonHeight/2,buttonWidth,buttonHeight);

    card1.drawBackside(window.innerWidth/2-card1.cardWidth, window.innerHeight/4);
    card2.drawCard(window.innerWidth/2, window.innerHeight/4);

    card3.drawCard(window.innerWidth/2-card1.cardWidth, 3*window.innerHeight/4);
    card4.drawCard(window.innerWidth/2, 3*window.innerHeight/4);

    var dealerTotal =tallyCards(dealerHand);
    var myTotal =tallyCards(myHand);

    ctx.fillStyle ="black";
    ctx.font = "30px Arial";

    ctx.fillText("Count: " + dealerTotal, window.innerWidth/2-(ctx.measureText("Count: " + dealerTotal).width)/2, window.innerHeight/6);
    ctx.fillText("Count: " + myTotal, window.innerWidth/2-(ctx.measureText("Count: " + myTotal).width)/2, 4*window.innerHeight/6);

    var creditText="Credits: "+credit;
    ctx.fillText(creditText, window.innerWidth/2-(ctx.measureText(creditText).width)/2, 5.5*window.innerHeight/6);

}


function stateTwo(){
  ctx.fillStyle ="black";
  ctx.font = "30px Arial";
  var creditText="Credits: "+credit;

  ctx.fillText(creditText, window.innerWidth/2-(ctx.measureText(creditText).width)/2, 5.5*window.innerHeight/6);

  localStorage.setItem("credit", 100);

}


function stateThree(){
  ctx.fillStyle ="black";
  ctx.font = "30px Arial";
  var creditText="Credits: "+credit;

  ctx.fillText(creditText, window.innerWidth/2-(ctx.measureText(creditText).width)/2, 5.5*window.innerHeight/6);
}


/*
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
*/


function tallyCards(hand){

  var value = 0;

  for(let j = 1; j < hand.length; j++){

    value += hand[j].getValue();

  }

  return value;

}
