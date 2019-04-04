// GAMEDATA                 // GAMESTATE
// W = wall                 // start
// . = Empty                // run
// A = Active Block         // over
// B = Passive Block        

class game {
    
    constructor(w, h, d) {
        this.state = 'start';
        this.width = w;
        this.height = h;
        this.depth = d;
        this.pit = [];
    }

    start() {
        console.log('start');
        this.fillPit(this.width, this.height, this.depth);
        this.state = 'run';
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
            line[i] = '.';
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
}