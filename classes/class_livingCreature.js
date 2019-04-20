module.exports = class LivingCreature {
    constructor(x, y, index){
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.index = index;
        if(exanak=="Գարուն" || exanak=="Ամառ"){
            this.directions = [
                [this.x - 2, this.y - 2],
                [this.x+1, this.y - 1],
                [this.x + 2, this.y - 2],
                [this.x - 2, this.y+1],
                [this.x + 2, this.y+1],
                [this.x - 2, this.y + 2],
                [this.x+1, this.y + 2],
                [this.x + 2, this.y + 2]
            ];
        }
        else if(exanak=="Աշուն"|| exanak=="Ձմեռ"){
            this.directions = [
                [this.x+1, this.y],
                [this.x+1, this.y+1],
                [this.x +1, this.y-1],
                [this.x - 1, this.y],
                [this.x -1, this.y+1],
                [this.x -1, this.y-1],
                [this.x, this.y + 1],
                [this.x , this.y -1]
            ];
        }
        
       
 
    }
    chooseNearFieldsByIndex(ch) {
        var found = [];
        for (var i = 0; i < this.directions.length; i++) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (matrix[y] && matrix[y][x] == ch) {
                found.push(this.directions[i]);
            }
        }
        return found;
    }
}
