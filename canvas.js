
if (WEBGL.isWebGLAvailable() === false) {
    document.body.appendChild(WEBGL.getWebGLErrorMessage());
}

var stats
var camera, scene, renderer;
var mouse, raycaster, plane;
var isShiftDown = false;
var rollOverMesh, cubeGeo, cubeMaterial;
var objects = [];

init();
animate();

function init() {

    stats = new Stats();
    stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild( stats.dom );
    
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x333333);

    // lights
    var ambientLight = new THREE.AmbientLight(0x606060);
    scene.add(ambientLight);
    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 0.75, 0.5).normalize();
    scene.add(directionalLight);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize, false);

    drawLine(-1000, 0, 0, 1000, 0, 0, 0xff0000);
    drawLine(0, -1000, 0, 0, 1000,  0, 0xffff00);
    drawLine(0, 0,-1000,  0, 0, 1000, 0x0000ff);

    game = new game(5, 5, 15);
    drawGame = new drawGame(100, 100, 100);
    game.start();
    
    controls();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
    event.preventDefault();

}

function onDocumentMouseDown(event) {
    event.preventDefault();

}

function onDocumentMouseUp(event) {
    event.preventDefault();
    // drawGame.adjustCameraPosition(camera);
}

function onDocumentKeyDown(event) {
    // console.log(event.keyCode);
    switch (event.keyCode) {
        case 37: game.moveLeft(); break;
        case 39: game.moveRight(); break;
        case 38: game.moveUp(); break;
        case 40: game.moveDown(); break;
        case 32: game.dropAll(); break;
        case 81: game.rotate(1, 0, 0); break;
        case 87: game.rotate(0, 0, 1); break;
        case 69: game.rotate(0, 1, 0); break;

    }
}

function onDocumentKeyUp(event) {
    switch (event.keyCode) {
        case 16: isShiftDown = false; break;
    }
}

function animate() {
    setTimeout( function() {
        
        requestAnimationFrame( animate );
        
    }, 1000 / 25 );
    
    stats.begin();
    // renderer.render();
    drawGame.updatePit();
    // controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
    render();
	stats.end();
}

function render() {
    renderer.render(scene, camera);
}

function controls() {
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('mouseup', onDocumentMouseUp, false);
    document.addEventListener('keydown', onDocumentKeyDown, false);
    document.addEventListener('keyup', onDocumentKeyUp, false);
    // controls
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 1;
    controls.screenSpacePanning = true;
    controls.minDistance = 1;
    controls.maxDistance = 9999999;
    controls.maxPolarAngle = Math.PI / 2;
    controls.target.set(150, 500, 150);
    drawGame.adjustCameraPosition(camera);
}
