var LivingCreature=require('./class_livingCreature')

module.exports=class gishatich extends LivingCreature{
    constructor(x, y) {
        super(x,y);
        this.energy = 10;
  
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 2, this.y - 1],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 1],
            [this.x + 2, this.y],
            [this.x + 2, this.y + 1],
            [this.x, this.y + 1],
            [this.x - 2, this.y + 1],
            [this.x - 1, this.y],
        ];
    }

    chooseNearFieldsByIndex(ch) {
        this.getNewCoordinates();
        return super.chooseNearFieldsByIndex(ch);
    }

    move() {
        var lll=this.chooseNearFieldsByIndex(0)
        var field = lll[Math.floor(Math.random()*lll.length)];
        if (field) {
            matrix[this.y][this.x] = 0;
            this.x = field[0];
            this.y = field[1];
            matrix[this.y][this.x] = 3;
            // return true;
        }
        this.energy--;
        // return false;
    }
    eat() {
        var lll=this.chooseNearFieldsByIndex(2)
        var target = lll[Math.floor(Math.random()*lll.length)];
        if (target) {
            matrix[this.y][this.x] = 0;
            this.x = target[0];
            this.y = target[1];
            matrix[this.y][this.x] = 3;
            charecterStatistic.ate.hunters++;
            charecterStatistic.killed.grassEaters++;
            for (var i in xotakerArr) {
                if (xotakerArr[i].x == target[0] && xotakerArr[i].y == target[1]) {
                    xotakerArr.splice(i, 1);
                    this.energy++;
                
                }
            }
        }
        else {
            this.move();
        }
        return false;
    }
    die(a) {
        if (this.energy <= a) {
            charecterStatistic.died.hunters++;
            matrix[this.y][this.x] = 0;
            for (var i in gishatichArr) {
                if (gishatichArr[i].x == this.x && gishatichArr[i].y == this.y) {
                    gishatichArr.splice(i, 1);
                    
                }
            }
        }
    }
    evolve(a) {
        var lll=this.chooseNearFieldsByIndex(0)
        if (this.energy >= a) {
            charecterStatistic.born.hunters++;
            this.energy = 5;
            var field = lll[Math.floor(Math.random()*lll.length)];
            if (field) {
                matrix[field[1]][field[0]] = 3;
                gishatichArr.push(new gishatich(field[0], field[1]));

            }
           
        }
    }
}