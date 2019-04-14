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
        // console.log('new game!', this.pit);
    }

    start() {
        // console.log('start');
        this.fillPit(this.pitWidth, this.pitHeight, this.pitDepth);
        this.state = 'run';
        gameStats.reset();
        this.spawnNextPiece();
        this.spawnPiece();
    }

    stop() {
        // console.log('over');
        this.state = 'over';
        eventSendScore();
        requestLeaderboard();
        drawUI.gameOver();
    }

    togglePause() {
        // console.log('pause');
        if (this.state == 'run') {
            this.state = 'pause';
            drawUI.pause();
        } else if (this.state == 'pause') {
            this.state = 'run';
            drawUI.unPause();
        }
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
        // drawGame.createActivePiece(this.activePiece);
        if (this.checkGameOver()) {
            // console.log('gameover!');
            this.stop();
            return;
        } 
        this.updateActivePiece();
    }

    spawnNextPiece() {
        let p = Math.floor(Math.random()*8);
        this.nextPiece = new piece(1,13,1,p);
    }

    checkGameOver() {
        let newPiece = this.activePiece.getBlocks();
        for(let i=0; i<newPiece.length; i++) {
            let ix = newPiece[i].x;
            let iy = newPiece[i].y;
            let iz = newPiece[i].z;
            if (this.pit[iy][iz][ix] == 'B') {
                return true;
            }
        }
        return false;
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
        // drawGame.updateActivePiece();
    }

    inactivatePiece() {
        for (let d = 0; d < this.pit.length; d++) {
            let plane = this.pit[d];
            for (let h = 0; h < plane.length; h++) {
                let line = this.pit[d][h];
                for (let w = 0; w < line.length; w++) {
                    if(line[w] == 'A') line[w] = 'B';
                }
            }
        }
    }

    moveLeft() {
        if (this.activePiece.move(-1,0,0)) {
            this.updateActivePiece();
            // this.gameSounds.moveLR();
        } else {
            // this.gameSounds.touchLR();
        }
    }

    moveRight() {
        if (this.activePiece.move(1,0,0)) {
            this.updateActivePiece();
            // this.gameSounds.moveLR();
        } else {
            // this.gameSounds.touchLR();
        }
    }

    moveUp() {
        if (this.activePiece.move(0,0,-1)) {
            this.updateActivePiece();
            // this.gameSounds.moveLR();
        } else {
            // this.gameSounds.touchLR();
        }
    }

    moveDown() {
        if (this.activePiece.move(0,0,1)) {
            this.updateActivePiece();
            // this.gameSounds.moveLR();
        } else {
            // this.gameSounds.touchLR();
        }
    }

    rotate(x, y, z) {
        if (this.activePiece.rotate(x, y, z)) {
            this.updateActivePiece();
            // this.gameSounds.moveLR();
        } else {
            // this.gameSounds.touchLR();
        }
    }

    drop() {
        if (this.activePiece.move(0,-1,0)) {
            this.updateActivePiece();
            // this.gameSounds.softDrop();
        }
        else {
            this.inactivatePiece();
            // this.gameSounds.touchDown();
            this.checkPlanes();
            this.spawnPiece();
        }
    }

    dropAll() {
        while (this.activePiece.move(0,-1,0)) {
            this.updateActivePiece();
        }
        this.inactivatePiece();
        // this.gameSounds.hardDrop();
        this.checkPlanes();
        this.spawnPiece();
    }

    checkPlanes() {
        let completePlanes = 0;

        for (let d = 1; d < this.pit.length; d++) {
            let completePlane = true;
            let plane = this.pit[d];
            for (let h = 0; h < plane.length; h++) {
                let completeLine = true;
                let line = this.pit[d][h];
                for (let w = 0; w < line.length; w++) {
                    if(line[w] == 'A' || line[w] == '.') {
                        completeLine = false;
                    }
                }
                if (!completeLine) {
                    completePlane = false;
                }
            }
            if (completePlane) {
                // console.log('### PLANE COMPLETED!!');
                this.pit.splice(d,1);
                this.pit.push(this.fillPlane(this.pitWidth, this.pitHeight));
                completePlanes++;
                drawGame.updatePit();
            }
        }

        if (completePlanes > 0) {
            gameStats.addScore(completePlanes, 0);
            // stats.addScore(completePlanes, this.level);
            // this.gameSounds.lineClear(completePlanes);
            // this.setGameSpeed(floor(stats.fullLines/10));
        }
    }

}