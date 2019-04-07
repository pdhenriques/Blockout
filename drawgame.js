class drawGame {
    constructor() {

        // Size of the squares
        this.widthUnit = 100;
        this.heightUnit = 100;
        this.depthUnit = 100;
        this.wallColor = color(100, 200, 100, 255);

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
                        push();
                        fill(100, 100, 200, 150);
                        translate(w * this.widthUnit, h * this.heightUnit, d * this.depthUnit);
                        this.drawWall('back');
                        this.drawWall('top');
                        this.drawWall('left');
                        this.drawWall('right');
                        this.drawWall('bottom');
                        this.drawWall('front');
                        pop();
                    }
                    if (game.pit[d][h][w] == 'A') {
                        push();
                        fill(250, 100, 100);
                        translate(w, h, d);
                        box(widthUnit);
                        pop();
                    }
                    if (game.pit[d][h][w] == 'B') {
                        push();
                        fill(230, 230, 230);
                        translate(w, h, d);
                        box(widthUnit);
                        pop();
                    }
                }
            }
        }
    }

    drawPitBlock(x, y, widthUnit, heightUnit) {
        rect(x * widthUnit + transX, y * heightUnit + transY, widthUnit, heightUnit);
    }

    // drawGame.drawWall('back');
    // drawGame.drawWall('top');
    // drawGame.drawWall('left');
    // drawGame.drawWall('right');
    // drawGame.drawWall('bottom');
    // drawGame.drawWall('front');
    drawWall(type) {
        translate(0, 0, 0);
        stroke(this.wallColor);
        strokeWeight(4);
        switch (type) {
            case 'top':
                // Y = 0
                beginShape(POINTS);
                vertex(0, 0, 0);
                vertex(this.widthUnit, 0, 0);
                vertex(this.widthUnit, 0, this.depthUnit);
                vertex(0, 0, this.depthUnit);
                vertex(0, 0, 0);
                endShape();
                break;
            case 'bottom':
                // Y = 0
                beginShape(POINTS);
                vertex(0, this.heightUnit, 0);
                vertex(this.widthUnit, this.heightUnit, 0);
                vertex(this.widthUnit, this.heightUnit, this.depthUnit);
                vertex(0, this.heightUnit, this.depthUnit);
                vertex(0, this.heightUnit, 0);
                endShape();
                break;
            case 'front':
                // Z = 1
                beginShape(POINTS);
                vertex(0, 0, this.depthUnit);
                vertex(this.widthUnit, 0, this.depthUnit);
                vertex(this.widthUnit, this.heightUnit, this.depthUnit);
                vertex(0, this.heightUnit, this.depthUnit);
                vertex(0, 0, this.depthUnit);
                endShape();
                break;
            case 'back':
                // Z = 0
                beginShape(POINTS);
                vertex(0, 0, 0);
                vertex(this.widthUnit, 0, 0);
                vertex(this.widthUnit, this.heightUnit, 0);
                vertex(0, this.heightUnit, 0);
                vertex(0, 0, 0);
                endShape();
                break;
            case 'left':
                // X = 0
                beginShape(POINTS);
                vertex(0, 0, 0);
                vertex(0, this.heightUnit, 0);
                vertex(0, this.heightUnit, this.depthUnit);
                vertex(0, 0, this.depthUnit);
                vertex(0, 0, 0);
                endShape();
                break;
            case 'right':
                // X = 0
                beginShape(POINTS);
                vertex(this.widthUnit, 0, 0);
                vertex(this.widthUnit, this.heightUnit, 0);
                vertex(this.widthUnit, this.heightUnit, this.depthUnit);
                vertex(this.widthUnit, 0, this.depthUnit);
                vertex(this.widthUnit, 0, 0);
                endShape();
                break;
        }
    }
}
