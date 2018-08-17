var angle = 0.0;
var speed = 0.01;
var circleSize = 25;

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {

    var l0 = map(mouseX, 0, width, 10, 300);
    var l1 = map(mouseY, 0, height, 10, 300);
    var l2 = map(l0/l1, 0, width/height, 10, 300);

    background(255);
    noFill();

    translate(width/2, height/2);

    rotate(angle);
    for (var i = 0; i < 5; i++) {
        push();
        stroke(255,0,0);
        rotate(i * TWO_PI/5);
        translate(0, l0);
        ellipse(0, 0, circleSize, circleSize);

        rotate(angle);
        for (var j = 0; j < 5; j++) {
            push();
            stroke(0);
            rotate(j * TWO_PI/5);
            translate(0,l1);
            ellipse(0, 0, circleSize, circleSize);

            rotate(angle);
            for (var k = 0; k < 5; k++) {
                push();
                stroke(0, 0, 255, 200);
                rotate(k* TWO_PI/5);
                translate(0,l2);
                ellipse(0, 0, circleSize, circleSize)
                pop();
            }

            pop();
        }

        pop();
    }

    // translate(0,l0);
    // rotate(angle);
    // ellipse(0, l1, circleSize, circleSize);
    //
    // translate(0,l1);
    // rotate(angle);
    // ellipse(0, l2, circleSize, circleSize);

    angle += speed;

}
