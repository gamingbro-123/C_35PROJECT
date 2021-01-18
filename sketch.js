var balloonImg;
var balloon;
var database;
var balloonImage2;

function preload()
{
  balloonImg = loadImage("Hot Air Ballon-01.png");

}

function setup() {
  createCanvas(500,500);
  balloon = createSprite(400, 200, 50, 50);
  // balloonImg = addAnimation("Hot Air Ballon-02.png,Hot Air Ballon-03.png,Hot Air Ballon-04.png");

  database = firebase.database();

  var balloonPosition = database.ref("balloon/height");
  balloonPosition.on("value", readPosition, ShowError);
}

function draw() {
  background(255,255,255);

  if(keyDown(LEFT_ARROW)){
    balloon.x = balloon.x -10;
}
else if(keyDown(RIGHT_ARROW)){
  balloon.x = balloon.x +10;
}
else if(keyDown(UP_ARROW)){
   balloon.y = balloon.y -10;
}
else if(keyDown(DOWN_ARROW)){
  balloon.y = balloon.y +10;
}  
  

  if(keyDown(UP_ARROW))
  {
    updateHeight(0,-10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  readPosition();
  updateWeight();
  readHeight();
  ShowError();
  drawSprites();
  
}

function readPosition(x,y){
  balloon.x = balloon.x + x;
  balloon.y = balloon.y + y;

  // database.ref("balloon/height").set({x:balloon.x,y:balloon.y})
}

function updateWeight(x,y)
{
  database.ref("balloon/height").set({
  "x" : height.x + x ,
  "y" : height.y + y
  })

  
}



function readHeight(DATA)
{
  var height = DATA.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function ShowError()
{
  console.log("Error in writing to the database");

}