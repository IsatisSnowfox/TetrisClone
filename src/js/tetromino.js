const TETROMINOES = {
    "j": {
        "color": "blue",
        "position": 4,
        "blocks": [
            {"x": 0, "y": 0},
            {"x": 0, "y": 1},
            {"x": 1, "y": 1},
            {"x": 2, "y": 1},
        ],
        "rotations": [
            [{"x": 0, "y": 0},
            {"x": 0, "y": 1},
            {"x": 1, "y": 1},
            {"x": 2, "y": 1},],

            [{"x": 2, "y": 0},
            {"x": 1, "y": 0},
            {"x": 1, "y": 1},
            {"x": 1, "y": 2},],

            [{"x": 2, "y": 2},
            {"x": 0, "y": 1},
            {"x": 1, "y": 1},
            {"x": 2, "y": 1},],

            [{"x": 0, "y": 2},
            {"x": 1, "y": 0},
            {"x": 1, "y": 1},
            {"x": 1, "y": 2},],
        ],
    },
    "l": {
        "color": "orange",
        "position": 3,
        "blocks": [
            {"x": 2, "y": 0},
            {"x": 0, "y": 1},
            {"x": 1, "y": 1},
            {"x": 2, "y": 1},
        ],
        "rotations": [
            [{"x": 2, "y": 0},
            {"x": 0, "y": 1},
            {"x": 1, "y": 1},
            {"x": 2, "y": 1},],

            [{"x": 2, "y": 2},
            {"x": 1, "y": 0},
            {"x": 1, "y": 1},
            {"x": 1, "y": 2},],

            [{"x": 0, "y": 2},
            {"x": 0, "y": 1},
            {"x": 1, "y": 1},
            {"x": 2, "y": 1},],

            [{"x": 0, "y": 0},
            {"x": 1, "y": 0},
            {"x": 1, "y": 1},
            {"x": 1, "y": 2},],
        ],
    },
    "t": {
        "color": "pink",
        "position": 0,
        "blocks": [
            {"x": 1, "y": 0},
            {"x": 0, "y": 1},
            {"x": 1, "y": 1},
            {"x": 2, "y": 1},
        ],
        "rotations": [
            [{"x": 1, "y": 0},
            {"x": 0, "y": 1},
            {"x": 1, "y": 1},
            {"x": 2, "y": 1},],

            [{"x": 2, "y": 1},
            {"x": 1, "y": 0},
            {"x": 1, "y": 1},
            {"x": 1, "y": 2},],

            [{"x": 1, "y": 2},
            {"x": 0, "y": 1},
            {"x": 1, "y": 1},
            {"x": 2, "y": 1},],

            [{"x": 0, "y": 1},
            {"x": 1, "y": 0},
            {"x": 1, "y": 1},
            {"x": 1, "y": 2},],
        ],
    },
    "o": {
        "color": "yellow",
        "position": 1,
        "blocks": [
            {"x": 1, "y": 1},
            {"x": 1, "y": 0},
            {"x": 2, "y": 1},
            {"x": 2, "y": 0},
        ],
        "rotations": [
            [{"x": 1, "y": 1},
            {"x": 1, "y": 0},
            {"x": 2, "y": 1},
            {"x": 2, "y": 0},],
        ],
    },
    "i": {
        "color": "cyan",
        "position": 2,
        "blocks": [
            {"x": 0, "y": 1},
            {"x": 1, "y": 1},
            {"x": 2, "y": 1},
            {"x": 3, "y": 1},
        ],
        "rotations": [
            [{"x": 0, "y": 1},
            {"x": 1, "y": 1},
            {"x": 2, "y": 1},
            {"x": 3, "y": 1},],

            [{"x": 2, "y": -1},
            {"x": 2, "y": 0},
            {"x": 2, "y": 1},
            {"x": 2, "y": 2},],
        ],
    },
    "z": {
        "color": "red",
        "position": 5,
        "blocks": [
            {"x": 0, "y": 0},
            {"x": 1, "y": 1},
            {"x": 1, "y": 0},
            {"x": 2, "y": 1},
        ],
        "rotations": [
            [{"x": 0, "y": 0},
            {"x": 1, "y": 1},
            {"x": 1, "y": 0},
            {"x": 2, "y": 1},],

            [{"x": 2, "y": 0},
            {"x": 1, "y": 1},
            {"x": 1, "y": 0},
            {"x": 2, "y": -1},],
        ],
    },
    "s": {
        "color": "green",
        "position": 6,
        "blocks": [
            {"x": 0, "y": 1},
            {"x": 1, "y": 1},
            {"x": 1, "y": 0},
            {"x": 2, "y": 0},
        ],

        "rotations": [
            [{"x": 0, "y": 1},
            {"x": 1, "y": 1},
            {"x": 1, "y": 0},
            {"x": 2, "y": 0},],

            [{"x": 2, "y": 0},
            {"x": 2, "y": 1},
            {"x": 1, "y": 0},
            {"x": 1, "y": -1},],
        ],
    },
};

class TCTetromino {
    constructor(type, width, height) {
        this.tetromino = [];
        this.isFalling = false;
        this.rotationState = 0;
        this.layout = TETROMINOES[type];
        this.position;
        // for(let block in TETROMINOES[type]["blocks"]) {
        //     this.tetromino.push(new TCBlock(
        //         93 * 3 + block["x"] * 8 * 3,
        //         66 * 3 + block["x"] * 8 * 3,
        //         width, height, TETROMINOES[type]["color"], TETROMINOES[type]["position"]))
        // }
        this.layout.rotations[this.rotationState].forEach((block) => {
            this.tetromino.push(new TCBlock(
                93 * 3 + block["x"] * 8 * 3,
                66 * 3 + block["y"] * 8 * 3,
                width, height, this.layout.color, this.layout.position, this));
        });
        console.log(this);
    }

    draw(game) {
        this.tetromino.forEach((block) => {game.drawSpriteFromFrames(block.coordinates)});
    }

    drop(game) {
        this.move(SPAWN_COLUMN, 0, game);
        this.position = {"column": SPAWN_COLUMN, "row": 0};
    }

    move(column, row, game) {
        // Move the tetromino
        if(this.position) {
            this.tetromino.forEach((block, index) => {game.grid[block.coordinates.row][block.coordinates.column] = 0});
        }
        if(typeof this.tetromino.find((block, index) => !block.tryToMove(column + this.layout.rotations[this.rotationState][index].x, row + this.layout.rotations[this.rotationState][index].y, game)) === "undefined") {
            this.tetromino.forEach((block, index) => {block.move(column + this.layout.rotations[this.rotationState][index].x, row + this.layout.rotations[this.rotationState][index].y, game)});
            this.position = {"column": column, "row": row};
            return true;
        }

        if(this.position) {
            console.log("bonjour au revoir");
            this.tetromino.forEach((block, index) => {block.move(this.position.column + this.layout.rotations[this.rotationState][index].x, this.position.row + this.layout.rotations[this.rotationState][index].y, game)});
        }
        return false;
    }

    update(column, row, game) {
        //this.tetromino.forEach((block, index) => {block.move(column + block.coordinates.column, row + block.coordinates.row, game, index)});
        console.log(column, row);
        return this.move(column + this.position.column, row + this.position.row, game);
    }

    rotate() {
        this.rotationState++;
        if(this.rotationState >= this.layout.rotations.length) {
            this.rotationState = 0;
        }
    }
}
