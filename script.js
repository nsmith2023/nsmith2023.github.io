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
  var minBet=5;
  var bet=minBet;

  var blackjackState=0;


  if(window.innerWidth > window.innerHeight){
    buttonWidth =  window.innerWidth/5;
    buttonHeight = 0.5*window.innerWidth/5;
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

      if(event.clientX > 1*window.innerWidth/4-buttonWidth/2 && event.clientX < 1*window.innerWidth/4+buttonWidth/2 && event.clientY > 2* window.innerHeight/4-buttonHeight/2 && event.clientY < 2* window.innerHeight/4+buttonHeight/2 && tallyCards(myHand)<=21 && blackjackState%2==0 && credit >= minBet){

        myHand.push(unassigned[unassignedcount % unassigned.length]);
        unassignedcount++;

      }else if(event.clientX > 3*window.innerWidth/4-buttonWidth/2 && event.clientX < 3*window.innerWidth/4+buttonWidth/2 && event.clientY > 2* window.innerHeight/4-buttonHeight/2 && event.clientY < 2* window.innerHeight/4+buttonHeight/2 && credit >= minBet ){


        if(blackjackState%2==1){
          for(let i = 0; i < allCards.length; i++){

            allCards[i].resetCard(i);

            }

            myHand.splice(2);
            dealerHand.splice(2);

            //localStorage.setItem("credit", parseInt(credit)-minBet);
          }

          if(blackjackState%2==0){
            dealerMove(tallyCards(dealerHand));

            if(tallyCards(myHand) > tallyCards(dealerHand) && tallyCards(myHand) <= 21 && tallyCards(dealerHand) <= 21 ){

              localStorage.setItem("credit", parseInt(credit)+2*bet);

            } else if(tallyCards(myHand) < tallyCards(dealerHand) && tallyCards(myHand) <= 21 && tallyCards(dealerHand) <= 21 ){

                localStorage.setItem("credit", parseInt(credit)-bet);

            }else if(tallyCards(myHand) > 21 && tallyCards(dealerHand) <= 21){
              localStorage.setItem("credit", parseInt(credit)-bet);

            }else if(tallyCards(myHand) <= 21 && tallyCards(dealerHand) > 21){
              localStorage.setItem("credit", parseInt(credit)+2*bet);

            }else if(tallyCards(myHand) == tallyCards(dealerHand) && myHand.length < dealerHand.length){
                localStorage.setItem("credit", parseInt(credit)+2*bet);

            }else if(tallyCards(myHand) == tallyCards(dealerHand) && dealerHand.length < myHand.length){
              localStorage.setItem("credit", parseInt(credit)-bet);

            }else if(tallyCards(myHand) == tallyCards(dealerHand)){

            }



          }



          blackjackState++;


        }

      }

    else if(state==2){

      localStorage.setItem("state", 0);
    }

    else if(state==3){

      localStorage.setItem("state", 0);
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

    resetCard(index){

      for(let i = 0; i < allCards.length; i++){

        //alert(index);
        this.cardPositionX = Math.trunc(Math.random()*13)*this.cardWidth;
        this.cardPositionY = Math.trunc(Math.random()*4)*this.cardHeight;

        if(index != i){
         while(this.cardPositionX == allCards[i].cardPositionX && this.cardPositionY==allCards[i].cardPositionY){

            this.cardPositionX = Math.trunc(Math.random()*13)*this.cardWidth;
            this.cardPositionY = Math.trunc(Math.random()*4)*this.cardHeight;

          }
        }
      }

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

    homeCard.drawCard(window.innerWidth/2-homeCard.cardWidth/2, 1*window.innerHeight/6-homeCard.cardHeight/2);
    if(frames%10==0){
      homeCard.resetCard();
    }

    ctx.fillRect(2*window.innerWidth/4-buttonWidth/2, 2.5*window.innerHeight/6-buttonHeight/2,buttonWidth,buttonHeight);

    ctx.fillRect(2*window.innerWidth/4-buttonWidth/2, 4*window.innerHeight/6-buttonHeight/2,buttonWidth,buttonHeight);


  }


  function stateOne(){

      ctx.fillStyle = "#ead1dc";
      ctx.fillRect(1*window.innerWidth/4-buttonWidth/2,2* window.innerHeight/4-buttonHeight/2,buttonWidth,buttonHeight);
      ctx.fillRect(3*window.innerWidth/4-buttonWidth/2, 2* window.innerHeight/4-buttonHeight/2,buttonWidth,buttonHeight);

      ctx.drawImage(blackjackTitle,window.innerWidth/2-225,window.innerHeight/10-100,450,250);


      //var dealerTotal =0;
      //var myTotal =0;

  //draw dealer cards

      for(let i = 0; i < dealerHand.length; i++){

        if(i==0){
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


      var dealerTotal =tallyCards(dealerHand);
      var myTotal =tallyCards(myHand);

      ctx.fillStyle ="black";
      ctx.font = "30px Arial";

      ctx.fillText("Count: " + dealerTotal, window.innerWidth/2-(ctx.measureText("Count: " + dealerTotal).width)/2, 3*window.innerHeight/6);
      ctx.fillText("Count: " + myTotal, window.innerWidth/2-(ctx.measureText("Count: " + myTotal).width)/2, 4.25*window.innerHeight/6);

      if(blackjackState%2==1){



      }else if(blackjackState%2==0){

      }



  }


  function stateTwo(){

    localStorage.setItem("credit", 100);

  }


  function stateThree(){


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

    if(dealerTotal<16 && dealerHand.length<6){

      dealerHand.push(unassigned[unassignedcount % unassigned.length]);
      unassignedcount ++;

    }
  }
