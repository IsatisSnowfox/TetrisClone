
const SPRITESHEET_PATH = "resources/spritesheet.png";
const BLOCK_SIZE = 24;
const BORDER = 9;
const SPAWN_COLUMN = 3;
const NUMBER_OF_PHANTOM_COLUMNS = 2;
const BASIC_MOVING_TIME = 1000;
const NUMBER_OF_TETROMINOES = 7;


class Tetris {
    constructor({canvas, context, width, height}) {
        // Init canvas-related properties
        this.canvas = canvas;
        this.context = context;
        this.width = width;
        this.height = height;
        this.animationRequestId = null;

        // Init game-related properties
        this.validKeys = {
            "spacebar": 32,
            "leftArrow": 37,
            "downArrow": 40,
            "rightArrow": 39,
            "upArrow": 38,
        }
        this.possibleTetrominoes = ["l", "j", "z", "s", "i", "o", "t"];
        this.nextTetrominoes = [];
        this.tetrominoes = [];
        this.timeStarted = Date.now();
        this.movingSpeed = 1;
        this.keyPressed = {"leftArrow": {"pressed": false}, "rightArrow": {"pressed": false}, "upArrow": {"pressed": false}};
        this.score = new TCScore(0);
        this.gameoverMessage;

        // Load spritesheet
        this.sprites = new Image();
        this.sprites.addEventListener("load", () => {
            this.setup();
        });
        this.grid = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],];
        this.sprites.src = SPRITESHEET_PATH;
    }

    setup() {
        this.reset();

        //document.addEventListener("keyup", this.handleAction.bind(this));
        document.addEventListener("keydown", this.handleAction.bind(this));

        this.animate();
    }

    handleAction(oEvent) {
        // Does nothing if key pressed isn't allowed
        // if(!this.validKeys.find((validKey) => {if(validKey === oEvent.keyCode) return true;})) {
        //     return;
        // }

        if(typeof this.validKeys.indexOf(oEvent.keyCode) === "undefined") return;

        if(!this.started && oEvent.keyCode === 32) {
            // Start the game
            console.log("bonjour");
            this.start();
        } else if(!this.started && oEvent.keyCode !== 32) {
            return;
        } else if(this.started && !this.ended) {
            // Manage in-game actions
            switch (oEvent.keyCode) {
                case this.validKeys.leftArrow:
                    this.tetrominoes[this.tetrominoes.length - 2].update(-1, 0, this);
                    break;
                case this.validKeys.rightArrow:
                    this.tetrominoes[this.tetrominoes.length - 2].update(1, 0, this);
                    break;
                case this.validKeys.upArrow:
                    this.tetrominoes[this.tetrominoes.length - 2].rotate();
                    break;
                default:

                    break;
            }

            if(this.nextTetrominoes.length < this.possibleTetrominoes.length) {
                this.addNextTetrominoes();
            }
        }
        else if(this.started) {
            this.reset();
            this.start();
        }
    }

    reset() {
        let {width, height} = this;
        this.nextTetrominoes = [];
        this.overlay = new TCOverlay(width, height);
        this.grid = this.grid = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],];
        //this.starting = new TCStarting();
        //this.score = new TCScore();
        //this.next = new TCNextTetromino();

        this.started = false;
        this.ended = false;
        this.score = new TCScore(0);
    }

    animate() {
        let hasUpdated = false;
        this.animationRequestId = window.requestAnimationFrame(this.animate.bind(this));
        this.currentTime = Date.now();
        this.context.clearRect(0, 0, this.width, this.height);
        this.context.beginPath();
        this.context.rect(0, 0, this.width, this.height);
        this.context.fillStyle = "black";
        this.context.fill();
        this.score.draw(this);
        console.log(this.score.numbers[0].number);
        this.grid.forEach((line) => {line.forEach((square) => {if(square) {square.draw(this);}})});



        // Check game state
        if(this.started && !this.ended) {
            this.tetrominoes[this.tetrominoes.length - 1].draw(this);

            // Update elements
            if(this.timeStarted + BASIC_MOVING_TIME / (this.movingSpeed * 5) < this.currentTime) {
                hasUpdated = this.tetrominoes[this.tetrominoes.length - 2].update(0, 1, this);
                console.log(this.grid[2].find((square) => square !== 0) );
                if(!hasUpdated && typeof this.grid[1].find((square) => square !== 0) === "undefined") {
                    this.tetrominoes.push(new TCTetromino(this.nextTetrominoes.shift(), this.width, this.height));
                    this.tetrominoes[this.tetrominoes.length - 2].drop(this);
                    this.tetrominoes.shift();
                    if(this.nextTetrominoes.length < NUMBER_OF_TETROMINOES) {
                        this.addNextTetrominoes();
                    }
                    this.grid.forEach((line, index) => {
                        if(line.indexOf(0) === -1) {
                            this.validateLine(index);
                        }
                    });
                }
                else if(!hasUpdated) {
                    this.gameOver();
                }
                this.timeStarted = Date.now();

            }

        } else if(this.started){
            this.gameoverMessage.draw(this);
        }
        this.overlay.draw(this);

        //this.tetrominoes.forEach((tetromino) => {tetromino.draw(this);});
    }

    getNextTetrominoes() {
        let possibleTetrominoes = this.possibleTetrominoes.slice();
        let nextTetrominoes = [];
        while(possibleTetrominoes.length) {
            nextTetrominoes.push(possibleTetrominoes.splice(Math.floor(Math.random() * possibleTetrominoes.length), 1)[0]);
        }
        return nextTetrominoes;
    }

    addNextTetrominoes() {
        this.nextTetrominoes = this.nextTetrominoes.concat(this.getNextTetrominoes());
    }

    drawSpriteFromFrames({sx, sy, sw, sh, dx, dy, dw, dh}) {
        this.context.drawImage(this.sprites, sx, sy, sw, sh, dx, dy, dw, dh);
    }

    start() {
        this.started = true;
        this.addNextTetrominoes();
        // Push first tetromino to drop into tetrominoes list and move it into the drop zone
        console.log("bonjour");
        this.tetrominoes.push(new TCTetromino(this.nextTetrominoes.shift(), this.width, this.height));
        this.tetrominoes[this.tetrominoes.length - 1].drop(this);

        this.tetrominoes[this.tetrominoes.length - 1].isFalling = true;
        // Push next tetromino to drop into tetrominoes list
        this.tetrominoes.push(new TCTetromino(this.nextTetrominoes.shift(), this.width, this.height));

    }

    validateLine(line) {
        this.grid[line].forEach((square, index) => {
            this.grid[line][index] = 0;
        });
        for(var i = line - 1; i >= 0; i--) {
            this.grid[i].forEach((square) => {
                if(square) {
                    square.move(square.coordinates.column, square.coordinates.row + 1, this);
                }
            });
        }
        this.score.increment();
    }

    gameOver() {
        this.ended = true;
        this.gameoverMessage = new TCGameOver();
        console.error("Game over");
    }
}
