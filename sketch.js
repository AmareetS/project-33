const Engine = Matter.Engine,
 World = Matter.World,
 Events = Matter.Events,
 Bodies = Matter.Bodies;
 
var particles = [];
var plinkos = [];
var divisions=[];

var divisionHeight=300;
var score =0;
var turn = 0;
function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);


   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 8, divisionHeight));
   }


    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }

    

    
}
 

var gameState
function draw() {
  background("black");
  textSize(20)
 text("Score : "+score,20,30);
  Engine.update(engine);
 
  
  if (gameState == "start") {
    text("Click to release a ball", 400, 30);
  } 
  else if (gameState === "playing") {
    text("You will get points for where the ball goes", 400, 30);
  } 
  else {
    text(`You got ${score}points`, 400, 225)
  }



  for (var i = 0; i < plinkos.length; i++) {
    plinkos[i].display();
  }

  for (var k = 0; k < divisions.length; k++) {
    divisions[k].display();
  }

  if (particles != null) {

    if (particles.body.position.x > 0 && particles.body.position.y < width) {
      if (particles.body.position.y > 550) {
        for (let i = 0; i < divisions.length; i++) {
          if (particles.body.position.x < divisions[i].body.position.x) {
            score += divisions[i - 1].score;
            World.remove(world, particle.body);
            particle = undefined;
            if (turn >= 5) gameState = "end";
            else gameState = "start";
            break;
          }
        }
      }
    }
     else {
      text("You miss", 400, 225);
      if (turn >= 5) gameState = "end";
      else gameState = "start";
    }
    particles.display();

  }
}

function mousePressed() {
  if (gameState == "start") {
    particle = new Particle(mouseX, 0, 10);
    gameState = "playing";
    turn++;
  }
}
