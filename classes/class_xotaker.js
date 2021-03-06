var LivingCreature=require('./class_livingCreature');

module.exports=class Xotaker extends LivingCreature{
    constructor(x, y,index) {
        super(x,y,index)
        this.energy = 5;
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
            matrix[this.y][this.x] = this.index;
            this.energy--;
        }
    }
    eat() {
        var lll=this.chooseNearFieldsByIndex(1)
        var target = lll[Math.floor(Math.random()*lll.length)];
        if (target) {
            matrix[this.y][this.x] = 0;
            this.x = target[0];
            this.y = target[1];
            matrix[this.y][this.x] = this.index;
            charecterStatistic.ate.grassEaters++;
            charecterStatistic.killed.grasses++;
            for (var i in grassArr) {
                if (grassArr[i].x == target[0] && grassArr[i].y == target[1]) {
                    grassArr.splice(i, 1);
                    this.energy++;
                   
                }
            }
        }
        else {
            this.move();
        }
        
    }
    hunt(a) {
        if (this.energy <= a) {
            charecterStatistic.died.grassEaters++;
            matrix[this.y][this.x] = 0;
            for (var i in xotakerArr) {
                if (xotakerArr[i].x == this.x && xotakerArr[i].y == this.y) {
                    xotakerArr.splice(i, 1);
                    
                }
            }
        }
       
    }
    evolve(a) {
        var lll=this.chooseNearFieldsByIndex(0)
        if (this.energy >= a) {
            charecterStatistic.born.grassEaters++;
            this.energy = 5;
            var field = lll[Math.floor(Math.random()*lll.length)];
            if (field) {
                matrix[field[1]][field[0]] = this.index;
                xotakerArr.push(new Xotaker(field[0], field[1],2));
            }
        }
    }
}