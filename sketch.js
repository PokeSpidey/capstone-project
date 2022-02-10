const Render = Matter.Render;
const Constraint = Matter.Constraint;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let engine;
let world;

var ground, ground2;
var deadpoolAnim, deadpoolIMG, ninjaRightAnim, ninjaLeftAnim, ninjaIMG;
var deadpool, ninja;
var rope, rope2;
var light, light2, lightImg, light_con, light_con_2;
var button, button2;
var lifeOfEnemy, life;
var finalBlow, fullHealth, halfLife;



function preload() {
  deadpoolAnim = loadAnimation('deadpool1.png', 'deadpool2.png', 'deadpool3.png', 'deadpool4.png', 'deadpool5.png', 'deadpool6.png', 'deadpool7.png', 'deadpool8.png', 'deadpool9.png')
  deadpoolIMG = loadImage("deadpoolfinal.png");
  ninjaRightAnim = loadAnimation('ninjaRight1.png','ninjaRight2.png', 'ninjaRight3.png', 'ninjaRight4.png', 'ninjaRight5.png', 'ninjaRight6.png', 'ninjaRight7.png', 'ninjaRight8.png', 'ninjaRight9.png', 'ninjaRight10.png', 'ninjaRight11.png', 'ninjaRight12.png', 'ninjaRight13.png', 'ninjaRight15.png', 'ninjaRight17.png', 'ninjaRight18.png', 'ninjaRight19.png', 'ninjaRight20.png', 'ninjaRight21.png', 'ninjaRight22.png', 'ninjaRight23.png', 'ninjaRight24.png', 'ninjaRight25.png');
  ninjaLeftAnim = loadAnimation('ninjaLeft1.png','ninjaLeft2.png', 'ninjaLeft3.png', 'ninjaLeft4.png', 'ninjaLeft5.png', 'ninjaLeft6.png', 'ninjaLeft7.png', 'ninjaLeft8.png', 'ninjaLeft9.png', 'ninjaLeft10.png', 'ninjaLeft11.png', 'ninjaLeft12.png', 'ninjaLeft13.png', 'ninjaLeft14.png', 'ninjaLeft15.png', 'ninjaLeft16.png', 'ninjaLeft17.png', 'ninjaLeft18.png', 'ninjaLeft19.png', 'ninjaLeft20.png', 'ninjaLeft21.png', 'ninjaLeft22.png', 'ninjaLeft23.png', 'ninjaLeft24.png', 'ninjaLeft25.png');
  ninjaIMG = loadImage("ninjaLeft1.png");
  lightIMG = loadImage("fan.png")
  finalBlow = loadImage("dead.png");
  fullHealth = loadImage("fullalive.png")
  halfLife = loadImage("halfalive.png");
  ninjaDead  = loadAnimation('ninjaLeft1.png');
}
function setup() {
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  if (isMobile) {
    canvasWidth = displayWidth;
    canvasHeight = displayHeight;
    createCanvas(canvasWidth, canvasHeight);
  } else {
    canvasWidth = windowWidth;
    canvasHeight = windowHeight;
    createCanvas(canvasWidth, canvasHeight);
  }
  engine = Engine.create();
  world = engine.world;

  deadpool = createSprite(54, 102, 200, 200);
  deadpool.addImage(deadpoolIMG);
  deadpool.scale = 0.09;

  ninja = createSprite(10, 348, 1, 1);
  ninja.scale = 0.05;

  lifeOfEnemy = createSprite(0, 0, 1, 1);
  lifeOfEnemy.addImage(fullHealth)
  lifeOfEnemy.scale = 0.1;
  life = 1;

  ground = new Ground(200, 399, 400, 20);
  ground2 = new Ground(50, 145, 100, 6);

  rope = new Rope(5, {x: 200, y: -15});
  rope2 = new Rope(5, {x: 350, y: -15});

  light = Bodies.circle(300,300, 20);
  Matter.Composite.add(rope.body,light);

  light2 = Bodies.circle(550,300, 20);
  Matter.Composite.add(rope2.body,light2);

  light_con = new Link(rope,light);
  light_con_2 = new Link(rope2,light2);

  button = createImg('target2.png');
  button.position(180,5);
  button.size(40,40);
  button.mouseClicked(drop);

  button2 = createImg('target2.png');
  button2.position(330,5);
  button2.size(40,40);
  button2.mouseClicked(drop2);

}


function draw() 
{
  background("black");

  drawSprites();

  push();
  imageMode(CENTER);
  if(light!=null){
    image(lightIMG, light.position.x, light.position.y, 70, 70);
  }
  if(light2!=null){
    image(lightIMG, light2.position.x, light2.position.y, 70, 70);
  }  
  pop();

  rope.show();
  rope2.show();

  Engine.update(engine);

  lifeOfEnemy.x = ninja.x + 10;
  lifeOfEnemy.y = ninja.y - 60;

  if(ninja.x ==10) {
    ninja.addAnimation('yes', ninjaRightAnim)
    ninja.velocityX = 2;
  }
  if (ninja.x ==390) {
    ninja.addAnimation('yes', ninjaLeftAnim)
    ninja.velocityX = -2;
  }  

  ground.show();
  ground2.show();
  
  if(collide(light,ninja)==true)
  {
    World.remove(engine.world,light);
    light = null;
    life -= 0.5;
  }
  
  if(collide(light2, ninja)==true)
  {
    World.remove(engine.world, light2);
    light2 = null;
    life -= 0.5;
  }
  console.log(life);
  if(light2!=null && light2.position.y>=369)
  {
    light2=null;
   }

   if(light!=null && light.position.y>=369)
   {
     light=null;
    }

    if(life == 0.5) {
      lifeOfEnemy.addImage(halfLife);
    }

    if(life == 0) {
      ninja.visible = false;
      deadpool.visible = false;
      lifeOfEnemy.visible = false;
      textSize(50);
      fill('white');
      text("GAME", 54, 102);
      text("OVER", 200, 380);
      text("YOU WON!", 150, 200);
    }

    if(life == 0.5 && light == null && light2 == null) {
      ninja.visible = false;
      deadpool.visible = false;
      lifeOfEnemy.visible = false;
      textSize(50);
      fill('white');
      text("GAME", 54, 102);
      text("OVER", 200, 380);
      text("YOU LOST!", 140, 200);
    }

    if(life == 1 && light == null && light2 == null) {
      ninja.visible = false;
      deadpool.visible = false;
      lifeOfEnemy.visible = false;
      textSize(50);
      fill('white');
      text("GAME", 54, 102);
      text("OVER", 200, 380);
      text("YOU LOST!", 140, 200);
    }
}

function drop()
{
rope.break();
light_con.dettach();
light_con = null; 
}

function drop2()
{
rope2.break();
light_con_2.dettach();
light_con_2 = null;
}

function collide(body,sprite)
{
if(body!=null)
      {
       var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
        if(d<=80)
          {
             return true; 
          }
          else{
            return false;
          }
       }
} 