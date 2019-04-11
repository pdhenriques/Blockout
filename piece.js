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
        let b0 = new THREE.Vector3( this.x, this.y, this.z );
        // let b1 = new THREE.Vector3( this.x+1, this.y, this.z );
        // let b2 = new THREE.Vector3( this.x, this.y-1, this.z );
        return [b0];
    }

    // function(t) {
    //     switch (t) {
    //         case 0: // cube
    //             this.w = 2;
    //             break;
    //         case 1: // n1
    //             this.w = 2;
    //             break;
    //         case 2: // n2
    //             this.w = 2;
    //             break;
    //         case 3: // t
    //             this.w = 2;
    //             break;
    //         case 4: // l1
    //             this.w = 2;
    //             break;
    //         case 5: // l2
    //             this.w = 2;
    //             break;
    //         case 6: // line
    //             this.w = 1;
    //             break;
    //     }
    // }

}