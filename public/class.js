class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    yntrelVandak() {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == 0) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    bazmanal() {
        var norVandak = random(this.yntrelVandak(0));
        //console.log(norVandak, this.multiply);
        if (this.multiply == 5 && norVandak) {
            var norXot = new Grass(norVandak[0], norVandak[1]);
            grassArr.push(norXot);
            matrix[norVandak[1]][norVandak[0]] = 1;
            this.multiply = 0;
        }
        this.multiply++;
    }

}
class GrassEater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 5;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    yntrelVandak() {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == 0) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    sharjvel() {
        var vand = random(this.yntrelVandak(0))
        //console.log(vand);
        if (vand) {
            matrix[this.y][this.x] = 0;
            this.x = vand[0];
            this.y = vand[1];
            matrix[this.y][this.x] = 2;
            this.energy--;
        }
    }
    utel() {
        var vvand = random(this.yntrelVandak(1))
        if (vvand) {
            matrix[this.y][this.x] = 0;
            this.x = vvand[0];
            this.y = vvand[1];
            matrix[this.y][this.x] = 2;
            for (var i in grassArr) {
                if (grassArr[i].x == vvand[0] && grassArr[i].y == vvand[1]) {
                    grassArr.splice(i, 1);
                    this.energy++;
                }
            }
        }
    }
}


