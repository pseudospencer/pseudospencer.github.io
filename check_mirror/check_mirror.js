var video;
var vScale = 16;
var checks = [];
var counter = 0;
var slider;


function setup() {
    // noCanvas();
    // createCanvas(640, 480);
    // pixelDensity(1); // correct for Retina display
    video = createCapture(VIDEO);
    video.size(640/vScale,480/vScale);
    video.position(0, 480);
    video.hide();

    slider = createSlider(0,255,127);
    slider.position(0, 510);

    for (var y = 0; y < video.height; y++){
        for (var x = 0; x < video.width; x++){
            checks[counter] = createCheckbox()
            checks[counter].position(x * vScale, y * vScale);

            counter++;
        }
    }

}

function draw() {

    counter = 0;
    video.loadPixels();

    for (var y = 0; y < video.height; y++){
        for (var x = 0; x < video.width; x++){
            var r = (video.width - x - 1 + (y * video.width)) * 4;
            var g = r + 1;
            var b = r + 2;
            var a = r + 3;

            var bright = (video.pixels[r] + video.pixels[g] + video.pixels[b])/3;

            var cutoff = slider.value();

            if (bright > cutoff) {
                checks[counter].checked(false);
            } else if (bright < cutoff) {
                checks[counter].checked(true);
            }

            counter ++;
        }
    }


}
