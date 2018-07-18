import Phaser from 'phaser'
export default class Grid extends Phaser.Group {
    constructor(cols, rows, game) {
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
        this.tweens =[] //queue to manage tweens

        //Scale for different screen sizes
        this.scaleRatio = window.innerWidth/(cols* this.game.cache.getImage('grass').width)

        this.tileHeight = this.game.cache.getImage('grass').height*0.76*this.scaleRatio
        this.tileWidth = this.game.cache.getImage('grass').width*this.scaleRatio
        this.offset = 0 //hackish solution for now
        this.offset = Math.abs(this.convert(0, this.cols-1).y)
        this.tiles = new Array(this.rows)
        for (let i = 0; i < this.rows; i++)
            this.tiles[i] = new Array(this.cols)

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
          for(let j=this.cols - 1; j>=0; j--){
            
            let {
              x,
              y
            } = this.convert(i, j) 

            tile = this.game.add.sprite(x, y, this.tileArray[i][this.cols-j -1])
            this.tiles[i][j] = tile 
            tile.scale.setTo(this.scaleRatio, this.scaleRatio);
          }
        }    
    
    }


    convert(i, j) {
      return {
          x: (j * this.tileWidth / 2) + (i * this.tileWidth / 2),
          y: (i * this.tileHeight / 2) - (j * this.tileHeight / 2) + this.offset
      }
    }

    //approximate method
    getHeight() {
      return Math.abs(this.convert(0, this.cols).y - this.convert(this.rows + 1, 0).y)
    }

    //approximate method
    getWidth() {
      return Math.abs(this.convert(0, 0).x - this.convert(this.rows, this.cols).x)
    }

    placeObject(x, y, obj, offsetX, offsetY,scaleX,scaleY) {

      //Calculate target coordinates
      let converted = this.convert(x + offsetX, y + offsetY)
      obj.x = converted.x;
      obj.y = converted.y;

      obj.scale.setTo(this.scaleRatio * scaleX,this.scaleRatio * scaleY)
      obj.i = x ;
      obj.j = y ;
      //Update on array
      this.objectArray[x][y]= obj
    }

    getNextTween =() => {
      console.log('get next tween called');
      if (this.tweens.length!= 0) {
        var tween = this.tweens.pop()
        tween.start()
        tween.onComplete.add(this.getNextTween)
      }
    }
    chainTween = (tween) => {
      
      if (this.tweens.length ==0) {
        this.tweens.unshift(tween)
        tween.start()
        tween.onComplete.add(this.getNextTween)
      }else {
        this.tweens.unshift(tween)
      }
    }

    //Moves j boxes to the right and i up    
    moveObject(x, y, obj, offsetX = 0, offsetY = 0) {
      console.log(x, y,obj.i,obj.j)

      this.objectArray[obj.i][obj.j] = null
      let diff = Math.max(Math.abs(x), Math.abs(y)),
          time = diff * 1000
      obj.i+=x
      obj.j+=y
      this.objectArray[obj.i][obj.j]= obj 


      let coordinates = this.convert(obj.i + offsetX,obj.j + offsetY)
      let tween = this.game.add.tween(obj, this.game, this.game.tweens).to({
        x: coordinates.x,
        y: coordinates.y
      }, 2000)
      this.chainTween(tween)
    }

}
