class TCOverlay {
    constructor(width, height) {
        this.frame = {
            "sx": 0,
            "sy": 24,
            "sw": 405,
            "sh": 496,
            "dx": 0,
            "dy": 0,
            "dw": width,
            "dh": height,
        };
    }

    draw(game) {
        game.drawSpriteFromFrames(this.frame);
    }
}
