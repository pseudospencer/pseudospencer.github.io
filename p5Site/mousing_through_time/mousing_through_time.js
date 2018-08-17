var mouseXPositions = [];
var current = 0;
var max_stored = 100;

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(0);
    stroke(255);

    for (var i = 0; i < mouseXPositions.length; i++){
        line(mouseXPositions[i], 0, mouseXPositions[i], height);
    }

    // one way to do this
    // mouseXPositions.push(mouseX);

    // another way
    mouseXPositions[current] = mouseX;
    current++;

    if (current > max_stored) {
        current = 0;
    }

}
