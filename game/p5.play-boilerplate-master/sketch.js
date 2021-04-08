//creating variables
var mainCharecter;
var rocketImg;
var comets,cometImg;
var missile,missileImg,redimg;
var restartimg,restart;
var gameoverimg,gameover;
var backgroundImg;
var blastimg;
var score = 0;
var gamestate;
var play = 1;
var end = 0;

//loading images
function preload() {
  rocketImg=loadImage('images/rocket.png')
  cometImg=loadImage('images/comet.png')
  missileImg=loadImage('images/missile.png')
  backgroundImg=loadImage('images/background.jpg')
  redimg=loadImage('images/redcomet.png')
  blastimg=loadImage('images/blast.png')
  restartimg=loadImage('images/restart.png')
  gameoverimg=loadImage('images/gameover.png')
}

//creating main game elements
function setup() {
cometGroup = createGroup();
redCometGroup = createGroup();
missileGroup = createGroup();

  createCanvas(1275,600);
  mainCharecter = createSprite(600,490,100,100);
  mainCharecter.addImage(rocketImg);
  mainCharecter.scale = 0.2;

 

 
  
}

//setting up keyevents and displaying score
function draw() {
  background(backgroundImg); 
 if (keyDown('p')) {
   gamestate=play
 }
 

  if (gamestate===play) {
    
     
    Comets();
    redComets();

  textSize(25)
  fill("white")
  text("SCORE:"+score,100,100);

 
  
if (keyDown("RIGHT_ARROW")) {
  mainCharecter.x=mainCharecter.x+5;
}

if (keyDown("LEFT_ARROW")) {
  mainCharecter.x=mainCharecter.x-5;
}

if (keyDown("UP_ARROW")) {
  mainCharecter.y=mainCharecter.y-5;
}

if (keyDown("DOWN_ARROW")) {
  mainCharecter.y=mainCharecter.y+5;
}


if (keyDown("SPACE")) {
  var missille = createMissiles();
  missille.addImage(missileImg);
  missille.x = mainCharecter.x;
}

if (missileGroup.isTouching(redCometGroup)) {
  redCometGroup.destroyEach();
  score=score+4;
  var posX=missile.x;
  var posY=missile.y;
  var blast = createSprite(posX,posY)
 
  blast.addImage(blastimg);
  blast.scale=0.3;
  blast.lifetime=5;
 // missile.destroyEach();
}

if (missileGroup.isTouching(cometGroup)) {
  cometGroup.destroyEach();
  score=score+5;
  var posX=missile.x;
  var posY=missile.y;
  var blast = createSprite(posX,posY)
  
 
  blast.addImage(blastimg);
  blast.scale=0.3;
  blast.lifetime=5;
 // missile.destroyEach();
}

if (cometGroup.isTouching(mainCharecter)) {
  gamestate=end;
  
}

 }
else if (gamestate===end) {

 var restart=createSprite(600,200)
  restart.addImage(restartimg)

 var gameover=createSprite(600,400);
  gameover.addImage(gameoverimg);



  restart.visible=true;
  gameover.visible=true;
  
  mainCharecter.visible=false;
  
  cometGroup.setVelocityYEach(0);
  redCometGroup.setVelocityYEach(0);
  comet.visible=false;
  


}

if (mousePressedOver(restart)) {
  gamestate=play
}

  drawSprites();
}

//spawning comets
function Comets(){
  if(World.frameCount%60===0){
    comets=createSprite(600,200,20,20);
    comets.scale=0.2;
    r=Math.round(random(1));
    if (r===1){
      comets.addImage(cometImg);
    }
    comets.x=Math.round(random(0,800))
    
    comets.velocityY=0.5;
    comets.setLifetime=100;
    cometGroup.add(comets);
    
} 
}

//spawning obstacles
function redComets(){
  if(World.frameCount%80===0){
    redcomets=createSprite(600,200,20,20);
    redcomets.scale=0.2;
    r=Math.round(random(1,2));
    if (r===2){
      redcomets.addImage(redimg);
    }
    redcomets.x=Math.round(random(0,800))
    
    redcomets.velocityY=0.5;
    redcomets.setLifetime=100;
    redCometGroup.add(redcomets);
    
} 
}

//spawning missiles
function createMissiles() {
  missile= createSprite(600, 420, 5, 10);
  missile.velocityY = -6;
  missile.scale = 0.08;
  missile.lifetime=120;
  missile.x=mainCharecter.x
  missileGroup.add(missile)
  return missile;
  
}