var trex, trex_running, trex_collided;

var ground, invisibleGround, groundImage;

var cloud, cldgrp, cloudImage,cacgrp;

var cactus,c1,c2,c3,c4,c5,c6,score=0,highscore=0;

var play=12,end=13,gameState=play;

var gameover,gameoverimg,restart,restartimg;

var soundjump,soundtouch,soundscore;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  c1=loadImage("obstacle1.png");
   c2=loadImage("obstacle2.png");
   c3=loadImage("obstacle3.png");
   c4=loadImage("obstacle4.png");
   c5=loadImage("obstacle5.png");
   c6=loadImage("obstacle6.png");
 gameoverimg=loadImage("gameOver.png");
  restartimg=loadImage("restart.png");
  
  soundjump=loadSound("jump.mp3");
  soundtouch=loadSound("die.mp3");
  soundscore=loadSound("checkPoint.mp3");
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  trex = createSprite(50,height-40,20,50);
  trex.addAnimation("running", trex_running);
   trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(width/2,height-20,width,20);
  ground.addImage("ground",groundImage);
  ground.velocityX = -(4+score/300);
  
  invisibleGround = createSprite(width/2,height-10,width,10);
  invisibleGround.visible = false;
  
  cldgrp=new Group();
  cacgrp=new Group();
  
  trex.setCollider("rectangle",0,0,100,trex.height);
  trex.debug=false;

  gameover=createSprite(width/2,height/2,30,30);
  gameover.addImage(gameoverimg);
  gameover.scale=0.5;
  gameover.visible=false;
  restart=createSprite(width/2,height/2,30,30);
  restart.addImage(restartimg);
  restart.scale=0.5;
 restart.visible=false;

}

function draw() {
  background(180);
  fill("black");
  text("Score : "+score,500,20);
  text("High Score : "+highscore,400,20);
 
  
  if(gameState===play){
     score=score+Math.round(getFrameRate()/60);
   
    
      if((touches.length>0 || keyDown("space")) && trex.y>=height-40) {
    trex.velocityY = -15;
        
        soundjump.play();
        touches=[];
  }
     trex.velocityY = trex.velocityY + 0.8
   if (ground.x < 0){
    ground.x = ground.width/2;
  }
     spawnClouds();
  spawnCactus();
  if(trex.isTouching(cacgrp)){
     gameState=end;
   // trex.velocityY=-10;
    soundtouch.play();
  }
    if(score>0 && score%100===0){
      soundscore.play();
    }
  
  }
  else if(gameState===end){
    
    trex.velocityY=0;
    trex.changeAnimation("collided",trex_collided);
    
    ground.velocityX=0;
    
    cldgrp.setVelocityXEach(0);
    cldgrp.setLifetimeEach(-1);
   
    cacgrp.setVelocityXEach(0);
    cacgrp.setLifetimeEach(-1);
    
    gameover.visible=true;
    restart.visible=true;
    
    if(highscore<score){
      highscore=score;
    }
    
    if(mousePressedOver(restart) || touches.length>0) {
      reset();
      touches=[];
    }
  }
 
   
  trex.collide(invisibleGround);
  
  drawSprites();
}

function reset(){
  gameState =play;
  gameover.visible = false;
  restart.visible = false;
  cldgrp.destroyEach();
  cacgrp.destroyEach();
  trex.changeAnimation("running",trex_running);
  score = 0;
 }



function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    cloud.lifetime=200;
    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    cldgrp.add(cloud);
    }
  
}
function spawnCactus(){
if(frameCount % 80 ===0){
  cactus=createSprite(width,height-35,20,20);
cactus.velocityX=-(5+score/300);
cactus.scale=0.6;
  cactus.lifetime=200;
  var a=Math.round(random(1,6));
  switch(a){
    case 1: cactus.addImage(c1);
    break;
    case 2: cactus.addImage(c2);
    break;
    case 3: cactus.addImage(c3);
    break;
    case 4: cactus.addImage(c4);
    break;
    case 5: cactus.addImage(c5);
    break;
    case 6: cactus.addImage(c6);
    break;
    default:break;
}
  cacgrp.add(cactus);
 
}



}







