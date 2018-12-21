var Xotaker=require("./class_xotaker")
module.exports=class popoxakan {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 10;
        this.directions = [
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 1],
            [this.x + 2, this.y + 1],
            [this.x + 1, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x - 2, this.y + 1],
            [this.x - 2, this.y - 1],
            [this.x - 1, this.y - 2]
        ];
    }
    chooseNearFieldsByIndex(ch) {
        var found = [];
        for (var i = 0; i < this.directions.length; i++) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        var lll=this.chooseNearFieldsByIndex(0)
        var field = lll[Math.floor(Math.random()*lll.length)];
        if (field) {
            matrix[this.y][this.x] = 0;
            this.x = field[0];
            this.y = field[1];
            matrix[this.y][this.x] = 4;
            this.energy--;
        }
        return false;
    }
    eat() {
        var lll=this.chooseNearFieldsByIndex(1)
        var target = lll[Math.floor(Math.random()*lll.length)];
        if (target) {
            matrix[this.y][this.x] = 2;
            xotakerArr.push(new Xotaker(this.x, this.y));


            this.x = target[0];
            this.y = target[1];
            matrix[target[1]][target[0]] = 4;

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
}

