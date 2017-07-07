var canvas;
var totalCrawlers = 100;
var crawlRate = 2;
var frame = [];

function setup() {
    canvas = createCanvas(300,300);
    canvas.parent("sketch-holder");

    for (var i = 0; i< totalCrawlers; i++) {
        frame[i] = new Crawler();
    }

}

function draw() {
    for (var i = 0; i< totalCrawlers; i++) {
        frame[i].crawl();
    }
}

function Crawler() {

    this.init = function() {
        this.x = random(1, width);
        this.y = random(1, height);
    }

    this.crawl = function() {
        this.drawShape();
        this.x += random(0-crawlRate, crawlRate);
        this.y += random(0-crawlRate, crawlRate);
    }

    this.drawShape = function() {
        this.r = random(255);
        this.g = random(255);
        this.b = random(255);
        fill(0);
        stroke(this.r, this.g, this.b);
        rect(this.x, this.y, 10, 10);
    }

    this.init();
    this.drawShape();
}
