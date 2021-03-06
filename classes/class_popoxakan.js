var Xotaker=require("./class_xotaker")
module.exports=class popoxakan {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        
        this.directions = [
            [this.x + 12, this.y - 6],
            [this.x + 11, this.y - 20],
            [this.x + 16, this.y + 21],
            [this.x + 12, this.y + 6],
            [this.x - 13, this.y + 9],
            [this.x - 9, this.y + 15],
            [this.x - 12, this.y - 22],
            [this.x - 21, this.y - 9],
            [this.x + 1, this.y],
            [this.x + 1, this.y + 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x - 1, this.y - 1],
            [this.x, this.y + 1],
            [this.x, this.y - 1],
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
           
        }
       
    }
    eat() {
        var lll=this.chooseNearFieldsByIndex(1)
        var target = lll[Math.floor(Math.random()*lll.length)];
        if (target) {
            matrix[this.y][this.x] = 2;
            xotakerArr.push(new Xotaker(this.x, this.y,2));
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

