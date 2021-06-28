var backwardwalkingimg,forwardwalkingimg,leftjumpingimg,rightjumpingimg,stillimg
var ground;
var player;
var obstacles;
var obstaclesgroup;
var gameState="play"
var ob1,ob2,ob3,ob4,ob5,ob6,ob7,ob8;
function preload(){
  backwardwalkingimg=loadAnimation("Images/1.png","Images/2.png","Images/3.png","Images/4.png","Images/5.png","Images/6.png")
  leftjumpingimg=loadAnimation("Images/7.png","Images/8.png","Images/9.png","Images/10.png","Images/11.png","Images/12.png","Images/13.png","Images/14.png")
  forwardwalkingimg=loadAnimation("Images/1of1.png","Images/1of2.png","Images/1of3.png","Images/1of4.png","Images/1of5.png","Images/1of6.png")
  rightjumpingimg=loadAnimation("Images/1of7.png","Images/1of8.png","Images/1of9.png","Images/1of10.png","Images/1of11.png","Images/1of12.png","Images/1of13.png","Images/1of14.png")
  stillimg=loadAnimation("Images/1of3.png")
  ob1=loadImage("images/ob1.png")
  ob2=loadImage("images/ob2.png")
  ob3=loadImage("images/ob3.png")
  ob4=loadImage("images/ob4.png")
  ob5=loadImage("images/ob5.png")
  ob6=loadImage("images/ob6.png")
  ob7=loadImage("images/ob7.png")
  ob8=loadImage("images/ob8.png")
  background=loadImage("images/BG.png")


}
function setup() {
  createCanvas(windowWidth,windowHeight)
  
ground = createSprite(width/2,height-30,width,20)

  walking=createSprite(450,height-200)
  walking.addAnimation("still",stillimg)
  walking.addAnimation("forwardwalking",forwardwalkingimg)
  walking.addAnimation("rightjumping",rightjumpingimg)
  walking.addAnimation("backwardwalking",backwardwalkingimg)
  walking.addAnimation("leftjumping",leftjumpingimg)
 
 walking.scale=0.15

  obstaclesgroup = new Group();
}

function draw() {
  background("blue")
  background.addImage("background",background)
  if (gameState==="play"){

  
  if (keyDown("space")&&keyDown("a")){
walking.velocityY=-10
walking.changeAnimation("leftjumping",leftjumpingimg)
  }
  if (keyDown("space")&&keyDown("d")){
    walking.velocityY=-10
    walking.changeAnimation("rightjumping",rightjumpingimg)
      }
  
  
  walking.velocityY=walking.velocityY+0.5
  if(keyDown("a")){
    walking.setCollider("rectangle",0,0,900,2190)
    
    walking.changeAnimation("backwardwalking",backwardwalkingimg)
    walking.x=walking.x-8
  }  
  if(keyDown("d")){
    walking.setCollider("rectangle",-600,-300,900,2190)
   
    walking.changeAnimation("forwardwalking",forwardwalkingimg)
    walking.x=walking.x+8
  }  
if(keyWentUp("a")||keyWentUp("space")||keyWentUp("d")){
walking.changeAnimation("still",stillimg)
}
spawnObstacles();
if (obstaclesgroup.isTouching(walking)){

  gameState="end"
}
  }
if (gameState==="end"){
  textSize(80)
  fill("yellow")
  strokeWeight(10)
  stroke("brown")
  text(" Game Over !",700,300)

ground.velocityX=0
walking.changeAnimation("still",stillimg)
obstaclesgroup.setVelocityXEach(0)
obstaclesgroup.setLifetimeEach(-1)
}

  walking.collide(ground)

drawSprites();
}

function spawnObstacles(){
  if (frameCount%60==0){

    obstacles=createSprite(width,height-60,10,10)
    obstacles.velocityX=-8

    obstacles.debug = true;

    obstacles.setCollider("rectangle",0,0,50,50)
    var r = Math.round(random(1,7))

    switch(r){
      case 1:obstacles.addImage("ob1",ob1)
             break;
      case 2:obstacles.addImage("ob2",ob2)
             break;
      case 3:obstacles.addImage("ob3",ob3)
             break;
      case 4:obstacles.addImage("ob4",ob4)
             break;
      case 5:obstacles.addImage("ob5",ob5)
             break;
      case 6:obstacles.addImage("ob6",ob6)
             break;
      case 7:obstacles.addImage("ob7",ob7)
             break;
      case 8:obstacles.addImage("ob8",ob8)
             break;
      default:break

    }
    obstacles.lifetime = 250
    obstaclesgroup.add (obstacles)
  }

}