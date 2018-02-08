// Pixel Array

// get(x,y) - get's the rgb value for the pixel
// pixels = [R1, G1, B1, A1, R2, G2, B2, A2, ... ] array of all the pixels in the canvas.
// formula for getting values from pixel coordinate (x + y * width) * 4
// pixel density - Retina display has '4 pixels' for every pixel

var vScale = 16;

function setup() {
    createCanvas(640, 480);
    pixelDensity(1); // correct for Retina display
    video = createCapture(VIDEO);
    video.size(width/vScale,height/vScale);
    video.hide();
}

function draw() {
    background(50);
    video.loadPixels();

    // loadPixels();

    for (var y = 0; y < video.height; y++){
        for (var x = 0; x < video.width; x++){
            // The math in this line flips the way the video is rendered to mirror
            var r = (video.width - x -1 + (y * video.width)) * 4;
            var g = r + 1;
            var b = r + 2;
            var a = r + 3;

            // calculate average brightness value for each pixel from rgb to convert to grayscale
            var bright = (video.pixels[r] + video.pixels[g] + video.pixels[b])/3;
            var m = map(bright, 0, 255, 0, vScale);

            noStroke();
            // instead, draw a rect that will scale up
            fill(255);
            ellipse(x * vScale, y * vScale, m);
            fill(255, 0, 0);
            rect(x * vScale, y * vScale, m, m);
            fill(255, 255, 0);
            rect(x * vScale - 8, y * vScale - 8, m/2, m/2);

        }
    }
    // updatePixels();
}
