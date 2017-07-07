var maxModes = 5;
var mode = 0;
var factor = 50;
var wildCard = 500;
var diameter = factor * 1.5;

function setup() {
    createCanvas(windowWidth,windowHeight);
    noFill();
}

function draw() {
    background(255);

    if (mouseX != 0){
        factor = map(mouseX, 1, width, 10, 100);
    }

    if (mode == 0){
        // tallies
        for (var x = factor; x < width - factor; x += factor){
            for (var y = factor; y < height - factor; y += factor){
                stroke(0);
                strokeWeight(1);
                for (var i = 0; i < 16; i += 4){
                    if (y % wildCard == 0 && x % wildCard == 0){
                        stroke(255,0,0);
                    }
                    line(x + i, y, x + i, y + 12);
                }
                line(x, y, x + 12, y + 12);
            }
        }
    } else if (mode == 1) {
        // X's
        for (var x = factor; x < width - factor; x += factor){
            for (var y = factor; y < height - factor; y += factor){
                stroke(0);
                strokeWeight(1);
                if (y % wildCard == 0 && x % wildCard == 0){
                    stroke(255,0,0);
                }
                line(x, y, x + 12, y + 12);
                line(x, y + 12, x + 12, y);
            }
        }
    } else if (mode == 2) {
        // Shrinking plane
        for (var x = factor; x < width - factor; x += factor){
            for (var y = factor; y < height - factor; y += factor){
                stroke(0);
                strokeWeight(1);
                if (y % wildCard == 0 && x % wildCard == 0){
                    stroke(255,0,0);
                }
                line(x, y, width/2, height/2);
            }
        }
    } else if (mode == 3) {
        // Circles
        for (var x = factor; x < width - factor; x += factor){
            for (var y = factor; y < height - factor; y += factor){
                stroke(0);
                strokeWeight(1);
                if (y % wildCard == 0 && x % wildCard == 0){
                    stroke(255,0,0);
                }
                ellipse(x, y, diameter, diameter);
            }
        }
    } else if (mode == 4) {
        // Stroke Weight
        for (var x = factor; x < width - factor; x += factor){
            for (var y = factor; y < height - factor; y += factor){
                stroke(0);
                strokeWeight(x/33);
                if (y % wildCard == 0 && x % wildCard == 0){
                    stroke(255,0,0);
                }
                ellipse(x, y, diameter, diameter);
            }
        }
    }

}

function mousePressed() {
    mode += 1;
    if (mode == maxModes){
        mode = 0;
    }
}
