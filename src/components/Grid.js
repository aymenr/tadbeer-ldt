export default class Grid extends Phaser.Group {
    constructor(cols, rows) {
        super(game);

        //initialize 2D arrays
        var tileArray = new Array(rows);
        for (var i = 0; i < rows; i++) {
          tileArray[i] = new Array(cols);
        }

        var objectArray = new Array(rows);
        for (var i = 0; i < rows; i++) {
          objectArray[i] = new Array(cols);
        }


        //promote to a class variable
        this.tileArray = tileArray
        this.objectArray = objectArray
        this.rows = rows
        this.cols = cols

        //Scale for different screen sizes
        this.scaleRatio = window.innerWidth/(cols*game.cache.getImage('grass').width*1.2)

        this.tileHeight = game.cache.getImage('grass').height*0.76*this.scaleRatio
        this.tileWidth = game.cache.getImage('grass').width*this.scaleRatio
        this.offset = game.cache.getImage('grass').height * this.rows * 0.5 *this.scaleRatio

        for (var i=0; i < rows; i++){
          for (var j=this.cols-1; j>=0; j--){
            tileArray[i][j]='grass'
          }
        }
    }


    render(tArray) {

      for (let i=0; i<this.rows; i++){
          for(let j=0; j<this.cols; j++){
            this.tileArray[i][j] = tArray[i][this.cols-j-1]
          }
        }

        var x,y,tile
        for (let i=0; i<this.rows; i++){
          for(let j=this.cols; j>0; j--){
            
            x = (j * this.tileWidth / 2) + (i * this.tileWidth / 2)
            y = (i * this.tileHeight / 2) - (j * this.tileHeight / 2) + this.offset
            
            tile = game.add.sprite(x, y, this.tileArray[i][this.cols-j])
            tile.scale.setTo(this.scaleRatio, this.scaleRatio);
          }
        }    
    
    }


    placeObject(i,j,obj) {

      

      obj.scale.setTo(this.scaleRatio,this.scaleRatio)
      game.physics.arcade.enable(obj);
      obj.anchor.setTo(0.5, 0.8);

      //Calculate target coordinates
        let x2 = (j * this.tileWidth / 2) + (i * this.tileWidth / 2) + this.tileWidth
        let y2 = (i * this.tileHeight / 2) - (j * this.tileHeight / 2) + this.offset  
        obj.x = x2;
        obj.y = y2;
        obj.i = i;
        obj.j = j;
      //Update on array
        this.objectArray[i][j]=obj

    }

    //Moves j boxes to the right and i up    
    moveObject(i, j, obj) {

      this.objectArray[obj.i][obj.j]=null
      obj.i+=i
      obj.j+=j
      this.objectArray[obj.i][obj.j]=obj

      let xx = (obj.j * this.tileWidth / 2) + (obj.i * this.tileWidth / 2) + this.tileWidth
      let yy = (obj.i * this.tileHeight / 2) - (obj.j * this.tileHeight / 2) + this.offset


      game.physics.arcade.moveToXY(obj, xx, yy, 0, 3000)

      game.time.events.add(3100, function () {
         obj.body.velocity.x = 0;
         obj.body.velocity.y = 0;
      }, this);

    }

}
