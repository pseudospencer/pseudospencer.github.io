var DEBUGGING = true;
var DEBUGGING = false;
var array = [];

function setup() {
    // createCanvas(600, 600);
    createCanvas(windowWidth, windowHeight);
    strokeWeight(2);
    array[0] = new Square(0, 0, width, height);
}

function draw() {
    background(255);
    for (var i = 0; i < array.length; i++) {
        array[i].update();
    }
}

function Square (x, y, w, h) {
    // dimensions
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    // color
    this.r = random(0,255);
    this.g = random(0,255);
    this.b = random(0,255);
    // properties
    this.test = false;
    this.wasSplit = false;

    this.clicktest = function() {
        // if the mouse is inside the square, return true
        if (this.wasSplit == false){
            this.test = (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h);
        }
    }

    this.update = function() {
        fill(this.r, this.g, this.b);
        rect(this.x, this.y, this.w, this.h);
        if (this.test == true){
            // this.r = random(0,255);
            // this.g = random(0,255);
            // this.b = random(0,255);
            this.split();
            this.test = false;
        }
    }

    this.split = function() {
        var splitX = mouseX;
        var splitY = mouseY;
        var relX = mouseX - this.x;
        var relY = mouseY - this.y;

        if (DEBUGGING == true){
            console.log("splitX =", splitX, "splitY =",splitY);
            console.log("relX =", relX, "relY", relY);
        }

        // if (splitX >= splitY) {
        if (relX >= relY) {
            // split horizontally

            var newW = this.w/2;
            var newH = this.h;
            var newX1 = this.x;
            var newX2 = newX1 + newW;
            var newY1 = this.y;
            var newY2 = this.y;

            // instantiate two new Square objects
            var index = array.length; // one at array[index], one at [index+ 1]

            array[index] = new Square(newX1, newY1, newW, newH);
            array[index + 1] = new Square(newX2, newY2, newW, newH);

        // } else if (splitY > splitX) {
        } else if (relY > relX) {
            // split vertically

            var newW = this.w;
            var newH = this.h/2;
            var newX1 = this.x;
            var newX2 = this.x;
            var newY1 = this.y;
            var newY2 = newY1 + newH;

            // instantiate two new Square objects
            var index = array.length; // one at array[index], one at [index+ 1]

            array[index] = new Square(newX1, newY1, newW, newH);
            array[index + 1] = new Square(newX2, newY2, newW, newH);
        }

        this.wasSplit = true;
    }
}

function mousePressed(){
    for (var i = 0; i < array.length; i++) {
        array[i].clicktest();
    }
    if (DEBUGGING == true) {
        console.log(array);
    }
}
