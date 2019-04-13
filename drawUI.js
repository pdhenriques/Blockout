class drawUI {
    constructor() {

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

}