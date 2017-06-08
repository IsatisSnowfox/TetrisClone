class TCScore {
     constructor(score) {
         this.numbers = [new TCNumber(score / 1000, 0), new TCNumber(score / 100, 1), new TCNumber(Math.floor(score / 10), 2), new TCNumber(score % 10, 3)];
     }

     draw(game) {
         for(let i = 0; i < this.numbers.length; i++) {
             this.numbers[i].draw(game);
         }
     }

     increment() {
         let changeUnit = false;
         let i = 1;
         do {
             changeUnit = this.numbers[this.numbers.length - i].increment();
             i++;
         } while(changeUnit);
     }
}
