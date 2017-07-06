var smells = ["Acrid", "Agreeable", "Alluring", "Animal", "Aromatic", "Beautiful", "Bitter", "Clean", "Cloying", "Cold", "Comforting", "Cool", "Coppery", "Crisp", "Delicate", "Delicious", "Delightful", "Different", "Disagreeable", "Distinct", "Earthy", "Elusive", "Enticing", "Exotic", "Exquisite", "Faint", "Familiar", "Favorite", "Feminine", "Fine", "Floral", "Flowery", "Foul", "Fragrant", "Fresh", "Fruity", "Heady", "Heavy", "Herbal", "Hot", "Human", "Jasmine", "Keen", "Lavender", "Lemon", "Lemony", "Light", "Lilac", "Lingering", "Lovely", "Luscious", "Male", "Manly", "Masculine", "Mere", "Metallic", "Mingled", "Musky", "Musty", "Natural", "New", "Old", "Overpowering", "Overwhelming", "Own", "Particular", "Peculiar", "Pine", "Pleasant", "Pleasing", "Powerful", "Pungent", "Quick", "Rank", "Refreshing", "Resinous", "Rich", "Salty", "Same", "Seductive", "Sharp", "Sickly", "Slight", "Smoky", "Soft", "Soothing", "Sour", "Special", "Spicy", "Stale", "Strange", "Strong", "Subtle", "Sweet", "Tangy", "Tantalizing", "Telltale", "Thick", "True", "Unfamiliar", "Unique", "Unmistakable", "Unpleasant", "Warm", "Wild", "Womanly", "Wonderful", "Woodsy", "Woody", "Wrong"];

var tastes = [ "Acidic", "Acrid", "Aged", "Bitter", "Bittersweet", "Bland", "Burnt", "Buttery", "Chalky", "Cheesy", "Chewy", "Chocolaty", "Citrusy", "Cool", "Creamy", "Crispy", "Crumbly", "Crunchy", "Crusty", "Doughy", "Dry", "Earthy", "Eggy", "Fatty", "Fermented", "Fiery", "Fishy", "Fizzy", "Flakey", "Flat", "Flavorful", "Fresh", "Fried", "Fruity", "Full-bodied", "Gamey", "Elk", "Deer", "Garlicky", "Gelatinous", "Gingery", "Glazed", "Grainy", "Greasy", "Gooey", "Gritty", "Harsh", "Hearty", "Heavy", "Herbal", "Hot", "Icy", "Infused", "Juicy", "Lean", "Light", "Lemony", "Malty", "Mashed", "Meaty", "Mellow", "Mild", "Minty", "Moist", "Mushy", "Nutty", "Oily", "Oniony", "Overripe", "Pasty", "Peppery", "Pickled", "Plain", "Powdery", "Raw", "Refreshing", "Rich", "Ripe", "Roasted", "Robust", "Rubbery", "Runny", "Salty", "Sautéed", "Savory", "Seared", "Seasoned", "Sharp", "Silky", "Slimy", "Smokey", "Smothered", "Smooth", "Soggy", "Soupy", "Sour", "Spicy", "Spongy", "Stale", "Sticky", "Stale", "Stringy", "Strong", "Sugary", "Sweet", "Sweet-and-sour", "Syrupy", "Tangy", "Tart", "Tasteless", "Tender", "Toasted", "Tough", "Unflavored", "Unseasoned", "Velvety", "Vinegary", "Watery", "Whipped", "Woody", "Yeasty", "Zesty", "Zingy"];

var canvas;
var greeting, naming, tasting, smelling;
var maxLayers = 3;
var layers = [];
var maxSprinkles = 15;
var sprinkles = [];
var frosting;

var keepFrameCount;

var moveButton;
var movement = true;

var newButton;

function setup() {
    canvas = createCanvas(400, 400, WEBGL);

    greeting = createElement("h2", "Happy Birthday! Enjoy your cake!");
    greeting.position(20,5);
    naming = createP(" ");
    tasting = createP(" ");
    smelling = createP(" ");

    moveButton = createButton("Toggle Cake Movement");
    moveButton.position(20,380);
    moveButton.mousePressed(toggleMovement);

    newButton = createButton("I want a different cake.");
    newButton.position(moveButton.x + moveButton.width + 20, 380);
    newButton.mousePressed(newCake);

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
    background(225);

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

    this.render = function(index) {
        // always render with layers
        push();
            translate(0, -(30 + 20 * index)/2 , 0);
            rotateX(radians(90));
            specularMaterial(this.r, this.g, this.b);
            this.radius = 50 + 20 * index;
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

    this.render = function() {
        push();
            rotateY(this.angle);
            translate(this.xOffset, this.yOffset, this.zOffset);
            normalMaterial();
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

    this.render = function() {
        push();
            translate(0, this.yOffset, 0);
            specularMaterial(this.r, this.g, this.b);
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
    var cakeMessage = "Name: ";
    var flavorMessage = "Tastes: ";
    var smellMessage = "Smells: ";
    for (var i = 0; i< layers.length; i++) {
        cakeMessage += layers[i].colorName + " ";
        flavorMessage += layers[i].taste + ", ";
        smellMessage += layers[i].smell + ", ";
    }
    cakeMessage += "Cake with ";
    cakeMessage += frosting.colorName;
    cakeMessage += " Frosting and Rainbow Sprinkles";
    flavorMessage = flavorMessage.slice(0,-2);
    smellMessage = smellMessage.slice(0,-2);

    naming.html(cakeMessage);
    smelling.html(smellMessage);
    tasting.html(flavorMessage);
    // offscreenRender.background(225,0,0,0);
    // offscreenRender.text(cakeMessage, 10, 10, 275, 200);
    // offscreenRender.text(flavorMessage, 10, 100, 275, 200);
    // offscreenRender.text(smellMessage, 10, 200, 275, 200);
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
