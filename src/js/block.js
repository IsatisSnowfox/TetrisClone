

class TCBlock {
    constructor(dx, dy, width, height, color, position, parent) {
        this.coordinates = {
            "sx": position * 24,
            "sy": 0,
            "sw": 24,
            "sh": 24,
            "dx": dx,
            "dy": dy,
            "dw": 24,
            "dh": 24,
            "row": undefined,
            "column": undefined,
        }
        this.parent = parent;
    }

    tryToMove(column, row, game) {
        if(!(typeof game.grid[row] !== "undefined" && typeof game.grid[row][column] !== "undefined")) {
            return false;
        }
        if(game.grid[row][column]) {
            return false;
        }
        return true;
    }

    move(column, row, game) {
        // Move the block inside the canvas
        if(typeof this.coordinates.row !== "undefined" && typeof this.coordinates.column !== "undefined") game.grid[this.coordinates.row][this.coordinates.column] = 0;




        if(typeof game.grid[row] === "undefined" || typeof game.grid[row][column] === "undefined") {
            return false;
        }
        this.coordinates.dx = BLOCK_SIZE * column + BORDER;
        this.coordinates.dy = BLOCK_SIZE * row + BORDER - NUMBER_OF_PHANTOM_COLUMNS * BLOCK_SIZE;
        game.grid[row][column] = this;
        this.coordinates.row = row;
        this.coordinates.column = column;
        return false;
    }

    draw(game) {
        game.drawSpriteFromFrames(this.coordinates);
    }
}
