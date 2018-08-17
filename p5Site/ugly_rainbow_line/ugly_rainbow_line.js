function setup() {
    createCanvas(windowWidth, windowHeight);
    strokeWeight(4);
}

function draw() {
    // ellipse(mouseX,mouseY,20,20);

    if (mouseIsPressed) {
        setStroke();
        line(mouseX,mouseY,pmouseX, pmouseY);

    }
}

function setStroke() {
    var r = int(random(255));
    var g = int(random(255));
    var b = int(random(255));
    stroke(r,g,b);

}
