class drawGame {
    constructor(blockWidth, blockDepth, blockHeight) {

        // Size of the squares
        this.widthUnit = blockWidth;
        this.depthUnit = blockDepth;
        this.heightUnit = blockHeight;
        // this.wallColor = color(100, 200, 100, 255);

        // block
        this.blockGeo = new THREE.BoxBufferGeometry(this.widthUnit, this.depthUnit, this.heightUnit);
        this.blockMaterial = new THREE.MeshLambertMaterial({ color: 0x55aaaa, opacity: 0.3, transparent: true });

        // active piece
        this.activePiece = [];

        this.adjustCameraPosition(camera);
        this.drawWalls();
        this.drawPit();
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
                        // this.createBlock(w, h, d)
                    }
                    if (game.pit[d][h][w] == 'A') {
                        // this.createBlock(w, h, d)
                    }
                    if (game.pit[d][h][w] == 'B') {
                        this.createBlock(w, h, d);
                    }
                }
            }
        }
    }

    createBlock(w, h, d) {
        var voxel = new THREE.Mesh(this.blockGeo, this.blockMaterial);
        voxel.position.set((w-1) * this.widthUnit, (d-1) * this.depthUnit, (h-1) * this.heightUnit);
        // snaping thingy
        // voxel.position.divideScalar(100).floor().multiplyScalar(100).addScalar(50);
        voxel.translateX( this.widthUnit / 2 );
        voxel.translateY( this.depthUnit / 2 );
        voxel.translateZ( this.heightUnit / 2 );
        voxel.name = 'block';
        scene.add(voxel);
        return voxel;
    }
    
    updateBlock(b, w, d, h) {
        b.position.set((w-1) * this.widthUnit, (d-1) * this.depthUnit, (h-1) * this.heightUnit);
        b.translateX( this.widthUnit / 2 );
        b.translateY( this.depthUnit / 2 );
        b.translateZ( this.heightUnit / 2 );
    }
    
    createActivePiece(p) {
        console.log('# new block mesh');
        this.activePiece = [];
        for(let i=0; i<p.blocks.length; i++) {
            let w = p.blocks[i].x;
            let d = p.blocks[i].y;
            let h = p.blocks[i].z;
            let blk = this.createBlock(w, d, h);
            this.activePiece.push(blk);
        }
    }

    updateActivePiece() {

        for(let i=0; i<game.activePiece.blocks.length; i++) {
            let w = game.activePiece.blocks[i].x;
            let d = game.activePiece.blocks[i].y;
            let h = game.activePiece.blocks[i].z;
            let blk = this.updateBlock(this.activePiece[i], w, d, h);
            
        }
    }

    updatePit() {
        console.log('updatePit');
        for (let i = scene.children.length-1; i >= 0 ; i--) {
            if (scene.children[i].name == 'block') {
                scene.remove(scene.children[i]);
            }
        }
        this.drawPit();
    }

    drawWalls() {
        var w = game.pitWidth-2; 
        var h = game.pitHeight-2;
        var d = game.pitDepth-1;
        var color = new THREE.Color( color !== undefined ? color : 0x55aa55 );
        // grid
        var wallGrid0 = new WallGrid(w, h, this.widthUnit, this.heightUnit, color);
        scene.add(wallGrid0);
        var wallGrid1 = new WallGrid(w, d, this.widthUnit, this.depthUnit, color);
        wallGrid1.rotateX(-Math.PI / 2);
        scene.add(wallGrid1);
        var wallGrid2 = new WallGrid(d, h, this.depthUnit, this.heightUnit, color);
        wallGrid2.rotateZ(Math.PI / 2);
        scene.add(wallGrid2);
        var wallGrid3 = new WallGrid(w, d, this.widthUnit, this.depthUnit, color);
        wallGrid3.rotateX(-Math.PI / 2);
        wallGrid3.translateY(-this.heightUnit * h);
        scene.add(wallGrid3);
        var wallGrid4 = new WallGrid(d, h, this.depthUnit, this.heightUnit, color);
        wallGrid4.rotateZ(Math.PI / 2);
        wallGrid4.translateY(-this.widthUnit * w);
        scene.add(wallGrid4);
    }

    adjustCameraPosition(camera) {
        camera.position.set(
            this.widthUnit * (game.pitWidth-2)/2, 
            this.depthUnit * (game.pitDepth+0) + 250, 
            this.heightUnit * (game.pitHeight-2)/2
        );
        camera.rotation.set(-Math.PI/2, 0, 0);
    }
}

////////////////////////////////////////////////////////////////////////
//////////    HELPER FUNCTIONS    //////////////////////////////////////
////////////////////////////////////////////////////////////////////////

function WallGrid( x, y, sizeX, sizeY, color ) {

	sizeX = sizeX || 50;
	sizeY = sizeY || 50;
	divisionsX = x || 10;
	divisionsY = y || 10;
	color = new THREE.Color( color !== undefined ? color : 0x444444 );

	lenX = sizeX * divisionsX;
    lenY = sizeY * divisionsY;
	var vertices = [], colors = [];

	for ( var i = 0, j = 0, kx = 0, ky = 0; i <= Math.max(divisionsX, divisionsY); i++, kx += sizeX, ky += sizeY ) {

		if (i <= divisionsY) vertices.push( 0, 0, ky, lenX, 0, ky );
        if (i <= divisionsX) vertices.push( kx, 0, 0, kx, 0, lenY );

        // horizontal lines
        color.toArray( colors, j ); j += 3;
        color.toArray( colors, j ); j += 3;
        // vertical lines
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

function drawLine(x1, y, z1, x2, y2, z2, _color) {
    var material = new THREE.LineBasicMaterial({
        color: _color
    });
    
    var geometry = new THREE.Geometry();
    geometry.vertices.push(
        new THREE.Vector3( x1, y, z1 ),
        new THREE.Vector3( x2, y2, z2 )
    );
    
    var line = new THREE.Line( geometry, material );
    scene.add( line );
}