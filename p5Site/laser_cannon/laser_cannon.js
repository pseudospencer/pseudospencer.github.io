var raygun, x1, x2, x3, y1, y2, y3, r, g, b;

function preload() {
    raygun = loadSound("ray_gun.mp3");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
}

function draw() {

}

function mousePressed() {
    raygun.play()
    if (mouseX <= width/ 2){
        //Shoot a laser to the right
        laserRight();
    } else {
        //Shoot a laser to the left
        laserLeft();
    }
}

function laserRight() {
    x1 = mouseX;
    x2 = mouseX;
    x3 = mouseX + 10;
    y1 = mouseY + 10;
    y2 = mouseY - 10;
    y3 = mouseY;
    randomRGB();
    for (var i = 15; mouseX + i < width; i+= 15) {
        triangle(x1,y1,x2,y2,x3,y3);
        x1 += 15;
        x2 += 15;
        x3 += 15;
    }
}

function laserLeft() {
    x1 = mouseX;
    x2 = mouseX;
    x3 = mouseX - 10;
    y1 = mouseY + 10;
    y2 = mouseY - 10;
    y3 = mouseY;
    randomRGB();
    for (var i = 15; mouseX + i > 0; i-= 15) {
        triangle(x1,y1,x2,y2,x3,y3);
        x1 -= 15;
        x2 -= 15;
        x3 -= 15;
    }

}

function randomRGB(){
    r = random(255);
    g = random(255);
    b = random(255);
    fill(r,g,b);
}
