function drawPit() {
    console.log('drawn pit');
    // console.log(game.pit);
    for (let d = 0; d < game.pit.length; d++) {
        let plane = game.pit[d];
        for (let h = 0; h < plane.length; h++) {
            let line = game.pit[d][h];
            for (let w = 0; w < line.length; w++) {
                if (game.pit[d][h][w] == 'W') {
                    push();
                    fill(100, 100, 200, 150);
                    translate(w*widthUnit, h*widthUnit, d*widthUnit);
                    box(widthUnit);
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

function drawPitBlock(x, y, widthUnit, heightUnit) {
    rect(x * widthUnit + transX, y * heightUnit + transY, widthUnit, heightUnit);
}
