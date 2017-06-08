/* clefairy-says
 *
 * src/js/board-messages.js - Board messages class
 *
 * coded by Stéphanie Cloutier
 */

 class TCGameOver {
     constructor() {
         this.coordinates = {
                  "sx": 239,
                  "sy": 522,
                  "sw": 97,
                  "sh": 48,
                  "dx": 80,
                  "dy": 130,
                  "dw": 97,
                  "dh": 48,
             };
     }

     draw(game) {
         game.drawSpriteFromFrames(this.coordinates);
     }
 }
