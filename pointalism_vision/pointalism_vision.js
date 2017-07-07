// "Paints" live video to screen in a stylized, random, pointilistic manner.
// The stiller you are, the clearer the image.
// Mouse click resets canvas to black.

var video;
var vScale = 16;

var particles = [];
var maxParticles = 100;

function setup() {
    createCanvas(640, 480);
    pixelDensity(1); // correct for Retina display
    video = createCapture(VIDEO);
    video.size(width/vScale, height/vScale);
    video.hide();
    for (var i = 0; i < maxParticles; i++) {
        particles[i] = new Particle(random(0,width),random(0,height));
    }
    background(0);
}

function draw() {
    video.loadPixels();
    for (var i = 0; i < maxParticles; i++) {

        particles[i].update();
        particles[i].render();

    }
}

function Particle(x,y) {
    this.x = x;
    this.y = y;
    this.drawsize = random(4,20);
    this.a = random(127, 255);
    this.r = 127;
    this.g = 127;
    this.b = 127;

    this.update = function() {
        this.x += random(-5, 5);
        this.y += random(-5, 5);

        if (this.x < 0){
            this.x = 0;
        } else if (this.x > width) {
            this.x = width;
        }

        if (this.y < 0){
            this.y = 0;
        } else if (this.y > height) {
            this.y = height;
        }
    }

    this.render = function() {
        noStroke();
        var r = (video.width - floor(this.x/vScale) - 1 + (floor(this.y/vScale) * video.width)) * 4;
        var g = r + 1;
        var b = r + 2;
        var a = r + 3;
        var col = color(video.pixels[r], video.pixels[g], video.pixels[b], this.a);
        fill(col);
        ellipse(this.x, this.y, this.drawsize, this.drawsize);

    }
}

function mouseClicked() {
    background(0);
}
