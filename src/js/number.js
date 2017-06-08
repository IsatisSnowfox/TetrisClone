class TCNumber {
     constructor(number, index) {
         this.number = number;
         this.numbers = {
            "sx": number * 24,
            "sy": 522,
            "sw": 24,
            "sh": 21,
            "dx": 284 + (index * 24),
            "dy": 52,
            "dw": 24,
            "dh": 21,
         }
     }

     draw(game) {
         game.drawSpriteFromFrames(this.numbers);
     }

     increment() {
         this.number = (++this.number % 10);
         this.numbers.sx = this.number * 24;
         return !this.number;
     }
 }
