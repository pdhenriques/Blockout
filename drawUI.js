class drawUI {
    constructor() {
        this.leaderboard = document.getElementById("lb-data");
    }

    showNameForm() {
        document.getElementById("nameForm").style.display = 'block';
    }
    hideNameForm() {
        document.getElementById("nameForm").style.display = 'none';
        game.state = 'start';
        this.showStart();
    }

    showStart() {
        document.getElementById("stateStart").style.display = 'block';
    }
    start() {
        document.getElementById("stateStart").style.display = 'none';
        document.getElementById("stateOver").style.display = 'none';
        game.start();
    }
    gameOver() {
        document.getElementById("stateOver").style.display = 'block';
    }
    pause() {
        document.getElementById("statePause").style.display = 'block';
    }
    unPause() {
        document.getElementById("statePause").style.display = 'none';
    }

    updateLeaderboard() {
        let lb_text = '';
        if (game.leaderboard) {
            for (let i = 0; i < game.leaderboard.length; ++i) {
                // console.log(game.leaderboard[i].userName);
                lb_text += game.leaderboard[i].rank + '. ';
                lb_text += game.leaderboard[i].userName + ' ';
                lb_text += game.leaderboard[i].END_GAME_SCORE + '<br/>';
            }
        }
        this.leaderboard.innerHTML = lb_text;
    }

}