var side = 250;
var center;
var img;
var draw_position_x = 0;

function preload() {
    img = loadImage("Bean Head Crop 250.jpg")
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    imageMode(CENTER);
    img.loadPixels();
    background(0);
    strokeWeight(2);
    stroke(255,0,0);
    center = width/2;
}

function draw() {
    var mx = constrain(mouseX, center - side/2, center+ side/2);

    var x = map(mx,center - side/2, center + side/2, side, 0);
    x = floor(x);

    for (var y = 0; y < side; y++) {
        var c = img.get(x,y);
        set(draw_position_x, y, c)
    }
    updatePixels();

    // show thumbnail
    image(img,mx,height - side/2, side, side);
    line(center,height - side, width/2, height);

    // connect
    line(draw_position_x, side, center, height - side);

    draw_position_x++
    if (draw_position_x >= width) {
        draw_position_x = 0;
    }
}
