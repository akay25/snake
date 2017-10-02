//Global variables 
var gameStart;
var user = null;
var mapHeight = 600;
var mapWidth = 600;

//Variables for this sketch
var snake;
var scl = 15;
var snk_vel = 2.5;
var foods = [];
var zoom = 1;
var trans;

function setup() {
    //Canvas settings
    createCanvas(windowWidth, windowHeight);
    frameRate(15);

    //get snake details from server
    //gameStart = true;
    //user = 'Game B)';

    //Initialize the snake
    snake = new Snake(45, 67);
    trans = createVector(-snake.x, -snake.y);
    
    //Get food points from the server
    var max_food = 80;
    for(var i=0;i<max_food;i++){
        var f = new Food(random(-mapWidth, mapWidth), random(-mapHeight, mapHeight));
        foods.push(f);
    }
}
 
function draw(){

    background(0);

    //user registered successfully
    if(gameStart && user !== null){
        /*******game code starts here*******/
        background(34);
        translate(width/2, height/2);
        /*//A zoom function like agar.io
        var newzoom = scl/snake,r;
        zoom = lerp(zoom, newzoom, 0.9);
        scale(scl/snake.r);*/
        
        //Since things aren't going smooth, i m going with lerp :p
        var newTrans = createVector(-floor(snake.x), -floor(snake.y));
        trans.x = lerp(trans.x, newTrans.x, 0.4);
        trans.y = lerp(trans.y, newTrans.y, 0.4)

        //I'm the center of the whole world
        translate( trans.x, trans.y);
        
        fill(23);   //Too tired to see the world in black and white
        noStroke(); //Going without eye liner
        rect(-mapWidth - scl/2, -mapHeight - scl/2, mapWidth*2 + scl/2, mapHeight*2 + scl/2); //creating the non-monochromatic stage

        //The food particles
        for(var i=0;i<foods.length;i++)
            foods[i].show();

        snake.show();
        snake.update();
        
        //send snake data to server
        

        //get updated snake data on client

    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function keyPressed(){

    if(key == 'W' && !snake.yspeed){
        snake.yspeed = snake.xspeed = 0;
        snake.yspeed = -snk_vel;
        snake.direction = 'up';
    }
    if(key == 'S' && !snake.yspeed){
        snake.yspeed = snake.xspeed = 0;
        snake.yspeed = snk_vel;
        snake.direction = 'down';
    }
    if(key == 'A' && !snake.xspeed){
        snake.yspeed = snake.xspeed = 0;
        snake.xspeed = -snk_vel;
        snake.direction = 'left';
    }
    if(key == 'D' && !snake.xspeed){
        snake.yspeed = snake.xspeed = 0;
        snake.xspeed = snk_vel;
        snake.direction = 'right';
    }
}

function Snake(x, y) {
    this.x = x;
    this.y = y;
    this.xspeed = 0;
    this.yspeed = 0;
    this.r = scl;
    
    this.length = 6;
    this.tail = [];

    for(var i = 0;i<this.length;i++)
        this.tail[i] = createVector(this.x-(this.r*snk_vel/3)*(i+1), this.y);
    
    this.show = function() {
        fill(255);
        noStroke();
        
        for(var i =0;i<this.tail.length;i++){
            ellipse(this.tail[i].x , this.tail[i].y, this.r, this.r);   
        }
        fill(color(255,0,0));
        ellipse(this.x , this.y, this.r, this.r);
    }

    this.update = function() {
        if(this.xspeed !== 0 || this.yspeed !== 0){
            var x = -1, y = -1;

            x = this.x + this.xspeed*this.r/3;
            y = this.y + this.yspeed*this.r/3;
            x = constrain(x, -mapWidth, mapWidth);
            y = constrain(y, -mapHeight, mapHeight);

            if(x != this.x || y != this.y){
                if(this.length == this.tail.length)
                    for(var i = 0;i<this.tail.length-1;i++)
                        this.tail[i] = this.tail[i+1];
                
                this.tail[this.length - 1] = createVector(this.x, this.y);
                this.x = x;
                this.y = y;
            }
        }
    }
}

function Food(x, y){
    this.x = x;
    this.y = y;
    this.c = color(0, 255, 0);
    this.r = scl/3;
    this.show = function(){
        fill(this.c);
        noStroke();
        ellipse(this.x, this.y, this.r, this.r);
    }
}