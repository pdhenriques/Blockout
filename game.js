// GAMEDATA                 // GAMESTATE
// W = wall                 // start
// . = Empty                // run
// A = Active Block         // over
// B = Passive Block        

class game {
    
    constructor(w, h, d) {
        this.state = 'start';
        this.pitWidth = w;
        this.pitHeight = h;
        this.pitDepth = d;
        this.pit = [];
        
        
        this.fillPit(w, h, d);
        this.activePiece;
        this.nextPiece;
    }

    start() {
        console.log('start');
        this.fillPit(this.pitWidth, this.pitHeight, this.pitDepth);
        this.state = 'run';
        this.spawnNextPiece();
        this.spawnPiece();
    }

    stop() {
        console.log('over');
        this.state = 'over';
    }

    fillPit(x, y, z) {
        this.pit = [];
        this.pit.push(this.wallPlane(x, y));
        for(let i=0; i<z-1; i++) {
            this.pit.push(this.fillPlane(x, y));
        }
    }

    fillPlane(x, y) {
        let plane = [];
        plane.push(this.wallLine(x));
        for(let i=1; i<y-1; i++) {
            plane.push(this.fillLine(x));
        }
        plane.push(this.wallLine(x));
        return plane;
    }

    fillLine(x) {
        let line = [];
        line.push('W');
        for(let i=1; i<x-1; i++) {
            if (Math.random(1) < 0.05) {
                line[i] = '.';
            } else {
                line[i] = '.';
            }
        }
        line.push('W');
        return line;
    }

    wallPlane(x, y) {
        let plane = [];
        for(let i=0; i<y; i++) {
            plane.push(this.wallLine(x));
        }
        return plane;
    }

    wallLine(x) {
        let line = [];
        for(let i=0; i<x; i++) {
            line[i] = 'W';
        }
        return line;
    }

    
    spawnPiece() {
        this.activePiece = this.nextPiece;
        this.spawnNextPiece();
        // if (this.checkGameOver()) {
        //     console.log('gameover!');
        //     this.stop();
        //     return;
        // } 
        this.updateActivePiece();
    }

    spawnNextPiece() {
        let p = Math.floor(Math.random(7));
        this.nextPiece = new piece(1,14,3,0,p);
    }

    updateActivePiece() {
        for (let d = 0; d < this.pit.length; d++) {
            let plane = this.pit[d];
            for (let h = 0; h < plane.length; h++) {
                let line = this.pit[d][h];
                for (let w = 0; w < line.length; w++) {
                    if(line[w] == 'A') line[w] = '.';
                }
            }
        }
        
        let activeBlocks = this.activePiece.getBlocks();
        for(let i=0; i<activeBlocks.length; i++) {
            let av = activeBlocks[i];
            this.pit[av.y][av.z][av.x] = 'A';
        }
    }

}