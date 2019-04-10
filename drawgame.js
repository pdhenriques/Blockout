class drawGame {
    constructor() {

        // Size of the squares
        this.widthUnit = 100;
        this.heightUnit = 100;
        this.depthUnit = 100;
        // this.wallColor = color(100, 200, 100, 255);

        // wall
        var wallGeo = new THREE.BoxBufferGeometry(50, 50, 1);
        var wallMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, opacity: 0.5, transparent: true });
        this.wallMesh = new THREE.Mesh(wallGeo, wallMaterial);
    }

    drawPit() {
        // console.log('drawn pit');
        // console.log(game.pit);
        for (let d = 0; d < game.pit.length; d++) {
            let plane = game.pit[d];
            for (let h = 0; h < plane.length; h++) {
                let line = game.pit[d][h];
                for (let w = 0; w < line.length; w++) {
                    if (game.pit[d][h][w] == 'W') {
                        
                    }
                    if (game.pit[d][h][w] == 'A') {
                        
                    }
                    if (game.pit[d][h][w] == 'B') {
                        
                    }
                }
            }
        }
    }

    
    drawWall() {
        var size = 100;
        var x = 3; 
        var y = 3;
        var color = new THREE.Color( color !== undefined ? color : 0x55aa55 );
        // grid
        var wallGrid0 = new WallGrid(size, 3, 3, color);
        scene.add(wallGrid0);
        var wallGrid1 = new WallGrid(size, 10, 3, color);
        wallGrid1.rotateX(-Math.PI / 2);
        scene.add(wallGrid1);
        var wallGrid2 = new WallGrid(size, 10, 3, color);
        wallGrid2.rotateX(-Math.PI / 2);
        wallGrid2.rotateZ(-Math.PI / 2);
        scene.add(wallGrid2);
        var wallGrid3 = new WallGrid(size, 10, 3, color);
        wallGrid3.rotateX(-Math.PI / 2);
        wallGrid3.translateY(-size * 3);
        scene.add(wallGrid3);
        var wallGrid4 = new WallGrid(size, 10, 3, color);
        wallGrid4.rotateX(-Math.PI / 2);
        wallGrid4.rotateZ(-Math.PI / 2);
        wallGrid4.translateY(size * 3);
        scene.add(wallGrid4);
    }

    adjustCameraPosition(camera) {
        camera.position.set(this.widthUnit * 3/2, this.depthUnit * 15, this.heightUnit * 3/2);
        camera.rotation.set(-Math.PI/2, 0, 0);
    }
}

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

function WallGrid( size, x, y, color ) {

	size = size || 50;
	divisionsX = x || 10;
	divisionsY = y || 10;
	color = new THREE.Color( color !== undefined ? color : 0x444444 );

	lenX = size * divisionsX;
	lenY = size * divisionsY;
	centerX = divisionsX / 2;
	centerY = divisionsY / 2;

	var vertices = [], colors = [];

	for ( var i = 0, j = 0, kx = 0, ky = 0; i <= Math.max(divisionsX, divisionsY); i ++, kx += size, ky += size ) {

        if (i <= divisionsX) vertices.push( 0, 0, ky, lenY, 0, ky );
		if (i <= divisionsY) vertices.push( kx, 0, 0, kx, 0, lenX );

        color.toArray( colors, j ); j += 3;
		color.toArray( colors, j ); j += 3;
		color.toArray( colors, j ); j += 3;
		color.toArray( colors, j ); j += 3;

    }

    var geometry = new THREE.BufferGeometry();
	geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
	geometry.addAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );

	var material = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors } );

	THREE.LineSegments.call( this, geometry, material );

}

WallGrid.prototype = Object.assign( Object.create( THREE.LineSegments.prototype ), {

	constructor: WallGrid,

	copy: function ( source ) {

		THREE.LineSegments.prototype.copy.call( this, source );

		this.geometry.copy( source.geometry );
		this.material.copy( source.material );

		return this;

	},

	clone: function () {

		return new this.constructor().copy( this );

	}

} );