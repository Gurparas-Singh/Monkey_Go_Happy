var wallpaper,wallpaperImg,monkey,monkeyImg,rock,rockImg,banana,bananaImg,score,invisibleGround,gamestate,re,reImg;

function preload(){
     monkeyImg = loadAnimation("monkey (11).png","monkey (2).png","monkey (3).png","monkey (4).png","monkey (5).png","monkey (6).png","monkey (7).png","monkey (8).png","monkey (9).png");

  wallpaperImg = loadImage("j.jpg");
  rockImg = loadImage("stone.png");
  bananaImg = loadImage("banana.png");
  reImg = loadImage("over.png");
}

function setup(){
  createCanvas(600,300);
  monkey = createSprite(50,280,50,50);
 monkey.addAnimation("monkey",monkeyImg);
  monkey.scale = 0.1;
  
  wallpaper = createSprite(450,100,5,5);
  wallpaper.addImage("wallpaper",wallpaperImg);
  wallpaper.scale = 1.4;
  
  score = 0;
  
  invisibleGround = createSprite(50,290,20,5);
  invisibleGround.visible = false;
  
  gamestate = "PLAY";
  
  bananaGroup = new Group();
  rockGroup = new Group();
  monkey.setCollider("circle",0,0,250);
}

function draw(){
  background(0);
  monkey.velocityY = monkey.velocityY +0.8;
     
  re = createSprite(300,150,5,5);
  re.addImage("restart",reImg);
  re.scale = 0.1;
  
  if(wallpaper.x<150){
    wallpaper.x = wallpaper.width/2;
  }
  
   text("Score"+score,300,50);
  monkey.depth = wallpaper.depth+1;
   re.visible = false;   
  
  monkey.collide(invisibleGround);
  if(gamestate === "PLAY"){
     wallpaper.velocityX = -4;

  condition();
  }
  
  else if(gamestate == "END"){ 
    re.visible = true;
    wallpaper.velocityX = 0;
    bananaGroup.setVelocityXEach(0);
    rockGroup.setVelocityXEach(0);
    
  }
   if(mousePressedOver(re) && gamestate === "END"){
     bananaGroup.destroyEach();
     rockGroup.destroyEach();
     score = 0;
      re.visible = false;
     gamestate = "PLAY";
   }
 drawSprites();
}

function condition (){
  
 if(keyDown("space") && monkey.y > 262 ){
    monkey.velocityY = -15;
  }
if(World.frameCount %90 == 0){
    var banana=createSprite(600,random(100,270),5,5);
    banana.addImage(bananaImg);
    banana.scale = 0.05;
    banana.velocityX = -(4+World.frameCount/100);
    bananaGroup.add(banana);
  }
  
  if(World.frameCount%70 == 0){
    var rock = createSprite(600,260,5,5);
    rock.addImage(rockImg);
    rock.scale = 0.17;
    rock.velocityX = -5;
    rockGroup.add(rock);
  }
  
  if(bananaGroup.isTouching(monkey)){
    score++;
    bananaGroup.destroyEach();
  }
  
  if(rockGroup.isTouching(monkey)){
   gamestate = "END";
  }
}
