socket = io();
var side = 23;
var socket = io();

exanak = "Ձմեռ";
var weatherP = document.getElementById("weather")

var ex = socket.on("exanaks", function (w) {
    exanak = w;
    weatherP.innerHTML = exanak;
});

socket.on('number', function (len) {
    let grass = document.getElementById('grNum');
    let grEater = document.getElementById('grEaNum')
    let hunter = document.getElementById('hun')
    grass.innerHTML = len[0];
    grEater.innerHTML = len[1];
    hunter.innerHTML = len[2]
})


socket.on('statistics', function (stat) {
    let table = document.getElementById('table_statistics');
    table.rows[2].cells[2].innerHTML = stat.died.grassEaters;
    table.rows[2].cells[3].innerHTML = stat.died.hunters;
    table.rows[3].cells[1].innerHTML = stat.killed.grasses;
    table.rows[3].cells[2].innerHTML = stat.killed.grassEaters;
    table.rows[4].cells[1].innerHTML = stat.born.grasses;
    table.rows[4].cells[2].innerHTML = stat.born.grassEaters;
    table.rows[4].cells[3].innerHTML = stat.born.hunters;
    table.rows[5].cells[2].innerHTML = stat.ate.grassEaters;
    table.rows[5].cells[3].innerHTML = stat.ate.hunters;
})



function setup() {
    frameRate(16);
    createCanvas(40 * side, 40 * side);
    background('#acacac');
}


function drawMatrix(matrix) {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            
            if (matrix[y][x] == 6) {
                fill('black');
            }
            else if (matrix[y][x] == 7) {
                fill('#6C3483');
            }
            else if (matrix[y][x] == 1) {
                if (exanak == "Գարուն") {
                    fill(0, 255, 0);
                }
                else if (exanak == "Ամառ") {
                    fill(0, 155, 0)
                }
                else if (exanak == "Աշուն") {
                    fill(0, 75, 0)
                }
                else if (exanak == "Ձմեռ") {
                    fill("white")
                }
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                if (exanak == "Գարուն") {
                    fill(247, 255, 0);
                }
                else if (exanak == "Ամառ") {
                    fill(195, 201, 36)
                }
                else if (exanak == "Աշուն") {
                    fill(182, 157, 59)
                }
                else if (exanak == "Ձմեռ") {
                    fill(110, 99, 33)
                }
            }
            else if (matrix[y][x] == 3) {
                if (exanak == "Գարուն") {
                    fill(255, 0, 0);
                }
                else if (exanak == "Ամառ") {
                    fill(210, 50, 50)
                }
                else if (exanak == "Աշուն") {
                    fill(127, 40, 40)
                }
                else if (exanak == "Ձմեռ") {
                    fill(170, 100, 100)
                }
            }
            else if (matrix[y][x] == 4) {
                fill("orange")
            }
            else if (matrix[y][x] == 5) {
                fill("blue")
            }
            rect(x * side, y * side, side, side);
        }
    }
}

socket.on('matrix', drawMatrix)

function killAll() {
    socket.emit("kill");
    var el=document.getElementById('killer');
    // var elem = document.getElementById('weather');
    // elem.parentNode.removeChild(elem);
}

function stormCall() {
    socket.emit('stormCall')
}

function pushGrasses(){
    socket.emit('pushGrasses')
}




















