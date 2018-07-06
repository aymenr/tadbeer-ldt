export default class Grid extends Phaser.Group {
    constructor(cols = 3, rows = 3, cw = 100, game) {
        super(game);
        //promote to a class variable
        this.cellWidth = cw
        this.rows = rows
        this.cols = cols
        this.objects = {}
    }

    placeAt(xx,yy,obj) {
    	//Calculate target coordinates
    	var x2 = this.cellWidth * xx + this.cellWidth / 2;
        var y2 = this.cellWidth * yy + this.cellWidth / 2;
        obj.x = x2;
        obj.y = y2;

    }

    moveObject(xx,yy, obj) {
	  //xx is number of cells to move right
	  //yy is number of cells to move down

      var pixels //Number of pixels to move

      var speed = 100
      var direction //Direction in which to move

      //Direction is positive or negative depending on sign of xx and yy 
      direction = xx > 0 ? 1 : -1
      pixels = xx*this.cellWidth
      //Object is given a starting constant velocity
      obj.body.velocity.x = speed * direction

      //Reset velocity to zero when target cell is reached
      setTimeout(function(){ obj.body.velocity.x=0 }, (pixels/speed)*1000);

      //Repeated for downward movement
      direction = yy > 0 ? 1 : -1
      pixels = yy*this.cellWidth
      obj.body.velocity.y = speed * direction

      setTimeout(function(){ obj.body.velocity.y=0 }, (pixels/speed)*1000);  
    }


    //mostly for planning and debugging this will
    //create a visual representation of the grid
    show() {
        this.graphics = this.game.add.graphics();
        this.graphics.lineStyle(1, 0x000000, 1);

        for (var i = 0; i <= this.rows*this.cellWidth; i += this.cellWidth) {
            this.graphics.moveTo(i, 0);
            this.graphics.lineTo(i, this.cols*this.cellWidth);
        }
        for (var i = 0; i <= this.cols*this.cellWidth; i += this.cellWidth) {
            this.graphics.moveTo(0, i);
            this.graphics.lineTo(this.rows*this.cellWidth, i);
        }
    }
}
