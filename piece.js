class piece {
    constructor(x, y, z, r, t) {
        console.log('New Piece Constructed...')
        this.x = x;
        this.y = y;
        this.z = z;
        this.r = r;
        this.t = t;
        this.blocks = this.createBlock(this.t,this.r);
        this.w = this.getWidth();
        this.d = this.getDepth();
        this.h = this.getHeight();
    }

    updateBlock() {
        this.blocks = this.createBlock(this.t,this.r);
        this.w = this.getWidth();
        this.d = this.getDepth();
        this.h = this.getHeight();
    }

    moveLeft() {
        for(let i=0; i<this.blocks.length; i++) {
            let ix = this.blocks[i].x;
            let iy = this.blocks[i].y;
            let iz = this.blocks[i].z;
            if (game.pit[iy][iz][ix-1] == 'W' || game.pit[iy][iz][ix-1] == 'B') {
                return false;
            }
        }
        this.x -= 1;
        this.updateBlock();
        return true;
    }

    moveRight() {
        for(let i=0; i<this.blocks.length; i++) {
            let ix = this.blocks[i].x;
            let iy = this.blocks[i].y;
            let iz = this.blocks[i].z;
            if (game.pit[iy][iz][ix+1] == 'W' || game.pit[iy][iz][ix+1] == 'B') {
                return false;
            }
        }
        this.x += 1;
        this.updateBlock();
        return true;
    }

    moveUp() {
        for(let i=0; i<this.blocks.length; i++) {
            let ix = this.blocks[i].x;
            let iy = this.blocks[i].y;
            let iz = this.blocks[i].z;
            if (game.pit[iy][iz-1][ix] == 'W' || game.pit[iy][iz-1][ix] == 'B') {
                return false;
            }
        }
        this.z -= 1;
        this.updateBlock();
        return true;
    }

    moveDown() {
        for(let i=0; i<this.blocks.length; i++) {
            let ix = this.blocks[i].x;
            let iy = this.blocks[i].y;
            let iz = this.blocks[i].z;
            if (game.pit[iy][iz+1][ix] == 'W' || game.pit[iy][iz+1][ix] == 'B') {
                return false;
            }
        }
        this.z += 1;
        this.updateBlock();
        return true;
    }

    rotate() {
        let newR = (this.r + 1) % 4;
        
        let allowRotate = this.tryRotate(0);
        // if can't rotate try one spot to the left
        if (allowRotate == false) {
            allowRotate =  this.tryRotate(-1);
            if (allowRotate) {
                this.x -= 1;
            }
        }
        // if can't rotate try one spot to the right
        if (allowRotate == false) {
            allowRotate =  this.tryRotate(1);
            if (allowRotate) {
                this.x += 1;
            }
        }
        // if can't rotate the big line try 2 spots to the left
        if (allowRotate == false && this.t == 6) {
            allowRotate =  this.tryRotate(-2);
            if (allowRotate) {
                this.x -= 2;
            }
        }
        // if can't rotate the big line try 3 spots to the left
        if (allowRotate == false && this.t == 6) {
            allowRotate =  this.tryRotate(-3);
            if (allowRotate) {
                this.x -= 3;
            }
        }
        if (allowRotate) {
            this.r = newR;
            this.updateBlock();
            return true;
        }
        return false;
    }

    tryRotate(offX) {
        let newR = (this.r + 1) % 4;
        let rotatedPiece = this.createBlock(this.t,newR);
        for(let i=0; i<rotatedPiece.length; i++) {
            let ix = rotatedPiece[i].x+offX;
            let iy = rotatedPiece[i].y;
            if (game.pit[iy][ix] == 'W' || game.pit[iy][ix] == 'B') {
                // console.log('cannot rotate! hit the ' + game.pit[iy][ix]);
                return false;
            }
        }
        return true;
    }

    drop() {
        for(let i=0; i<this.blocks.length; i++) {
            let ix = this.blocks[i].x;
            let iy = this.blocks[i].y;
            let iz = this.blocks[i].z;
            if (game.pit[iy-1][iz][ix] == 'W' || game.pit[iy-1][iz][ix] == 'B') {
                return false;
            }
        }
        this.y -= 1;
        this.updateBlock();
        return true;
    }

    getBlocks() {
        return this.blocks;
    }

    getWidth() {
        let maxX = -1;
        for(let i=0; i<this.blocks.length; i++) {
            if (this.blocks[i].x > maxX)
                maxX = this.blocks[i].x;
        }
        return maxX;
    }

    getDepth() {
        let maxY = -1;
        for(let i=0; i<this.blocks.length; i++) {
            if (this.blocks[i].y > maxY)
                maxY = this.blocks[i].y;
        }
        return maxY;
    }

    getHeight() {
        let maxZ = -1;
        for(let i=0; i<this.blocks.length; i++) {
            if (this.blocks[i].z > maxZ)
                maxZ = this.blocks[i].z;
        }
        return maxZ;
    }

    createBlock(t,r) {
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
                b1 = new THREE.Vector3( this.x, this.y, this.z-1 );
                return [b0, b1];
                break;
            case 2: // corner
                console.log('createBlock: corner');
                b0 = new THREE.Vector3( this.x, this.y, this.z );
                b1 = new THREE.Vector3( this.x, this.y, this.z-1 );
                b2 = new THREE.Vector3( this.x+1, this.y, this.z );
                return [b0, b1, b2];
                break;
            case 3: // square
                console.log('createBlock: square');
                b0 = new THREE.Vector3( this.x, this.y, this.z );
                b1 = new THREE.Vector3( this.x, this.y, this.z-1 );
                b2 = new THREE.Vector3( this.x+1, this.y, this.z );
                b3 = new THREE.Vector3( this.x+1, this.y, this.z-1 );
                return [b0, b1, b2, b3];
                break;
            case 4: // n
                console.log('createBlock: n');
                b0 = new THREE.Vector3( this.x, this.y, this.z );
                b1 = new THREE.Vector3( this.x, this.y, this.z-1 );
                b2 = new THREE.Vector3( this.x+1, this.y, this.z-1 );
                b3 = new THREE.Vector3( this.x+1, this.y, this.z-2 );
                return [b0, b1, b2, b3];
                break;
            case 5: // t
                console.log('createBlock: t');
                b0 = new THREE.Vector3( this.x, this.y, this.z );
                b1 = new THREE.Vector3( this.x, this.y, this.z-1 );
                b2 = new THREE.Vector3( this.x, this.y, this.z-2 );
                b3 = new THREE.Vector3( this.x+1, this.y, this.z-1 );
                return [b0, b1, b2, b3];
                break;
            case 6: // l
                console.log('createBlock: l');
                b0 = new THREE.Vector3( this.x, this.y, this.z );
                b1 = new THREE.Vector3( this.x, this.y, this.z-1 );
                b2 = new THREE.Vector3( this.x, this.y, this.z-2 );
                b3 = new THREE.Vector3( this.x+1, this.y, this.z );
                return [b0, b1, b2, b3];
                break;
            case 7: // line
                console.log('createBlock: line');
                b0 = new THREE.Vector3( this.x, this.y, this.z );
                b1 = new THREE.Vector3( this.x, this.y, this.z-1 );
                b2 = new THREE.Vector3( this.x, this.y, this.z-2 );
                return [b0, b1, b2];
                break;
        }
        return [];
    }

}