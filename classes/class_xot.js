var LivingCreature=require('./class_livingCreature')

module.exports=class Grass extends LivingCreature {
    bazmanal() {
        var lll=this.chooseNearFieldsByIndex(0)
        var norVandak =lll[Math.floor(Math.random()*lll.length)];
        /*console.log(norVandak, this.multiply);*/
        if (this.multiply >= 5 && norVandak) {
            var norXot = new Grass(norVandak[0], norVandak[1]);
            grassArr.push(norXot);
            matrix[norVandak[1]][norVandak[0]] = 1;
            this.multiply = 0;
        }
        this.multiply++;
    }
}

