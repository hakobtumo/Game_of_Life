var Xotaker=require("./class_xotaker");
var gishatich = require('./class_gishatich.js')
module.exports=class Boom {
    constructor(x, y, radiation) {
        this.x = x;
        this.y = y;
        this.radiation = radiation;
        this.directions = [];
    }
    getStrongDirections() {
        this.directions = [
            [this.x + 1, this.y],
            [this.x + 2, this.y],
            [this.x + 3, this.y],
            [this.x + 4, this.y],
            [this.x + 4, this.y + 1],
            [this.x + 4, this.y + 2],
            [this.x - 1, this.y],
            [this.x - 2, this.y],
            [this.x - 3, this.y],
            [this.x - 4, this.y],
            [this.x - 4, this.y - 1],
            [this.x - 4, this.y - 2],
            [this.x, this.y + 1],
            [this.x, this.y + 2],
            [this.x, this.y + 3],
            [this.x, this.y + 4],
            [this.x - 1, this.y + 4],
            [this.x - 2, this.y + 4],
            [this.x, this.y - 1],
            [this.x, this.y - 2],
            [this.x, this.y - 3],
            [this.x, this.y - 4],
            [this.x + 1, this.y - 4],
            [this.x + 2, this.y - 4],
        ]
    }
    getMediumDirections() {
        this.directions = [
            [this.x + 1, this.y],
            [this.x + 2, this.y],
            [this.x + 3, this.y],
            [this.x + 3, this.y + 1],
            [this.x - 1, this.y],
            [this.x - 2, this.y],
            [this.x - 3, this.y],
            [this.x - 3, this.y - 1],
            [this.x, this.y + 1],
            [this.x, this.y + 2],
            [this.x, this.y + 3],
            [this.x - 1, this.y + 3],
            [this.x, this.y - 1],
            [this.x, this.y - 2],
            [this.x, this.y - 3],
            [this.x + 1, this.y - 3],
        ]
    }
    getSlowDirections() {
        this.directions = [
            [this.x + 1, this.y],
            [this.x + 2, this.y],
            [this.x + 2, this.y + 1],
            [this.x - 1, this.y],
            [this.x - 2, this.y],
            [this.x - 2, this.y - 1],
            [this.x, this.y + 1],
            [this.x, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y - 1],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
        ]
    }
    kill() {

        if (this.radiation == 0) {
            this.getSlowDirections()

        }
        else if (this.radiation == 1) {
            this.getMediumDirections()

        }
        else if (this.radiation == 2) {
            this.getStrongDirections()

        }
        for (var i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && y >= 0 && x < matrix[0].length && y < matrix.length) {
                if (matrix[y][x] == 1) {
                    for (var l in grassArr) {
                        if (x == grassArr[l].x && y == grassArr[l].y) {
                            grassArr.splice(l, 1);
                            break;
                        }
                    }
                }
                else if (matrix[y][x] == 2) {
                    for (var l in xotakerArr) {
                        if (x == xotakerArr[l].x && y == xotakerArr[l].y) {
                            xotakerArr.splice(l, 1);
                            break;
                        }
                    }
                }
                else if (matrix[y][x] == 3) {
                    for (var l in gishatichArr) {
                        if (x == gishatichArr[l].x && y == gishatichArr[l].y) {
                            gishatichArr.splice(l, 1);
                            break;
                        }
                    }
                }
                matrix[y][x] = 0;
            }
        }
        matrix[this.y][this.x]=0;
        var x = Math.floor(Math.random()*matrix[0].length)
        var y = Math.floor(Math.random()*matrix.length)
        var radiation=Math.floor(Math.random()*3)
        this.radiation=radiation;
        this.x=x;
        this.y=y;
        matrix[this.y][this.x]=6;
        
        // this.die()

        // this.born()

    }
    // die() {
    //     matrix[this.y][this.x] = 0;
    //     for (var i in boomArr) {
    //         if (this.x == boomArr[i].x && this.y == boomArr[i].y) {
    //             boomArr.splice(i, 1)
    //             break;
    //         }
    //     }
    // }
    // born() {
    //     var x = Math.floor(Math.random()*matrix[0].length)
    //     var y = Math.floor(Math.random()*matrix.length)
    //     var rad = 3
    //     matrix[y][x] = 6;
    //     boomArr.push(new Boom(x, y, rad))
    // }
}