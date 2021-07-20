const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world;
var canvas, boat, angle, tower, ground, cannon, cannonball;
var balls = [];
var boats = [];




function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");

}

function setup() {
  canvas = createCanvas(1200,600);
  engine = Engine.create();
  world = engine.world;
  angle = -PI / 4;
  ground = new Ground(0, height - 1, width * 2, 1);
  tower = new Tower(150, 350, 160, 310);
  cannon = new Cannon(180, 110, 110, 50, angle);
  boat = new Boat(width,height-100,200,200,-100);
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);
  ground.display();

  showBoats();

  cannon.display();
  tower.display();

  for(var i = 0; i < balls.length; i++){
    showCannonballs(balls[i],i)
    for(var x = 0; x < boats.length; x++){
      if (balls[i] !== undefined && boats[x] !== undefined){
        var collide = Matter.SAT.collides(balls[i].body, boats[x].body);
        if (collide.collided){
          boats[x].remove(x);
          balls[i].remove(i);
        }
      }
    }
  }
}

function showCannonballs(ball, index){
  cannonball.display();

  if (ball.body.position.x > width || ball.body.position.y > height - 100){
    World.remove(world, ball.body);
    balls.splice(index,1);
  }
}

function showBoats(){
  if (boats.length > 0){
    if (boats.length < 4 && boats[boats.length - 1].body.position.x < width-300){
      var positions = [-30,-50,-100,-90];
      var randomneg = random(positions);
      var boat = new Boat(width,height-100,200,200,randomneg);
      boats.push(boat);
    }

    for (var i = 0; i < boats.length; i++){
      Matter.Body.setVelocity(boats[i].body, {x : -1, y : 0});
      boats[i].display();
    }
  } else{
    var boat = new Boat(width,height-100,200,200,-100);
    boats.push(boat);
  }
}


function keyPressed(){
  if (keyCode == 32){
    cannonball = new Cannonball(cannon.x,cannon.y);
    balls.push(cannonball);
  }
}

function keyReleased(){
  if (keyCode == 32){
    balls[balls.length - 1].shoot();
  }
}