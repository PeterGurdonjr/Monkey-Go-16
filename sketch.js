
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var survivalTime=0;
var gameState;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400);
     
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2
  console.log(ground.x);
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
  score=0;
}


function draw() {
  background("skyblue");
  
  stroke("black");
  textSize(20);
  fill("white");
  text("Score:" + score, 500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time:"+ survivalTime,100,50);
  
  if(keyDown("space")){
        monkey.velocityY = -12;
    }
   
    monkey.velocityY = monkey.velocityY + 0.8
    monkey.collide(ground);
    
    if (ground.x<200){ 
      ground.x=width/2;
      ground.velocityX=-4;
  }
  food();
  Obstacle();
  
  if(obstacleGroup.isTouching(monkey)){
    ground.velocityX = 0;
    monkey.velocityX = 0;
    
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0); 
    
    obstacleGroup.setLifetimeEach(-1); 
    FoodGroup.setLifetimeEach(-1);
  }
  
  drawSprites();
  
}


function food() {

  if(frameCount %80 === 0){
    banana = createSprite(600,250,40,10);
    banana.y =random(120,200);
    banana.velocityX = -5;
    banana.lifeTime = 300;
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    FoodGroup.add(banana);
  }
}

function Obstacle() {
  
  if(frameCount %300 === 0){
    obstacle = createSprite(600,310,40,10);
    obstacle.velocityX = -5;
    obstacle.lifeTime = 300;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacleGroup.add(obstacle);
  }  
}


