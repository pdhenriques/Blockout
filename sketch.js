/////////////
// SETINGS //
/////////////

// Size of the Canvas
var canvasWidth = 1280;
var canvasHeight = 960;
// Size of the squares
// var widthUnit = 100;
// var heightUnit = 100;
// var depthUnit = 100;
// Size of the Pit
var pitWidth = 5;
var pitHeight = 5;
var pitDepth = 15;

// Internal stuff
var lastDraw;
let _text;


function preload() {
    fontReg = loadFont('fonts/Montserrat-Regular.ttf');
    fontBld = loadFont('fonts/Montserrat-Bold.ttf');
    fontBlk = loadFont('fonts/Montserrat-Black.ttf');
}

function setup() {
    frameRate(60);
    lastDraw = millis();
    createCanvas(canvasWidth, canvasHeight, WEBGL);
    pixelDensity(1);
    background(51);

    game = new game(pitWidth, pitHeight, pitDepth);
    game.start();
    drawGame = new drawGame(pitWidth, pitHeight, pitDepth);
}

function draw() {
    let dt = millis() - lastDraw;

    background(51);
    orbitControl();
    // push();
    // fill(255,0,0);
    // box(widthUnit);
    // pop();

    // text3d('Default project of Muad', 860,100);

    // translate(drawGame.widthUnit/2, drawGame.heightUnit/2, drawGame.depthUnit/2);
    translate(-pitWidth/2*drawGame.widthUnit, -pitHeight/2*drawGame.widthUnit, -(pitDepth)*drawGame.depthUnit+400);
    // translate(0, 0, -(pitDepth)*drawGame.depthUnit+400);
    drawGame.drawPit();
    text3d('fr', 200, 200);

    lastDraw = millis();
}

function text3d(t, x, y) {
    if (!_text) {
        _text = createGraphics(x, y);
        _text.background(102,102)
        _text.textFont(fontBlk);
        _text.textAlign(CENTER, CENTER);
        _text.textSize(60);
        _text.fill(255);
        _text.text(t, x/2, y/2 -8);
        console.log('created _text');
    }
    push();
    // translate(0, -height/2 + height/8);
	texture(_text);
    plane(x, y);
    pop();
}