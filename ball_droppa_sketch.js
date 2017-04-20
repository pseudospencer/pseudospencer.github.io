/*
Ball Droppa
Spencer James, 2017
*/

var DEBUGGING = true;
// Setup
var level = 1;
var lives = 3;
var maxLevels = 11; // goes to 10
var score = 0;
var INTRO_STATE = 0;
var PLAY_STATE = 1;
var STAGING_STATE = 2;
var GAME_OVER = 3;
var gameState = INTRO_STATE;
var stateMillis;
// Paddle
var paddle;
// Balls
var startBalls = 15;
var currBalls = startBalls;
var balls = [];
var minFallRate = 0.5;
var maxFallRate = 3.0;
// Display
var topBarHeight = 30;
var baseText = 18;
var helvetica = "Helvetica";

function setup(){
    createCanvas(windowWidth, windowHeight);
    textFont(helvetica);
    newGame();
}

function draw(){
    background(0);
    if (gameState == INTRO_STATE) {
        inIntro();
    } else if (gameState == PLAY_STATE) {
        inLevel();
    } else if (gameState == STAGING_STATE) {
        inStaging();
    } else if (gameState == GAME_OVER) {
        gameOver();
    }
}

function initBalls() {
    for (var i = 0; i < currBalls; i++) {
        balls[i] = new Ball(paddle);
    }
}

function newGame(){
    level = 1;
    lives = 3;
    score = 0;
    minFallRate = 0.5;
    maxFallRate = 3.0;
    gameState = INTRO_STATE;
    currBalls = startBalls;
    balls = [];
    // inits
    paddle = new Paddle();

    initBalls();
}

function inStaging(){

    textAlign(CENTER, CENTER);
    textSize(baseText*3);
    fill(255);
    text("LEVEL " + level, 0, 0, width, height);
    textSize(baseText);

    stroke(255);
    noFill();
    rect(width/2 - 50, height/2 + 100, 100, 50);
    fill(255);
    text("Start", width/2 - 50, height/2 + 100, 100, 50);
}

function inIntro(){
    // intro text
    textAlign(CENTER, CENTER);
    textSize(baseText*3);
    fill(255);
    text("BALL DROPPA", 0, 0, width, height);
    textSize(baseText);
    text("Use L/R arrows to move. \nBalls with red outline hurt!", 0, 100, width, height-100);
    // start button - Handler is in mousePressed
    stroke(255);
    noFill();
    rect(width/2 - 50, height/2 + 100, 100, 50);
    fill(255);
    text("Cool", width/2 - 50, height/2 + 100, 100, 50);
}

function topBar() {
    fill(255, 0, 0);
    rect(0, 0, width, topBarHeight);
    textSize(baseText);
    textAlign(LEFT);
    var s = "Level: " + level + " Lives: " + lives + "  Score: " + score;
    fill(255);
    text(s, 20, 20);
}

function inLevel(){
    topBar();
    for (var i = 0; i < balls.length; i++) {
        balls[i].update();
        balls[i].render();
    }
    paddle.update();
    paddle.render();

    if (score >= level*20) {
        levelUp();
    }

    if (lives == 0) {
        gameState = GAME_OVER;
    }
}

function levelUp() {
    level++;
    minFallRate += 0.1;
    maxFallRate += 0.1;
    if (level > 1) {
        currBalls = startBalls * level;
        initBalls();
    }
    if (level < maxLevels){
        gameState = STAGING_STATE;
    } else {
        gameState = GAME_OVER;
    }
}

function gameOver(){
    textAlign(CENTER, CENTER);
    textSize(baseText*3);
    fill(255);
    if (level < maxLevels){
        text("GAME OVER", 0, 0, width, height);
    } else {
        text("YOU WON!", 0, 0, width, height);
    }
    textSize(baseText);
    text("Your score: " + score, 0, 100, width, height-100);

    stroke(255);
    noFill();
    rect(width/2 - 50, height/2 + 100, 100, 50);
    fill(255);
    text("Replay", width/2 - 50, height/2 + 100, 100, 50);
}

function buttonHandler(){
    // Hardcoded values... bad
    var underTop = (mouseY > height/2 + 100);
    var aboveBottom = (mouseY < height/2 + 150);
    var insideRight = (mouseX > width/2 - 50);
    var insideLeft = (mouseX < width/2 + 50);

    if (gameState == INTRO_STATE) {
        if (underTop && aboveBottom && insideRight && insideLeft){
            stateMillis = millis();
            gameState = STAGING_STATE;
        }
    }
    if (gameState == GAME_OVER) {
        if (underTop && aboveBottom && insideRight && insideLeft){
            newGame();
            stateMillis = millis();
            gameState = PLAY_STATE;
        }
    }
    if (gameState == STAGING_STATE) {
        if (millis() >= stateMillis + 500){
            if (underTop && aboveBottom && insideRight && insideLeft){
                stateMillis = millis();
                gameState = PLAY_STATE;
            }
        }
    }
}

function Paddle(){
    this.NORMAL_STATE = 0;
    this.CATCH_STATE = 1;

    this.init = function() {
        this.state = this.NORMAL_STATE;
        this.width = 80;
        this.height = 20;
        this.x = width / 2 - this.width / 2; // initialize centered
        this.y = height - 50;
        this.speed = 5;
    }

    this.update = function() {
        // Color
        if (this.state == this.NORMAL_STATE) {
            this.r = 255;
            this.g = 0;
            this.b = 0;
        } else if (this.state == this.CATCH_STATE) {
            this.r = 255;
            this.g = 255;
            this.b = 255;
            this.state = this.NORMAL_STATE;
        }
        // Size - prevent from getting too small.
        if (this.width < 20) {
            this.width = 20;
        }
        // Movement
        if (keyIsDown(LEFT_ARROW) && this.x > this.speed) {
            this.x -= this.speed;
        } else if (keyIsDown(RIGHT_ARROW) && this.x < width - this.width - this.speed) {
            this.x += this.speed;
        }
    }

    this.render = function() {
        fill(this.r, this.g, this.b);
        noStroke();
        rect(this.x, this.y, this.width, this.height);
    }

    this.init();

}

function Ball(paddle){
    this.paddle = paddle;

    this.init = function() {
        // Dimensions
        this.diameter = random(10, 30);
        this.radius = this.diameter/2;
        this.x = random(this.radius + this.paddle.speed, width - this.radius - this.paddle.speed);
        this.y = random(-this.diameter, -height);
        // movement
        this.fallRate = random(minFallRate, maxFallRate);
        this.wasCaught = false;
        // type
        this.randomize = round(random(100));
        this.badCutoff = 10 * level - 3;
        this.specialCutoff = 99;
        if (this.randomize <= this.badCutoff) {
            this.type = "BAD_TYPE";
            this.pointValue = -round(30 / this.diameter);
            this.paddleChange = -10;
            this.livesEffect = -1;
            this.r = 0;
            this.g = 0;
            this.b = 0;
            this.outline = color(255,0,0);
        } else if (this.randomize > this.badCutoff && this.randomize <= this.specialCutoff) {
            this.type = "GOOD_TYPE";
            this.pointValue = round(30 / this.diameter);
            this.paddleChange = 2;
            this.livesEffect = 0;
            this.r = random(255);
            this.g = random(255);
            this.b = random(255);
            this.outline = color(0,0); // completely transparent
        } else if (this.randomize > this.specialCutoff) {
            this.type = "SPECIAL_TYPE";
            this.pointValue = 0;
            this.paddleChange = -10;
            this.livesEffect = 1;
            this.r = 0;
            this.g = 0;
            this.b = 0;
            this.outline = color(0,255,0);
        }
    }

    this.catchCheck = function() {
        var right = (this.x - this.radius >= this.paddle.x);
        var left = (this.x - this.radius <= this.paddle.x + this.paddle.width);
        var top = (this.y + this.radius > this.paddle.y);
        var bottom = (this.y - this.radius < this.paddle.y + this.paddle.height);

        if (right && left && top && bottom) {
            this.wasCaught = true;
            score += this.pointValue;
            lives += this.livesEffect;
            this.paddle.width += this.paddleChange;
            this.paddle.state = this.paddle.CATCH_STATE;

            if (DEBUGGING) {
                console.log("score = ", score, "lives = ", lives);
            }
            this.init();
        }
    }

    this.bottomCheck = function() {
        if (this.y - this.diameter > height){
            this.init();
        }
    }

    this.update = function() {
        // Movement
        this.y += this.fallRate;
        this.bottomCheck();
        this.catchCheck();
    }

    this.render = function() {
        fill(this.r, this.g, this.b);
        stroke(this.outline);
        ellipse(this.x, this.y, this.diameter, this.diameter);
    }

    this.init();
}

function mousePressed(){
    buttonHandler();
}
