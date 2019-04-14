class gameStats {

    constructor() {
        this.pieceCounter = [0,0,0,0,0,0,0];
        this.fullLines = 0;
        this.score = 0;
    }
    
    reset() {
        this.pieceCounter = [0,0,0,0,0,0,0];
        this.fullLines = 0;
        this.score = 0;
    }

    addPieceCounter(t) {
        this.pieceCounter[t]++;
    }

    getPieceCounter(t) {
        return this.pieceCounter[t];
    }
    
    getTotalPieces() {
        let sum = 0;
        for(let i=0; i<this.pieceCounter.length; i++) {
            sum += this.pieceCounter[i];
        }
        return sum;
    }

    addScore(n,l) {
        let s = 0;
        switch(n) {
            case 1: 
                s = 40 * (l+1);
                break;
            case 2: 
                s = 100 * (l+1);
                break;
            case 3: 
                s = 300 * (l+1);
                break;
            case 4: 
                s = 1200 * (l+1);
                break;
            default:
                s = 0;
        }
        this.fullLines += n;
        this.score += s;
    }

    getScore() {
        return this.score;
    }
}