var path;
var pathIMG;

var guy;
var guy_running;

var coin, coinIMG;
var coinCount = 0;

var gameState = "info";

var coinCount_lost = 0;

var edges;

var x = 3;

var bomb, bombIMG; 

var lifeGiver, lifeGiver_Img, lives = 3;

function preload(){
  pathIMG = loadImage ("path.png");
  guy_running = loadAnimation ("Runner-1.png", "Runner-2.png");

  coinIMG = loadImage ("coin.png");

  bombIMG = loadImage ("bomb.png");

  lifeGiver_Img = loadImage ("energyDrink.png");
}

function setup(){
  createCanvas(400,400);
  
  path = createSprite (250, 200);
  path.addImage (pathIMG);
  console.log (path.height + " " + path.width);
  
  console.log (path.width);

  guy = createSprite (200, 300);
  guy.addAnimation ("guyRunning", guy_running);
  guy.scale = 0.06;

  coin = createSprite (200, 0);
  coin.addImage (coinIMG);
  coin.scale = 0.4
  
  lifeGiver = createSprite (200, -100);
  lifeGiver.addImage (lifeGiver_Img);
  lifeGiver.scale = 0.09;

  bomb = createSprite (200, -200);
  bomb.addImage (bombIMG);
  bomb.scale = 0.085;

  edges = createEdgeSprites ();
}

function draw() {
  background("white");

  fill ("blue");

  stroke ("red");
  strokeWeight (2);

  textSize (12);

  if (gameState == "info") {
    pathCoinGuy_Invisible ();
    textSize (20);

    text ("Get as many coins as possible!", 10, 200);
    text ("If you lose 3 coins", 10, 230);
    text ("or out of lives, then its game over!", 10, 260);
    text ("There's no limit to time", 10, 290);
    text ("or the no. of coins you can collect!", 10, 320);
    text ("Press 'Space' to proceed", 10, 350);

    textSize (12);
    text ("Press 'up Arrow' to end the game when playing", 10, 380);

    if (keyDown ('space')) {
      gameState = "inProgress";
    }

  } else if (gameState == "inProgress") {
    text ("coins: " + coinCount, 1, 15);
    text ("coins lost: " + coinCount_lost, 1, 30);
    text ("Lives: " + lives, 1, 45);


    pathCoinGuy_Visible ();

    guy.x = World.mouseX;

    if (guy.x < 150 || guy.x > 350) {
      if (guy.x < 150) {
        guy.x = 150;
      } else if (guy.x > 350) {
        guy.x = 350;
      }
    }

    if (path.y > 299){
      path.y = path.height / 5.007;
    }

    if (coin.isTouching (guy))  {
      coinCount ++;

      coin.x = Math.round (random (135, 365));
      coin.y = 0;

      x = x + 2;

      if (x > 25) {
        x = 25;
      }
    }

    if (lifeGiver.isTouching (guy)) {
      if (lives > 0 && lives !== 3) {
        lives ++;
      }

      lifeGiver.x = Math.round (random (135, 365));
      lifeGiver.y = -100;
    }

    if (coin.isTouching (edges [3])) {

      coinCount_lost ++;

      if (coinCount_lost === 3) {
        gameState = "over";
      }

      coin.x = Math.round (random (135, 365));
      coin.y = 0;
    } else if (lifeGiver.isTouching (edges [3])) {
      lifeGiver.x = Math.round (random (135, 365));
      lifeGiver.y = -100;
    } else if (bomb.isTouching (edges [3])) {
      bomb.x = Math.round (random (135, 365));
      bomb.y = -200;
    }

    if (bomb.isTouching (guy)) {

      if (coinCount_lost !== 3) {
        lives = lives - 1

        if (lives === 0) {
          gameState = "over";
        }
      }
      
      bomb.x = Math.round (random (135, 365));
      bomb.y = -200;
    }

    if (keyDown ("up_arrow")) {
      pathCoinGuy_Invisible ();
  
      gameState = "fullEnd";
    } 

  } else if (gameState == "over") {
    pathCoinGuy_Invisible ();

    textSize (20);

    text ("Game Over!", 185, 50);
    if (coinCount > 150 || coinCount < 150) {
       if (coinCount > 150) {
          text ("coins lost: " + coinCount_lost, 25, 170)
          text ("Lives: " + lives, 25, 200);
          text ("Final Score:" + coinCount + "  Ha! You're too good!", 25, 230); 
      } else {
        text ("coins lost: " + coinCount_lost, 25, 170)
        text ("Lives: " + lives, 25, 200);
        text ("Final Score:" + coinCount, 25, 230);
      }
    }
    text ("press 'space' to restart the game", 25, 260);
    text ("press 'down arrow' to end the game", 25, 290);

    if (keyDown ('space')) {
      coin.x = Math.round (random (135, 365));
      coin.y = 0;

      lifeGiver.x = Math.round (random (135, 365));
      lifeGiver.y = -100

      bomb.x = Math.round (random (135, 365));
      bomb.y = -200;

      console.log (`${lifeGiver.y} lifegiver`);
      console.log (`${bomb.y} bomb`);

      coinCount = 0;
      coinCount_lost = 0;
      lives = 3

      gameState = "inProgress";
  
    } else if (keyDown ('down_arrow')) {
      gameState = "fullEnd";
    }
   
  } else {
    textSize (20);

    text ("The game has fully ended.", 100, 200);
    text ("Thanks for playing!!", 100, 230);
  }
  drawSprites ();
}

function pathCoinGuy_Visible () {
  guy.visible = true;

  if (x == 0) {
    x = 3;
  }

  path.visible = true;
  path.velocityY = x;

  coin.visible = true;
  coin.velocityY = x;

  lifeGiver.visible = true;
  lifeGiver.velocityY = x;

  bomb.vivsible = true;
  bomb.velocityY = x;
}

function pathCoinGuy_Invisible () {
  x = 0;

  guy.visible = false;

  path.visible = false;
  path.velocityY = x;

  coin.visible = false;
  coin.velocityY = x;

  lifeGiver.visible = false;
  lifeGiver.velocityY = x;

  bomb.visible = false;
  bomb.velocityY = x;
}