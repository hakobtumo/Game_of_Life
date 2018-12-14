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
        var field = random(this.chooseNearFieldsByIndex(0));
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
        var target = random(this.chooseNearFieldsByIndex(2));
        if (target) {
            matrix[this.y][this.x] = 0;
            this.x = target[0];
            this.y = target[1];
            matrix[this.y][this.x] = 3;
            for (var i in xotakerArr) {
                if (xotakerArr[i].x == target[0] && xotakerArr[i].y == target[1]) {
                    xotakerArr.splice(i, 1);
                    this.energy++;
                    // return true;
                }
            }
        }
        else {
            this.move();
        }
        return false;
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in gishatichArr) {
                if (gishatichArr[i].x == this.x && gishatichArr[i].y == this.y) {
                    gishatichArr.splice(i, 1);
                    // delete this;
                    // return false;
                }
            }
        }
    }
    evolve() {
        if (this.energy >= 12) {
            this.energy = 5;
            var field = random(this.chooseNearFieldsByIndex(0));
            if (field) {
                matrix[field[1]][field[0]] = 3;
                gishatichArr.push(new gishatich(field[0], field[1]));

                // return true;
            }
            // var field = random(this.chooseNearFieldsByIndex(1));
            // if (field) {
            //     matrix[field[1]][field[0]] = 3;
            //     gishatichArr.push(new gishatich(field[0], field[1]));
            //     for (var i in gishatichArr) {
            //         if (gishatichArr[i].x == field[0] && gishatichArr[i].y == field[1]) {
            //             gishatichArr.splice(i, 1);
            //             return true;
            //         }
            //     }
            // }
        }
    }
}