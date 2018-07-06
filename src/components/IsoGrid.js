export default class Grid extends Phaser.Group {
    constructor(cols, rows, tile) {
        super(game);  
        var array = new Array(rows);
        for (var i = 0; i < rows; i++) {
          array[i] = new Array(cols);
        }

        //promote to a class variable
        this.array = array
        this.rows = rows
        this.cols = cols

        this.tileHeight = game.cache.getImage(tile).height*0.76
        this.tileWidth = game.cache.getImage(tile).width
        this.offset = game.cache.getImage(tile).height * this.rows * 0.5

        for (var i=0; i < rows; i++){
          for (var j=0; j< cols; j++){
            array[i][j]=tile
          }
        }
    }



    modify(x,y,str) {
      this.array[x][y] = str
    }

    display() {
      for (let i=0; i<this.rows; i++){
        for(let j=this.cols; j>0; j--){
          var x = (j * this.tileWidth / 2) + (i * this.tileWidth / 2)
          var y = (i * this.tileHeight / 2) - (j * this.tileHeight / 2) + this.offset
          game.add.sprite(x, y, this.array[i][this.cols-j])
        }
      }    
    
    }


    placeObject(i,j,obj) {

      game.physics.arcade.enable(obj);
      obj.anchor.setTo(0.5, 0.8);

      //Calculate target coordinates
        let x2 = (j * this.tileWidth / 2) + (i * this.tileWidth / 2) + this.tileWidth
        let y2 = (i * this.tileHeight / 2) - (j * this.tileHeight / 2) + this.offset// + this.tileHeight/2
        obj.x = x2;
        obj.y = y2;

    }

      moveObject(i, j, obj) {

      let xx = (j * this.tileWidth / 2) + (i * this.tileWidth / 2) + this.tileWidth
      let yy = (i * this.tileHeight / 2) - (j * this.tileHeight / 2) + this.offset

      game.physics.arcade.moveToXY(obj, xx, yy, 0, 2000)
      
      game.time.events.add(2000, function () {
         obj.body.velocity.x = 0;
         obj.body.velocity.y = 0;
      }, this); 
    }
}
