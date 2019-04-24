var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");
//var socket = io();

app.use(express.static("public"));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
var fs = require("fs");

grassArr = [];
xotakerArr = [];
gishatichArr = [];
popoxakanArr = [];
popoxichArr = [];
boomArr = [];
charecterStatistic = {
    died: {
        grassEaters: 0,
        hunters: 0,
    },
    killed: {
        grasses: 0,
        grassEaters: 0,
    },
    born: {
        grasses: 0,
        grassEaters: 0,
        hunters: 0,
    },
    ate: {
        grassEaters: 0,
        hunters: 0,
    },
}
matrix = []
let a = 0;
let num = 40;
for (var y = 0; y < num; y++) {
    matrix[y] = []
    for (var x = 0; x < num; x++) {
        var rand = Math.random() * 1000;
        if (rand <= 50) a = 0;
        else if (rand <= 975) a = 1;
        else if (rand <= 985) a = 2;
        else if (rand <= 998) a = 3;
        matrix[y][x] = a
    }
}
matrix[23][13] = 6;
matrix[28][13] = 6;
matrix[8][23] = 6;
matrix[17][21] = 6;

matrix[3][11] = 4;
matrix[3][21] = 5;

weather = ["Ձմեռ", "Գարուն", "Ամառ", "Աշուն"];


exanak = "Ձմեռ";
var Grass = require('./classes/class_xot.js')
var Xotaker = require('./classes/class_xotaker.js')
var gishatich = require('./classes/class_gishatich.js')
var popoxakan = require('./classes/class_popoxakan.js')
var popoxich = require('./classes/class_popoxich.js')
var Boom = require('./classes/class_boom.js')

function start() {
    io.sockets.emit('matrix', matrix);
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                grassArr.push(new Grass(x, y, 1))

            }
            else if (matrix[y][x] == 2) {
                xotakerArr.push(new Xotaker(x, y, 2))

            }
            else if (matrix[y][x] == 3) {
                gishatichArr.push(new gishatich(x, y))

            }
            else if (matrix[y][x] == 4) {
                popoxakanArr.push(new popoxakan(x, y))
            }
            else if (matrix[y][x] == 5) {
                popoxichArr.push(new popoxich(x, y))
            }
            else if (matrix[y][x] == 6) {
                boomArr.push(new Boom(x, y, 1))

            }
        }
    }
}
start();
var stormChecker = false;


io.on('connection', function (socket) {
    socket.on('pushGrasses', function () {
        for (var gr = 0; gr < 7; gr++) {
            var x = Math.floor(Math.random() * matrix[0].length)
            var y = Math.floor(Math.random() * matrix.length)

            matrix[y][x] = 1;
            grassArr.push(new Grass(x, y))

        }
    })
    socket.on('stormCall', function () {
        stormChecker = true;
        var randInt = Math.floor(Math.random() * ((num * 2) - 7) + 7);
        var randInt2 = Math.floor(Math.random() * ((num - 7) - (-num + 7)) - num + 7);
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {
                if (y + x == randInt || y + x == randInt - 5 || x == y + randInt2 || x == y + randInt2 - 5) {
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
                        matrix[y][x] = 7;
                    }
                }
            }
        }
    })
    socket.on("kill", function () {

        grassArr = [];
        xotakerArr = [];
        gishatichArr = [];
        popoxakanArr = [];
        popoxichArr = [];
        boomArr = []
        for (var y = 0; y < num; y++) {
            for (var x = 0; x < num; x++) {
                if (y == x || y + x == num - 1) {
                    matrix[y][x] = 3;
                }
                else {
                    matrix[y][x] = 0;
                }
            }
        }

    })
});

setInterval(serverDraw, 1000);

boomCount = 0;
time = 0
function serverDraw() {
    io.sockets.emit('number', [grassArr.length, xotakerArr.length, gishatichArr.length])
    io.sockets.emit('statistics', charecterStatistic);
    time++
    boomCount++;
    if (boomCount >= 7) {
        boomCount = 0
    }
    if (time % 40 < 10) {
        exanak = weather[1];
    }
    else if (time % 40 < 20) {
        exanak = weather[2]
    }
    else if (time % 40 < 30) {
        exanak = weather[3]
    }
    else if (time % 40 < 40) {
        exanak = weather[0]
    }

    for (var i in grassArr) {
        grassArr[i].bazmanal();
    }
    if (boomCount > 5) {
        for (let i in boomArr) {
            boomArr[i].kill()
        }
    }
    for (var i in xotakerArr) {
        if (exanak == "Գարուն" || exanak == "Ամառ") {
            xotakerArr[i].eat();
            xotakerArr[i].evolve(7);
            xotakerArr[i].hunt(0);
        }
        else if (exanak == "Աշուն" || exanak == "Ձմեռ") {
            xotakerArr[i].eat();
            xotakerArr[i].evolve(9);
            xotakerArr[i].hunt(2);
        }
    }
    for (var i in gishatichArr) {
        if (exanak == "Գարուն" || exanak == "Ամառ") {
            gishatichArr[i].eat();
            gishatichArr[i].evolve(11);
            gishatichArr[i].die(4)
        }
        else if (exanak == "Աշուն" || exanak == "Ձմեռ") {
            gishatichArr[i].eat();
            gishatichArr[i].evolve(13);
            gishatichArr[i].die(7)
        }
    }
    for (var i in popoxakanArr) {
        popoxakanArr[i].eat()
    }
    for (var i in popoxichArr) {
        popoxichArr[i].eat()
    }
    //console.log(matrix)
    console.log(exanak)
    io.sockets.emit('matrix', matrix);
    io.sockets.emit("exanaks", exanak);
    if (stormChecker == true) {
        stormChecker = false;
        for (var y in matrix) {
            for (var x in matrix[y]) {
                if (matrix[y][x] == 7) {
                    matrix[y][x] = 0;
                }
            }
        }
    }
}
var statistics = { "a": [] };
setInterval(function () {
    statistics.a.push({
        "GrassesBorn": charecterStatistic.born.grasses,
        "GrassEatersBorn": charecterStatistic.born.grassEaters,
        "GishatichsBorn": charecterStatistic.born.hunters,
    });
    fs.writeFile("statistics.json", JSON.stringify(statistics), function (err) {
        if (err) throw (err)
    })
}, 3000)


















