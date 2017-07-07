function setup() {
    createCanvas(640,480);
    background(255,0,123);
}

function draw() {
    if (mouseIsPressed) {
        fill(0);
    } else {
        fill(255);
    }
    stroke(0);
    ellipse(mouseX,mouseY,80,80);

    fill(255,191,0);
    noStroke();
    beginShape();
    vertex(100,240);
    vertex(200,180);
    vertex(220, 120);
    vertex(160,40);
    vertex(420,120);
    vertex(320,160);
    vertex(400,180);
    vertex(280,200);
    vertex(260,240);
    vertex(100,240);
    endShape();
    fill(0);
    ellipse(310,120,16,16);


}
