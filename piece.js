class piece {
    constructor(x, y, z, t) {
        console.log('New Piece Constructed...')
        this.x = x;
        this.y = y;
        this.z = z;
        this.t = t;
        this.blocks = this.createBlock(this.t);
        this.pivot = this.createPivot(this.t)
    }

    move(x, y, z) {
        for(let i=0; i<this.blocks.length; i++) {
            let ix = this.blocks[i].x;
            let iy = this.blocks[i].y;
            let iz = this.blocks[i].z;
            if (game.pit[iy+y][iz+z][ix+x] == 'W' || game.pit[iy+y][iz+z][ix+x] == 'B') {
                return false;
            }
        }
        this.x += x;
        this.y += y;
        this.z += z;
        for(let i=0; i<this.blocks.length; i++) {
            this.blocks[i].x += x;
            this.blocks[i].y += y;
            this.blocks[i].z += z;
        }
        this.pivot.x += x;
        this.pivot.y += y;
        this.pivot.z += z;
        return true;
    }

    getBlocks() {
        return this.blocks;
    }

    getWidth() {
        let minX = 9999;
        let maxX = -1;
        for(let i=0; i<this.blocks.length; i++) {
            if (this.blocks[i].x < minX)
                minX = this.blocks[i].x;
            if (this.blocks[i].x > maxX)
                maxX = this.blocks[i].x;
        }
        return maxX - minX + 1;
    }

    getDepth() {
        let minY = 9999;
        let maxY = -1;
        for(let i=0; i<this.blocks.length; i++) {
            if (this.blocks[i].y < minY)
                minY = this.blocks[i].y;
            if (this.blocks[i].y > maxY)
                maxY = this.blocks[i].y;
        }
        return maxY - minY + 1;
    }

    getHeight() {
        let minZ = 9999;
        let maxZ = -1;
        for(let i=0; i<this.blocks.length; i++) {
            if (this.blocks[i].z < minZ)
                minZ = this.blocks[i].z;
            if (this.blocks[i].z > maxZ)
                maxZ = this.blocks[i].z;
        }
        return maxZ - minZ + 1;
    }

    rotate(x, y, z) {
        let result = this.tryRotate(x, y, z, 0, 0, 0);
        switch(result) {
            case 'no prob':
            return true
            case 'hit left':
            this.tryRotate(x, y, z, 1, 0, 0);
            return true
            case 'hit right':
            this.tryRotate(x, y, z, -1, 0, 0);
            return true
            case 'hit up':
            this.tryRotate(x, y, z, 0, 0, 1);
            return true
            case 'hit down':
            this.tryRotate(x, y, z, 0, 0, -1);
            return true

        }
        return true
    }

    tryRotate(x, y, z, offX, offY, offZ) {
        let ix, iy, iz;
        this.move(offX, offY, offZ);
        this.forceRotate(x, y, z);
        for(let i=0; i<this.blocks.length; i++) {
            ix = this.blocks[i].x;
            iy = this.blocks[i].y;
            iz = this.blocks[i].z;
            if (game.pit[iy][iz][ix] == 'W' || game.pit[iy][iz][ix] == 'B') {
                // console.log('cannot rotate! hit the ' + game.pit[iy][ix]);
                this.move(-offX, -offY, -offZ);
                this.forceRotate(-x, -y, -z);
                break; 
            }
        }
        if (ix <= 0) return 'hit left';
        if (ix >= game.pitWidth-1) return 'hit right';
        if (iz <= 0) return 'hit up';
        if (iz >= game.pitHeight-1) return 'hit down';
        return 'no prob';
    }

    forceRotate(x, y, z) {
        console.log('rotate:', x, y, z);
        let axis = new THREE.Vector3( x, y, -z );
        for(let i=0; i<this.blocks.length; i++) {
            this.blocks[i].sub(this.pivot);
            this.blocks[i].applyAxisAngle(axis, Math.PI/2);
            this.blocks[i].add(this.pivot);
            this.blocks[i].round();
        }
        return true;
    }

    createBlock(t) {
        console.log('createBlock');
        let b0, b1, b2, b3;
        switch (t) {
            case 0: // single
                console.log('createBlock: single');
                b0 = new THREE.Vector3( this.x, this.y, this.z );
                return [b0];
                break;
            case 1: // double
                console.log('createBlock: double');
                b0 = new THREE.Vector3( this.x, this.y, this.z );
                b1 = new THREE.Vector3( this.x, this.y, this.z+1 );
                return [b0, b1];
                break;
            case 2: // corner
                console.log('createBlock: corner');
                b0 = new THREE.Vector3( this.x, this.y, this.z );
                b1 = new THREE.Vector3( this.x, this.y, this.z+1 );
                b2 = new THREE.Vector3( this.x+1, this.y, this.z );
                return [b0, b1, b2];
                break;
            case 3: // square
                console.log('createBlock: square');
                b0 = new THREE.Vector3( this.x, this.y, this.z );
                b1 = new THREE.Vector3( this.x, this.y, this.z+1 );
                b2 = new THREE.Vector3( this.x+1, this.y, this.z );
                b3 = new THREE.Vector3( this.x+1, this.y, this.z+1 );
                return [b0, b1, b2, b3];
                break;
            case 4: // n
                console.log('createBlock: n');
                b0 = new THREE.Vector3( this.x, this.y, this.z );
                b1 = new THREE.Vector3( this.x+1, this.y, this.z );
                b2 = new THREE.Vector3( this.x+1, this.y, this.z+1 );
                b3 = new THREE.Vector3( this.x+2, this.y, this.z+1 );
                return [b0, b1, b2, b3];
                break;
            case 5: // t
                console.log('createBlock: t');
                b0 = new THREE.Vector3( this.x, this.y, this.z );
                b1 = new THREE.Vector3( this.x, this.y, this.z+1 );
                b2 = new THREE.Vector3( this.x, this.y, this.z+2 );
                b3 = new THREE.Vector3( this.x+1, this.y, this.z+1 );
                return [b0, b1, b2, b3];
                break;
            case 6: // l
                console.log('createBlock: l');
                b0 = new THREE.Vector3( this.x, this.y, this.z );
                b1 = new THREE.Vector3( this.x, this.y, this.z+1 );
                b2 = new THREE.Vector3( this.x, this.y, this.z+2 );
                b3 = new THREE.Vector3( this.x+1, this.y, this.z );
                return [b0, b1, b2, b3];
                break;
            case 7: // line
                console.log('createBlock: line');
                b0 = new THREE.Vector3( this.x, this.y, this.z );
                b1 = new THREE.Vector3( this.x, this.y, this.z+1 );
                b2 = new THREE.Vector3( this.x, this.y, this.z+2 );
                return [b0, b1, b2];
                break;
        }
        return [];
    }

    createPivot(t) {
        console.log('createPivot');
        let px,py,pz;
        switch (t) {
            case 0: // single
                return new THREE.Vector3( this.x+0.5, this.y-0.5, this.z+0.5 );
                break;
            case 1: // double
                return new THREE.Vector3( this.x+0.5, this.y-0.5, this.z+0.5 );
                break;
            case 2: // corner
                return new THREE.Vector3( this.x+0.5, this.y-0.5, this.z+0.5 );
                break;
            case 3: // square
                return new THREE.Vector3( this.x+0.5, this.y-0.5, this.z+0.5 );
                break;
            case 4: // n
                return new THREE.Vector3( this.x+0.5, this.y-0.5, this.z+0.5 );
                break;
            case 5: // t
                return new THREE.Vector3( this.x+0.5, this.y-0.5, this.z+0.5 );
                break;
            case 6: // l
                return new THREE.Vector3( this.x+0.5, this.y-0.5, this.z+0.5 );
                break;
            case 7: // line
                return new THREE.Vector3( this.x+0.5, this.y-0.5, this.z+0.5 );
                break;
        }
        return null;
    }

    clone() {
        let newPiece = new piece(
            this.x,
            this.y,
            this.z,
            this.t
        );
        newPiece.blocks = this.blocks.slice(0);
        newPiece.pivot = this.pivot.clone();
        return newPiece;
    }
}