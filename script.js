var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.moveTo(0,0);
//edits
//more edits
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

var buttonWidth;
var buttonHeight;

var frames=0;
var minBet=10;
var bet=minBet;

var blackjackState=0;

var slotState=0;

var wl= "none";


if(window.innerWidth > window.innerHeight){
  buttonWidth =  window.innerWidth/5;
  buttonHeight = 0.55*window.innerWidth/5;
}else{
  buttonWidth =  1.5*window.innerWidth/5;
  buttonHeight = window.innerWidth/5;
}

var creditText;
var unassignedcount=0;

var blackjackTitle = new Image();
blackjackTitle.src= "blackjackTitle.png";

var backButton = new Image();
backButton.src= "backButton.png";

var credit = localStorage.getItem( "credit" );

if( credit == undefined ) {
localStorage.setItem( "credit", 0);
}


var state = localStorage.getItem( "state" );

if( state == undefined ) {
localStorage.setItem( "state", 0);
}



canvas.addEventListener("click", function(){

  if(state==0 && event.clientX > 2*window.innerWidth/4-buttonWidth/2 && event.clientX < 2*window.innerWidth/4+buttonWidth/2){

    if(event.clientY > 1*window.innerHeight/6-buttonHeight/2 && event.clientY < 1*window.innerHeight/6+buttonHeight/2){
      localStorage.setItem("state", 1);
    }

    else if(event.clientY > 2.5*window.innerHeight/6-buttonHeight/2 && event.clientY < 2.5*window.innerHeight/6+buttonHeight/2){
      localStorage.setItem("state", 2);
    }

    else if(event.clientY > 4*window.innerHeight/6-buttonHeight/2 && event.clientY < 4*window.innerHeight/6+buttonHeight/2){
      localStorage.setItem("state", 3);
    }

  }

  else if(state!=0 && event.clientX > 0 && event.clientX < buttonWidth/2 && event.clientY > 0 && event.clientY < buttonHeight/2 ){
    localStorage.setItem("state", 0);

  }

  else if(state==1){
    //myHand.push(unassigned[1]);
    //unassigned.splice(0,1);

    if(event.clientX > 1*window.innerWidth/4-buttonWidth/2 && event.clientX < 1*window.innerWidth/4+buttonWidth/2 && event.clientY > 2* window.innerHeight/4-buttonHeight/2 && event.clientY < 2* window.innerHeight/4+buttonHeight/2 && tallyCards(myHand)<21 && blackjackState%3==1 && credit >= minBet){

      myHand.push(unassigned[unassignedcount % unassigned.length]);
      unassignedcount++;
      console.log(unassignedcount);

    }else if(event.clientX > 3*window.innerWidth/4-buttonWidth/2 && event.clientX < 3*window.innerWidth/4+buttonWidth/2 && event.clientY > 2* window.innerHeight/4-buttonHeight/2 && event.clientY < 2* window.innerHeight/4+buttonHeight/2 && credit >= minBet ){


      if(blackjackState%3==2){

        for(let i = 0; i < allCards.length; i++){

          allCards[i].resetCard();

        }

        for(let q = 0; q < allCards.length; q++){

          for(let c = 0; c < allCards.length; c++){

            if(c!=q){
                while( allCards[q].cardPositionX==allCards[c].cardPositionX && allCards[q].cardPositionY==allCards[c].cardPositionY ){
                    allCards[q].resetCard();
                }


            }



          }



        }

          myHand.splice(2);
          dealerHand.splice(2);

          //localStorage.setItem("credit", parseInt(credit)-minBet);
        }


        else if(blackjackState%3==1){

          //alert(blackjackState);


          dealerMove(tallyCards(dealerHand));
          dealerMove(tallyCards(dealerHand));
          dealerMove(tallyCards(dealerHand));
          dealerMove(tallyCards(dealerHand));
          dealerMove(tallyCards(dealerHand));
          dealerMove(tallyCards(dealerHand));



          if(tallyCards(myHand) > tallyCards(dealerHand) && tallyCards(myHand) <= 21 && tallyCards(dealerHand) <= 21 ){

            localStorage.setItem("credit", parseInt(credit)+bet);
            wl="win";


          } else if(tallyCards(myHand) < tallyCards(dealerHand) && tallyCards(myHand) <= 21 && tallyCards(dealerHand) <= 21 ){

              localStorage.setItem("credit", parseInt(credit)-bet);
              wl="lose";


          }else if(tallyCards(myHand) > 21 && tallyCards(dealerHand) <= 21){
            localStorage.setItem("credit", parseInt(credit)-bet);
            wl="lose";

          }else if(tallyCards(myHand) <= 21 && tallyCards(dealerHand) > 21){
            localStorage.setItem("credit", parseInt(credit)+bet);
            wl="win";

          }else if(tallyCards(myHand) == tallyCards(dealerHand) && myHand.length < dealerHand.length && tallyCards(myHand) <= 21 && tallyCards(dealerHand) <= 21 ){
              localStorage.setItem("credit", parseInt(credit)+bet);
              wl="win";


          }else if(tallyCards(myHand) == tallyCards(dealerHand) && dealerHand.length < myHand.length && tallyCards(myHand) <= 21 && tallyCards(dealerHand) <= 21 ){
            localStorage.setItem("credit", parseInt(credit)-bet);
            wl="lose";


          }else if(tallyCards(myHand) == tallyCards(dealerHand)){
            wl="tie";

          }else if(tallyCards(myHand) > 21 && tallyCards(dealerHand) > 21){
              wl="tie";

          }



        }

        blackjackState++;
        console.log(blackjackState);


      }

    }

  else if(state==2){

    if(event.clientY > 2.5*window.innerHeight/6-buttonHeight/2 && event.clientY < 2.5*window.innerHeight/6+buttonHeight/2){
      localStorage.setItem("credit", parseInt(credit)+100);
    }




  }

  else if(state==3){

    if(event.clientY > 5*window.innerHeight/6-buttonHeight/2 && event.clientY < 5*window.innerHeight/6+buttonHeight/8 && event.clientX > 2*window.innerWidth/4-buttonWidth/2 && event.clientX < 2*window.innerWidth/4+buttonWidth/2){

      slotState++;
      item1.randomizeSlot();
      item2.randomizeSlot();
      item3.randomizeSlot();

      if(slotState%2==1){
        localStorage.setItem("credit", parseInt(credit)-bet);
      }



    }


  }

});

/*
canvas.addEventListener("dblclick", function(){

  alert(state);
  newState=parseInt(state)+1;
  localStorage.setItem( "state",newState%4 );

});
*/


window.addEventListener("resize", function(){
  //canvas size equals window size
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;

  if(window.innerWidth > window.innerHeight){
    buttonWidth =  window.innerWidth/5;
    buttonHeight = 0.5*window.innerWidth/5;
  }else{
    buttonWidth =  window.innerWidth/5;
    buttonHeight = window.innerWidth/5;
  }

});



class Card{

  constructor(){

    this.cards = new Image();
    this.cards.src = "cards.png";
    this.cardNumberImages = 52;
    this.cardWidth =51.5;
    this.cardHeight =71.75;
    this.cardPositionX = Math.trunc(Math.random()*13)*this.cardWidth;
    this.cardPositionY = Math.trunc(Math.random()*4)*this.cardHeight;

    if(window.innerWidth > window.innerHeight){
      this.displayCardWidth = 1.5*this.cardWidth;
    }else{
      this.displayCardWidth= 2*this.cardWidth;
    }

  for(let i = 0; i < allCards.length; i++){

    while(this.cardPositionX == allCards[i].cardPositionX && this.cardPositionY==allCards[i].cardPositionY){

      this.cardPositionX = Math.trunc(Math.random()*13)*this.cardWidth;
      this.cardPositionY = Math.trunc(Math.random()*4)*this.cardHeight;

    }

  }

}

  drawCard(x,y){

    if(window.innerWidth > window.innerHeight){
      ctx.drawImage( this.cards, this.cardPositionX , this.cardPositionY, this.cardWidth, this.cardHeight ,x,y, 1.5*this.cardWidth, 1.5*this.cardHeight );

    }else{
      ctx.drawImage( this.cards, this.cardPositionX , this.cardPositionY, this.cardWidth, this.cardHeight ,x,y, 2*this.cardWidth, 2*this.cardHeight );

    }
  }

  drawBackside(x,y){
    if(window.innerWidth > window.innerHeight){
      ctx.drawImage( this.cards, this.cardWidth*15 , 0 , this.cardWidth, this.cardHeight ,x,y, 1.5*this.cardWidth, 1.5*this.cardHeight );

    }else{
      ctx.drawImage( this.cards, this.cardWidth*15 , 0 , this.cardWidth, this.cardHeight ,x,y, 2*this.cardWidth, 2*this.cardHeight );

    }
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

  resetCard(){

      this.cardPositionX = Math.trunc(Math.random()*13)*this.cardWidth;
      this.cardPositionY = Math.trunc(Math.random()*4)*this.cardHeight;


    }



}

const dealerHand = [""];
const myHand = [""];
const unassigned=[""];
const allCards = [""];

//should have done a loop but I didnt :)
var card1 = new Card();
dealerHand[0]=card1;
allCards[0]=card1;

var card2 = new Card();
dealerHand[1]=card2;
allCards.push(card2);

var card3 = new Card();
myHand[0]=card3;
allCards.push(card3);

var card4 = new Card();
myHand[1]=card4;
allCards.push(card4);

var card5 = new Card();
unassigned[0]=card5;
allCards.push(card5);

var card6 = new Card();
unassigned.push(card6);
allCards.push(card6);

var card7 = new Card();
unassigned.push(card7);
allCards.push(card7);

var card8 = new Card();
unassigned.push(card8);
allCards.push(card8);

var card9 = new Card();
unassigned.push(card9);
allCards.push(card9);

var card10 = new Card();
unassigned.push(card10);
allCards.push(card10);

var homeCard = new Card();


class slotItem {

  constructor(slotWheel){
    this.slots = new Image();
    this.slots.src= "slotsSprite.png";
    this.slotNumberImages = 8;
    this.slotWidth =110;
    this.slotHeight= 139;
    this.randomValue = Math.trunc(Math.random()*40);
    this.slotPositionX= Math.trunc(Math.random()*8);
    this.slotWheel=slotWheel;

    if(window.innerWidth > window.innerHeight){
      this.displaySlotWidth = 1.5*this.slotWidth;
    }else{
      this.displayCardWidth= 2*this.slotWidth;
    }


  }

  drawSlot(x,y){
    var multiplier;
    if(window.innerWidth > window.innerHeight){
      multiplier=1.5;

    }else{
      multiplier=2;

    }

      console.log(this.slotPositionX);
      console.log(this.randomValue);
      ctx.drawImage( this.slots, this.slotPositionX*this.slotWidth , 0, this.slotWidth, this.slotHeight ,x,y, multiplier*this.slotWidth, multiplier*this.slotHeight );

  }

  randomizeSlot(){
    this.randomValue = Math.trunc(Math.random()*40);
    //this.slotPositionX=5;




    if(this.slotWheel==1){

      if(this.randomValue<9){
        this.slotPositionX=1;

      }else if(this.randomValue == 9){
        this.slotPositionX=2;

      }else if(this.randomValue == 10){
        this.slotPositionX=4;

      }else if(this.randomValue == 11){
        this.slotPositionX=0;

      }else if(this.randomValue<38){
          this.slotPositionX=5;

      }else if(this.randomValue==38){
        this.slotPositionX=6;
      }else if(this.randomValue==39){
        this.slotPositionX=7;
      }





    }else if(this.slotWheel==2){

      if(this.randomValue==0){
        this.slotPositionX=1;

      }else if(this.randomValue <16){
        this.slotPositionX=2;

      }else if(this.randomValue == 16){
        this.slotPositionX=4;

      }else if(this.randomValue < 37){
        this.slotPositionX=0;


      }else if(this.randomValue==37){
          this.slotPositionX=5;

      }else if(this.randomValue==38){
        this.slotPositionX=6;
      }else if(this.randomValue==39){
        this.slotPositionX=7;
      }






    }else if(this.slotWheel==3){

      if(this.randomValue < 3){
        this.slotPositionX=1;

      }else if(this.randomValue <13){
        this.slotPositionX=2;

      }else if(this.randomValue <27){
        this.slotPositionX=4;

      }else if(this.randomValue <37){
        this.slotPositionX=0;

      }else if(this.randomValue==37){
          this.slotPositionX=5;

      }else if(this.randomValue==38){
        this.slotPositionX=6;
      }else if(this.randomValue==39){
        this.slotPositionX=7;
      }



    }else if(this.slotWheel==4){
      this.slotPositionX= Math.trunc(Math.random()*8);

    }





  }

  getValue(){



  }




}

var item1 = new slotItem(1);

var item2 = new slotItem(2);

var item3 = new slotItem(3);

var demoItem = new slotItem(4);


class Coin {

  constructor(){
    this.coin=new Image();
    this.coin.src = "coin.png";
    this.numbImages=6;
    this.imageWidth=85;
    this.imageHeight=150;
    this.currImage = 0;

  }


  draw(x,y){

    ctx.drawImage( this.coin, this.currImage*this.imageWidth , 0, this.imageWidth, this.imageHeight,x, y, this.imageWidth, this.imageHeight );
    this.currImage++;
    this.currImage %= this.numbImages;
  }
}

var coin = new Coin();



setInterval( loop, 33 );


function loop() {
  frames++;
  clearBackground();

  credit = localStorage.getItem("credit" );

  state = localStorage.getItem("state" );

  ctx.fillStyle ="black";
  ctx.font = "30px Arial";
  creditText="Credits: "+credit;
  ctx.fillText(creditText, window.innerWidth/2-(ctx.measureText(creditText).width)/2, 5.75*window.innerHeight/6);

  //console.log(state);
  checkState();

}


function clearBackground() {
  ctx.fillStyle = "#38761d";
  ctx.fillRect( 0, 0, canvas.width, canvas.height);

  if(state !=0){

    ctx.fillStyle = "#ead1dc";
    //ctx.fillRect(0,0,buttonWidth/2,buttonHeight/2);
    ctx.drawImage(backButton,0,0,buttonWidth/2,buttonHeight/2);
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


  ctx.fillStyle = "#ead1dc";
  ctx.fillRect(2*window.innerWidth/4-buttonWidth/2, 1*window.innerHeight/6-buttonHeight/2,buttonWidth,buttonHeight);
  ctx.fillRect(2*window.innerWidth/4-buttonWidth/2, 2.5*window.innerHeight/6-buttonHeight/2,buttonWidth,buttonHeight);
  ctx.fillRect(2*window.innerWidth/4-buttonWidth/2, 4*window.innerHeight/6-buttonHeight/2,buttonWidth,buttonHeight);

  homeCard.drawCard(window.innerWidth/2-homeCard.cardWidth/2, 1*window.innerHeight/6-9*homeCard.cardHeight/16);
  demoItem.drawSlot(window.innerWidth/2-9*item1.slotWidth/16, 3.5*window.innerHeight/6-9*homeCard.cardHeight/16);
  coin.draw(2*window.innerWidth/4-coin.imageWidth/2, 2.75*window.innerHeight/6-coin.imageHeight/2);
  ctx.fillStyle = "#ead1dc";

  if(frames%10==0){
    homeCard.resetCard();
    demoItem.randomizeSlot();
  }


/*
  for(let p = 0; p < allCards.length; p++){
    //edit to center cards
    allCards[p].drawCard(window.innerWidth/2+ (p-(allCards.length / 2))*card1.displayCardWidth, 3*window.innerHeight/4);

    //myTotal+= myHand[i].getValue();

  }
  */




}


function stateOne(){

    ctx.fillStyle = "#ead1dc";
    ctx.fillRect(1*window.innerWidth/4-buttonWidth/2,2* window.innerHeight/4-buttonHeight/2,buttonWidth,buttonHeight);
    ctx.fillRect(3*window.innerWidth/4-buttonWidth/2, 2* window.innerHeight/4-buttonHeight/2,buttonWidth,buttonHeight);

    ctx.drawImage(blackjackTitle,window.innerWidth/2-225,window.innerHeight/10-100,450,250);

    ctx.fillStyle = "black";
    ctx.fillText("Hit", 1*window.innerWidth/4-(ctx.measureText("Hit").width)/2,2* window.innerHeight/4);



    //var dealerTotal =0;
    //var myTotal =0;

//draw dealer cards

if(blackjackState%3 == 1 || blackjackState%3 == 2){

    for(let i = 0; i < dealerHand.length; i++){

      if(i==0 && blackjackState%3 ==1){
      //edit to center cards
      dealerHand[i].drawBackside(window.innerWidth/2 + (i-(dealerHand.length / 2))*card1.displayCardWidth, window.innerHeight/4);
      //dealerHand[i].drawCard(window.innerWidth/2-card1.cardWidth*1.5, window.innerHeight/4);


      }else{
        //edit to center cards

        dealerHand[i].drawCard(window.innerWidth/2 + (i-(dealerHand.length / 2))*card1.displayCardWidth, window.innerHeight/4);

      }

        //dealerTotal+= dealerHand[i].getValue();

    }

  //loop through your cards
    for(let p = 0; p < myHand.length; p++){
      //edit to center cards
      myHand[p].drawCard(window.innerWidth/2+ (p-(myHand.length / 2))*card1.displayCardWidth, 3*window.innerHeight/4);

      //myTotal+= myHand[i].getValue();

    }
}

    var dealerTotal =tallyCards(dealerHand);
    var myTotal =tallyCards(myHand);

    ctx.fillStyle ="black";
    ctx.font = "30px Arial";

    //ctx.fillText("Count: " + dealerTotal, window.innerWidth/2-(ctx.measureText("Count: " + dealerTotal).width)/2, 3*window.innerHeight/6);



if(blackjackState%3==0){
  ctx.fillText("Start Game", 3*window.innerWidth/4-(ctx.measureText("Start Game").width)/2,2* window.innerHeight/4);

  for(let y = 0; y < dealerHand.length; y++){

    if(y==0){
    //edit to center cards
    dealerHand[y].drawBackside(window.innerWidth/2 + (y-(dealerHand.length / 2))*card1.displayCardWidth, window.innerHeight/4);

    }else{
      //edit to center cards

      dealerHand[y].drawBackside(window.innerWidth/2 + (y-(dealerHand.length / 2))*card1.displayCardWidth, window.innerHeight/4);

    }

  }

//loop through your cards
  for(let z = 0; z < myHand.length; z++){
    //edit to center cards
    myHand[z].drawBackside(window.innerWidth/2+ (z-(myHand.length / 2))*card1.displayCardWidth, 3*window.innerHeight/4);



  }
//alert(wl);

}

    else if(blackjackState%3==1){
      wl="none";

      ctx.fillText("End Turn", 3*window.innerWidth/4-(ctx.measureText("End Turn").width)/2,2* window.innerHeight/4);
      ctx.fillText("Count: " + myTotal, window.innerWidth/2-(ctx.measureText("Count: " + myTotal).width)/2, 4.25*window.innerHeight/6);


    }else if(blackjackState%3==2){

      ctx.fillText("Play Again", 3*window.innerWidth/4-(ctx.measureText("Play Again").width)/2,2* window.innerHeight/4);
      ctx.fillText("Count: " + myTotal, window.innerWidth/2-(ctx.measureText("Count: " + myTotal).width)/2, 4.25*window.innerHeight/6);



        if(wl=="win"){

          ctx.fillText("You Win", window.innerWidth/2-(ctx.measureText("You Win").width)/2, window.innerHeight/2);

        }else if(wl=="lose"){
          ctx.fillText("You Lose", window.innerWidth/2-(ctx.measureText("You Lose").width)/2, window.innerHeight/2);

        }else if(wl=="tie"){
          ctx.fillText("Tie", window.innerWidth/2-(ctx.measureText("Tie").width)/2, window.innerHeight/2);
        }




    }
  }






function stateTwo(){


    ctx.fillStyle = "#ead1dc";
    ctx.fillRect(2*window.innerWidth/4-buttonWidth/2, 2.5*window.innerHeight/6-buttonHeight/2,buttonWidth,buttonHeight);

    ctx.fillStyle ="black";
    ctx.fillText("Click for +100", window.innerWidth/2-(ctx.measureText("Click for +100").width)/2, 2.5*window.innerHeight/6);


}


function stateThree(){


  ctx.fillStyle = "#ead1dc";
  ctx.fillRect(2*window.innerWidth/4-buttonWidth/2, 5*window.innerHeight/6-buttonHeight/2,buttonWidth,buttonHeight/2);
  ctx.fillRect(0, 2.5*window.innerHeight/6-buttonHeight/2,window.innerWidth,1.5*buttonHeight);

  ctx.fillStyle ="black";
  ctx.fillText("Press", window.innerWidth/2-(ctx.measureText("Press").width)/2, 4.75*window.innerHeight/6);


  if(slotState%2==0 && frames%7==0){
    item1.randomizeSlot();
    item2.randomizeSlot();
    item3.randomizeSlot();
  }


  item1.drawSlot(1*window.innerWidth/4-item1.slotWidth/2,window.innerHeight/3);
  item2.drawSlot(2*window.innerWidth/4-item1.slotWidth/2,window.innerHeight/3);
  item3.drawSlot(3*window.innerWidth/4-item1.slotWidth/2,window.innerHeight/3);






}





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

function tallySlots(){

  var value = 0;




}



function dealerMove(dealerTotal){

  if(dealerTotal<16 && dealerHand.length<6){

    dealerHand.push(unassigned[unassignedcount % unassigned.length]);
    unassignedcount ++;

    return true;

  }

  return false;
}
