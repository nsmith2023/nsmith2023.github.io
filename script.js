var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.moveTo(0,0);

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

var blackjackBackgroud = new Image();
blackjackBackgroud.src= "blackjackBackground.jpg";

var blackjackTitle = new Image();
blackjackTitle.src= "blackjackTitle.png";


var credit = localStorage.getItem( "credit" );

if( credit == undefined ) {
localStorage.setItem( "credit", 0);
}


var state = localStorage.getItem( "state" );

if( state == undefined ) {
localStorage.setItem( "state", 0);
}



canvas.addEventListener("click", function(){

  if(state==1){
    myHand.push(unassigned[1]);
    unassigned.splice(0,1);
  }

});

canvas.addEventListener("dblclick", function(){

  alert(state);
  newState=parseInt(state)+1;
  localStorage.setItem( "state",newState%4 );

});



window.addEventListener("resize", function(){
  //canvas size equals window size
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;

});




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

    ctx.drawImage( this.cards, this.cardPositionX , this.cardPositionY, this.cardWidth, this.cardHeight ,x,y, 1.5*this.cardWidth, 1.5*this.cardHeight );

  }

  drawBackside(x,y){

    ctx.drawImage( this.cards, this.cardWidth*15 , 0 , this.cardWidth, this.cardHeight ,x,y, 1.5*this.cardWidth, 1.5*this.cardHeight );

  }

  getValue(){

    if(this.cardPositionX/this.cardWidth > 0 && this.cardPositionX/this.cardWidth <10){

      return (this.cardPositionX/this.cardWidth)+1;

    }else if(this.cardPositionX/this.cardWidth > 9 && this.cardPositionX/this.cardWidth < 13){

      return 10;

    }else if(this.cardPositionX/this.cardWidth == 0){

      return 0;

    }

  }

  isAce(){

    if(this.cardPositionX/this.cardWidth < 1){

      //alert(true);
      return true;


    }else{

      return false;

    }

  }

}

const dealerHand = [""];
const myHand = [""];
const unassigned=[""];

var card1 = new Card();
dealerHand[0]=card1;

var card2 = new Card();
dealerHand[1]=card2;

var card3 = new Card();
myHand[0]=card3;

var card4 = new Card();
myHand[1]=card4;

var card5 = new Card();
unassigned[0]=card5 ;

var card6 = new Card();
unassigned.push(card6);

var card7 = new Card();
unassigned.push(card7);

var card8 = new Card();
unassigned.push(card8);

var card9 = new Card();
unassigned.push(card9);

var card10 = new Card();
unassigned.push(card10);



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

  //ctx.drawImage(blackjackBackgroud,0,0,window.innerWidth,window.innerHeight);

  if(state==1){
    ctx.drawImage(blackjackTitle,window.innerWidth/2-200,window.innerHeight/10-100,400,250);
  }

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

    //var dealerTotal =0;
    //var myTotal =0;

//draw dealer cards

    for(let i = 0; i < dealerHand.length; i++){

      if(i==0){
      //edit to center cards
      dealerHand[i].drawBackside(window.innerWidth/2-card1.cardWidth*1.5, window.innerHeight/4);
      //dealerHand[i].drawCard(window.innerWidth/2-card1.cardWidth*1.5, window.innerHeight/4);



      }else{
        //edit to center cards

        dealerHand[i].drawCard(window.innerWidth/2 + (i-1)*card1.cardWidth*1.5, window.innerHeight/4);

      }

        //dealerTotal+= dealerHand[i].getValue();

    }

  //loop through your cards
    for(let p = 0; p < myHand.length; p++){
      //edit to center cards
      myHand[p].drawCard(window.innerWidth/2-card1.cardWidth*1.5+(p)*card1.cardWidth*1.5, 3*window.innerHeight/4)

      //myTotal+= myHand[i].getValue();

    }


    var dealerTotal =tallyCards(dealerHand);
    var myTotal =tallyCards(myHand);

    ctx.fillStyle ="black";
    ctx.font = "30px Arial";

    ctx.fillText("Count: " + dealerTotal, window.innerWidth/2-(ctx.measureText("Count: " + dealerTotal).width)/2, 3*window.innerHeight/6);
    ctx.fillText("Count: " + myTotal, window.innerWidth/2-(ctx.measureText("Count: " + myTotal).width)/2, 4*window.innerHeight/6);

    var creditText="Credits: "+credit;
    ctx.fillText(creditText, window.innerWidth/2-(ctx.measureText(creditText).width)/2, 5.5*window.innerHeight/6);

    dealerMove(dealerTotal);


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
  var aceCount=0;
  //alert(hand);
  for(let j = 0; j < hand.length; j++ ){

    value += hand[j].getValue();

    if(hand[j].isAce() == true && hand.length <3 && aceCount == 0){
      aceCount += 1;
      value+= 11;

    }else if(hand[j].isAce() == true){
      aceCount+=1;
      value += 1;

    }

  }

  return value;

}




function dealerMove(dealerTotal){
  if(dealerTotal<16){
    dealerHand.push(unassigned[1]);
    unassigned.splice(0,1);
  }
}
