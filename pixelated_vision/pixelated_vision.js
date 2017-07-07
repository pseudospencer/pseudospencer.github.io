var capture;

function setup() {
    createCanvas(640, 480);
    capture = createCapture(VIDEO);
    capture.hide();
    noStroke();
    fill(0);
}

function draw() {
    background(200);
    capture.loadPixels();

    var step = 12;
    for (var y = 0; y< capture.height; y+= step) {
        for (var x = 0; x< capture.width; x+= step) {
            var i = y * capture.width + x;
            var darkness = (255 - capture.pixels[i*4])/255;
            var radius = step * darkness;
            ellipse( x, y, radius, radius);
        }
    }
}
