var PLAY = 0;
var END = 1;
var gameState = PLAY;
var monkey , monkey_running, monkeyFallen;
var banana ,bananaImage,bananaGroup, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score, bananaScore;
var invisibalGround;
var gameOverImg,over,overSound,fall, jumpSound, restartImg, restart;
var jungle, jungleImg;

function preload(){
  // Preloding our images and audio clips here
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  jungleImage = loadImage("jungle.jpg"); 
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  gameOverImg = loadImage("game-over-2720584_640.png")
  monkeyFallen = loadImage("monkey-309461_640-1.png")
  overSound = loadSound("salamisound-7409355-cartoon-boing.mp3");
  jumpSound = loadSound("salamisound-6941726-sfx-jump-9-game-computer.mp3");
  restartImg = loadImage("loop-button-5484820_640.png");

}

function setup() {
  createCanvas(windowWidth,windowHeight);
  score = 0;
  bananaScore = 0;
  
   // Creating Jungle
 // jungle = createSprite(300,180);
  //jungle.addImage(jungleImage);
   //jungle.scale = 0.7;
  //jungle.velocityX = -4;
  
  
  // Creating Small Sprites for 
  fall = createSprite(width/2 - 100,height/2,1,1);
  over = createSprite(width/2,height/2- 50,1,1);
  invisibalGround = createSprite(width-550,height/2+129,1200,10);
  invisibalGround.shapeColor = "Green";
  
  restart = createSprite(over.x+85,over.y+130);
  
  restart.addImage(restartImg);
  restart.scale = 0.13;
  
  // Creating Monkey
  monkey = createSprite(width-550,height/2+100,20,20);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.12;
  
  // Creating Ground
  ground = createSprite(350,350,900,10);
  ground.shapeColor = "Green";
  ground.velocityX = 4;
  ground.x = ground.width/2;
  //ground.visible= false;
  
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
}


function draw() {
  background("skyblue");
  
  textSize(20);
  stroke("yellow");
  fill("yellow");
  
  text("Survival Time - "+score,400,30);
  text("Bananas Collected - "+bananaScore,160,30);
  
 // Arranging codes in Play and End Stages 
  if(gameState === PLAY){
    
    if(keyDown("space")&& monkey.y >= 300){
    monkey.velocityY = -19;
    jumpSound.play();  
  }
  
  if(monkey.isTouching(bananaGroup)){
    bananaScore = bananaScore + 1;
    bananaGroup.destroyEach();
  }
  
  score = score + Math.round(getFrameRate()/60);
    
  monkey.velocityY = monkey.velocityY + 0.9;
    
  if(ground.x < 150){
     ground.x = ground.width/2; 
  }
     monkey.collide(invisibalGround);
    restart.visible = false;
    
    
  }
  
   if(gameState === END){
     
   restart.visible = true;  
   monkey.visible = false;
   ground.visible = false;  
   invisibalGround.visible = false;  
   fall.visible = true;
   fall.y = height/2 + 110;  
   over.visible = true;  
   //jungle.velocityX = 0; 
   bananaGroup.destroyEach();
   obstacleGroup.destroyEach();
   monkey.setVelocity(0,0);
   over.addImage(gameOverImg);  
   over.scale = 0.6;
   fall.addImage(monkeyFallen);
   fall.scale = 0.25;  
   
   textSize(22);
   stroke("red");
   fill("red");  
   text("Press above icon to restart",270,365);  
 }
   
 if(monkey.isTouching(obstacleGroup)){
   overSound.play();
   gameState = END;
 }
  
   
    //ground.visible = false;
    //invisibalGround.visible = false;
  
  
  if(mousePressedOver(restart)&& gameState === END) {
    gameState = PLAY;
    monkey.visible = true;
    fall.visible = false;
   ground.visible = true;
   invisibalGround.visible = true;
    over.visible = false;
    score = 0;
    bananaScore = 0;
    //jungle.velocityX = -3;
  }
  
  
  //if(jungle.x<240){
   //jungle.x = jungle.width/2.9;
  //}
  drawSprites(); 
  createBananas();
  spawnObstacles();
}

function createBananas(){
  if (frameCount% 80 === 0){
    var banana = createSprite(400,400,20,20);
    banana.addImage(bananaImage);
    banana.scale = 0.115;
    banana.velocityX = -(4 + bananaScore/5);
    banana.lifetime = 200;
    banana.y = Math.round(random(120,200));
    bananaGroup.add(banana);
  }
  
}

function spawnObstacles(){
  if (frameCount% 150===0){
    obstacle = createSprite(400,320,50,50);
    obstacle.velocityX = -(6 + bananaScore/7);
    obstacle.addImage("rock",obstacleImage);
    obstacle.scale = 0.14;
    obstacle.lifetime = 200;
    obstacle.setCollider("circle", 0, 0, 180);
    obstacleGroup.add(obstacle);
  }
  
}


  


