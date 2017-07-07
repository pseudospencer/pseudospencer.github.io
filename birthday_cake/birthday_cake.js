var smells = ["Acrid", "Agreeable", "Alluring", "Animal", "Aromatic", "Beautiful", "Bitter", "Clean", "Cloying", "Cold", "Comforting", "Cool", "Coppery", "Crisp", "Delicate", "Delicious", "Delightful", "Different", "Disagreeable", "Distinct", "Earthy", "Elusive", "Enticing", "Exotic", "Exquisite", "Faint", "Familiar", "Favorite", "Feminine", "Fine", "Floral", "Flowery", "Foul", "Fragrant", "Fresh", "Fruity", "Heady", "Heavy", "Herbal", "Hot", "Human", "Jasmine", "Keen", "Lavender", "Lemon", "Lemony", "Light", "Lilac", "Lingering", "Lovely", "Luscious", "Male", "Manly", "Masculine", "Mere", "Metallic", "Mingled", "Musky", "Musty", "Natural", "New", "Old", "Overpowering", "Overwhelming", "Own", "Particular", "Peculiar", "Pine", "Pleasant", "Pleasing", "Powerful", "Pungent", "Quick", "Rank", "Refreshing", "Resinous", "Rich", "Salty", "Same", "Seductive", "Sharp", "Sickly", "Slight", "Smoky", "Soft", "Soothing", "Sour", "Special", "Spicy", "Stale", "Strange", "Strong", "Subtle", "Sweet", "Tangy", "Tantalizing", "Telltale", "Thick", "True", "Unfamiliar", "Unique", "Unmistakable", "Unpleasant", "Warm", "Wild", "Womanly", "Wonderful", "Woodsy", "Woody", "Wrong"];

var tastes = [ "Acidic", "Acrid", "Aged", "Bitter", "Bittersweet", "Bland", "Burnt", "Buttery", "Chalky", "Cheesy", "Chewy", "Chocolaty", "Citrusy", "Cool", "Creamy", "Crispy", "Crumbly", "Crunchy", "Crusty", "Doughy", "Dry", "Earthy", "Eggy", "Fatty", "Fermented", "Fiery", "Fishy", "Fizzy", "Flakey", "Flat", "Flavorful", "Fresh", "Fried", "Fruity", "Full-bodied", "Gamey", "Elk", "Deer", "Garlicky", "Gelatinous", "Gingery", "Glazed", "Grainy", "Greasy", "Gooey", "Gritty", "Harsh", "Hearty", "Heavy", "Herbal", "Hot", "Icy", "Infused", "Juicy", "Lean", "Light", "Lemony", "Malty", "Mashed", "Meaty", "Mellow", "Mild", "Minty", "Moist", "Mushy", "Nutty", "Oily", "Oniony", "Overripe", "Pasty", "Peppery", "Pickled", "Plain", "Powdery", "Raw", "Refreshing", "Rich", "Ripe", "Roasted", "Robust", "Rubbery", "Runny", "Salty", "Sautéed", "Savory", "Seared", "Seasoned", "Sharp", "Silky", "Slimy", "Smokey", "Smothered", "Smooth", "Soggy", "Soupy", "Sour", "Spicy", "Spongy", "Sticky", "Stale", "Stringy", "Strong", "Sugary", "Sweet", "Sweet-and-sour", "Syrupy", "Tangy", "Tart", "Tasteless", "Tender", "Toasted", "Tough", "Unflavored", "Unseasoned", "Velvety", "Vinegary", "Watery", "Whipped", "Woody", "Yeasty", "Zesty", "Zingy"];

// Elements
var div;
var canvas;
var greeting, naming, tasting, smelling;
var moveButton;
var newButton;
var effect1Btn;
var effect2Btn;
var effect3Btn;
var effect4Btn;
// Objects
var maxLayers = 3;
var layers = [];
var maxSprinkles = 15;
var sprinkles = [];
var frosting;
// Global Vars
var left = 40;
var movement = true;
var keepFrameCount;
// Image
var frostingImg;

function setup() {
    div = createDiv("");
    div.style("background-image", "url( 'https://c1.staticflickr.com/9/8290/7601842990_163aa1d4ee_b.jpg')");
    div.style("background-size", "contain");
    div.size(450, 540);

    div.style("font-family",'Permanent Marker');
    greeting = createElement("h2", "Happy Birthday! Enjoy your cake!");
    greeting.position(left,-12);
    greeting.parent(div);

    canvas = createCanvas(400, 400, WEBGL);
    canvas.parent(div);
    canvas.position(left, greeting.y + greeting.height + 20);

    moveButton = createButton("Toggle Cake Movement");
    moveButton.position(left, canvas.y + canvas.height - moveButton.height);
    moveButton.mousePressed(toggleMovement);

    var btnHeight = canvas.y + canvas.height - moveButton.height;
    var spacing = 4

    effect1Btn = createButton("1");
    effect1Btn.position(moveButton.x + moveButton.width + spacing, btnHeight);
    effect1Btn.mousePressed(effect1);

    effect2Btn = createButton("2");
    effect2Btn.position(effect1Btn.x + effect1Btn.width + spacing, btnHeight);
    effect2Btn.mousePressed(effect2);

    effect3Btn = createButton("3");
    effect3Btn.position(effect2Btn.x + effect2Btn.width + spacing, btnHeight);
    effect3Btn.mousePressed(effect3);

    effect4Btn = createButton("4");
    effect4Btn.position(effect3Btn.x + effect3Btn.width + spacing, btnHeight);
    effect4Btn.mousePressed(effect4);

    newButton = createButton("I want a different cake.");
    newButton.position(effect4Btn.x + effect4Btn.width + spacing, btnHeight);
    newButton.mousePressed(newCake);

    naming = createP(" ");
    naming.parent(div);
    naming.style("width", "400");
    naming.position(left + 5, btnHeight + 10);

    tasting = createP(" ");
    tasting.parent(div);
    tasting.position(left + 5, naming.y + naming.height + 50);

    smelling = createP(" ");
    smelling.parent(div);
    smelling.position(left + 5, tasting.y + tasting.height + 25);

    frosting = new Frosting();

    for (var i = 0; i< maxLayers; i++) {
        layers[i] = new Layer(i);
    }
    for (var i = 0; i< maxSprinkles; i++) {
        sprinkles[i] = new Sprinkle(i);
    }

    createCakeMessage();

}

function draw() {
    // background(235,233, 233);
    handleLight();
    handleMovement();

    for (var i = 0; i< sprinkles.length; i++) {
        sprinkles[i].render();
    }

    for (var i = 0; i< layers.length; i++) {
        layers[i].render();
    }

}

function Frosting() {
    // Color
    this.r = floor(random(255));
    this.g = floor(random(255));
    this.b = floor(random(255));
    this.hex = rgbToHex(this.r, this.g, this.b);
    // Descriptors
    this.colorName = ntc.name(this.hex)[1];
    this.maxThickness = 5;
    this.minThickness = 2;
    this.thickness = random(this.minThickness, this.maxThickness);
    // Effects
    this.effect1 = false;

    this.render = function(index) {
        // always render with layers
        push();
            translate(0, -(30 + 20 * index)/2 , 0);
            rotateX(radians(90));
            specularMaterial(this.r, this.g, this.b);
            if (this.effect1){
                this.radius = (sin(frameCount * 0.1) * 100) + 50 + (20 * index);
            } else {
                this.radius = 50 + 20 * index;
            }
            torus(this.radius, this.thickness);
        pop();
    }

    this.randomize = function() {
        this.r = floor(random(255));
        this.g = floor(random(255));
        this.b = floor(random(255));
        this.hex = rgbToHex(this.r, this.g, this.b);
        this.colorName = ntc.name(this.hex)[1];
        this.thickness = random(this.minThickness, this.maxThickness);
    }
}

function Sprinkle(index) {
    this.index = index;
    // Dimensions
    this.xRad = random(3,9);
    this.yRad = random(4,7);
    this.zRad = random(2,4);
    this.xOffset = random(30);
    this.yOffset = -15 - this.yRad/2;
    this.zOffset = 0;
    this.angle = radians(random(360));
    // Effects
    this.effect2 = false;

    this.render = function() {
        push();
            rotateY(this.angle);
            translate(this.xOffset, this.yOffset, this.zOffset);
            normalMaterial();
            if (this.effect2) {
                translate(0,-10, 0);
                translate(sin(frameCount * 0.01) * 100, sin(frameCount * 0.01) * 100, sin(frameCount * 0.01) * 100);
                rotateZ(frameCount * 0.002);
            }
            ellipsoid(this.xRad, this.yRad, this.zRad);
        pop();
    }

    this.randomize = function() {
        this.xRad = random(3,9);
        this.yRad = random(4,7);
        this.zRad = random(2,4);
        this.xOffset = random(30);
        this.yOffset = -15 - this.yRad/2;
        this.zOffset = 0;
        this.angle = radians(random(360));
    }
}

function Layer(index) {
    this.index = index;
    // Dimensions
    this.height = 30 + 20 * this.index;
    this.radius = 50 + 20 * this.index;
    this.yOffset = 0;
    for (var i = this.index; i > 0; i--) {
        this.yOffset += 30 + 20 * (i - 1);
    }
    // Color
    this.r = floor(random(255));
    this.g = floor(random(255));
    this.b = floor(random(255));
    this.hex = rgbToHex(this.r, this.g, this.b);
    // Descriptors
    this.colorName = ntc.name(this.hex)[1];
    this.taste = random(tastes);
    this.smell = random(smells);
    // Effects
    this.effect3 = false;
    this.effect4 = false;

    this.render = function() {
        push();
            translate(0, this.yOffset, 0);
            specularMaterial(this.r, this.g, this.b);
            if (this.effect3){
                this.yOffset = sin(frameCount * 0.01) * 100 * -index;
            } else if (!this.effect3) {
                // reset the yOffset
                this.yOffset = 0;
                for (var i = this.index; i > 0; i--) {
                    this.yOffset += 30 + 20 * (i - 1);
                }
            }
            if (this.effect4) {
                if (this.index == 1){
                    rotateZ(frameCount * 0.1);
                } else if (this.index == 2) {
                    rotateX(frameCount * 0.1);
                    translate(0, sin(frameCount * 0.01) * 100), 0;
                } else if (this.index == 0) {
                    this.radius = sin(frameCount * 0.01) * 100;
                }
            } else if (!this.effect4) {
                this.radius = 50 + 20 * this.index;
            }
            cylinder(this.radius, this.height);
        pop();
        push();
            translate(0, this.yOffset, 0);
            frosting.render(this.index);
        pop();
    }

    this.randomize = function() {
        this.r = floor(random(255));
        this.g = floor(random(255));
        this.b = floor(random(255));
        this.hex = rgbToHex(this.r, this.g, this.b);
        this.colorName = ntc.name(this.hex)[1];
        this.taste = random(tastes);
        this.smell = random(smells);
    }

}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function toggleMovement() {
    movement = !movement;
}

function handleMovement() {
    if (movement){
        rotateY(frameCount * 0.01);
        rotateZ(frameCount * 0.01);
        getFrameCount = frameCount;
    } else {
        rotateY(getFrameCount * 0.01);
        rotateZ(getFrameCount * 0.01);
    }
}

function handleLight() {
    var locY = (mouseY / height - 0.5) * (-2);
    var locX = (mouseX / width - 0.5) * 2;

    ambientLight(255, 255, 255);
    pointLight(200, 200, 200, locX, locY, 0);
}

function createCakeMessage() {
    var cakeMessage = "<strong>Name:</strong> ";
    var flavorMessage = "<strong>Tastes:</strong> ";
    var smellMessage = "<strong>Smells:</strong> ";
    for (var i = 0; i< layers.length; i++) {
        cakeMessage += layers[i].colorName + " ";
        flavorMessage += layers[i].taste + ", ";
        smellMessage += layers[i].smell + ", ";
    }
    cakeMessage += "Cake with ";
    cakeMessage += frosting.colorName;
    cakeMessage += " Frosting";
    flavorMessage = flavorMessage.slice(0,-2);
    smellMessage = smellMessage.slice(0,-2);

    naming.html(cakeMessage);
    smelling.html(smellMessage);
    tasting.html(flavorMessage);
}

function newCake() {
    frosting.randomize();

    for (var i = 0; i< sprinkles.length; i++) {
        sprinkles[i].randomize();
        sprinkles[i].render();
    }

    for (var i = 0; i< layers.length; i++) {
        layers[i].randomize();
        layers[i].render();
    }
    createCakeMessage();
}

function effect1() {
    frosting.effect1 = !frosting.effect1;
    if (frosting.effect1) {
        effect1Btn.style("background-color", "#abc6f2");
    } else {
        effect1Btn.style("background-color", "");
    }
}

function effect2() {
    for (var i = 0; i< sprinkles.length; i++) {
        sprinkles[i].effect2 = !sprinkles[i].effect2;
    }
    if (sprinkles[0].effect2) {
        effect2Btn.style("background-color", "#abc6f2");
    } else {
        effect2Btn.style("background-color", "");
    }
}

function effect3() {
    for (var i = 0; i< layers.length; i++) {
        layers[i].effect3 = !layers[i].effect3;
    }
    if (layers[0].effect3) {
        effect3Btn.style("background-color", "#abc6f2");
    } else {
        effect3Btn.style("background-color", "");
    }
}

function effect4() {
    for (var i = 0; i< layers.length; i++) {
        layers[i].effect4 = !layers[i].effect4
    }
    if (layers[0].effect4) {
        effect4Btn.style("background-color", "#abc6f2");
    } else {
        effect4Btn.style("background-color", "");
    }
}
