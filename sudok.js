"use strict";
//$ npm run babel -- src --out-dir dist//

document.addEventListener("DOMContentLoaded", function (event) {

    var generateCanvas = function generateCanvas() {
        //Создаие канваса
        var canvas = document.querySelector(".sudok");
        var ctx = canvas.getContext('2d');
        canvas.width = ctx.canvas.clientWidth;
        canvas.height = ctx.canvas.clientHeight;
        // ctx.viewport(0,0,ctx.canvas.width,ctx.canvas.height);
        var width = canvas.width;
        var height = canvas.height;
        var arrArea = [];
        var backGrid = function backGrid(width, height) {
            //отрисовка фона 
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    // ctx.strokeStyle = "#FF0000"
                    ctx.strokeRect(j * 100, i * height / 3, width, height / 3);
                }
            }
        };
        backGrid(width, height);

        var drawSudok = function drawSudok(objecAree) {
            //отрисовка судоки
            for (var i in objecAree) {
                for (var j in objecAree[i].arryStrings) {
                    for (var a in objecAree[i].arryStrings[j].arrCell) {
                        if (objecAree[i].arryStrings[j].arrCell[a].hide === false) {
                            objecAree[i].arryStrings[j].arrCell[a].draw();
                            objecAree[i].arryStrings[j].arrCell[a].numberDraw();
                        } else {
                            objecAree[i].arryStrings[j].arrCell[a].draw();
                        }
                    }
                }
            }
        };

        var Area = function Area(corX, corY, width, height) {
            //обьект района
            this.corX = corX, this.corY = corY, this.width = width, this.height = height;

            this.arryStrings = [];
        };

        var Strings = function Strings(corX, corY, width, height) {
            //конструктор  сторки
            this.strcorX = corX, this.strcorY = corY, this.strWidth = width, this.strHeight = height, this.arrCell = [];
        };
        Strings.prototype = {
            positionString: function positionString(cordinY) {
                //изменение позиции строки и ячеик в ней 
                this.strcorY = cordinY;

                for (var i = 0; i < this.arrCell.length; i++) {
                    this.arrCell[i].cellCorY = cordinY;
                }
            }
        };

        var Cell = function Cell(corX, corY, width, height, countCell, hide) {
            // коструктор ячейки
            this.cellCorX = corX, this.cellCorY = corY, this.cellWidth = width, this.cellHeight = height, this.countCell = countCell, this.hide = hide;
        };
        Cell.prototype = {
            draw: function draw() {
                //отрисовка ячеик
                ctx.clearRect(this.cellCorX, this.cellCorY, this.cellWidth, this.cellHeight);
                ctx.strokeRect(this.cellCorX, this.cellCorY, this.cellWidth, this.cellHeight);
            },

            numberDraw: function numberDraw(countUser ) {
                //отрисоквка текста внутри ячейки

                ctx.font = "25px Arial";
                if(countUser ===undefined){

                    ctx.fillText(this.countCell, this.cellCorX + 10, this.cellCorY + 25);
                }
                else {
                    ctx.fillText(this.countUser, this.cellCorX + 10, this.cellCorY + 25);
                }

            },

        };

        var objectСreation = function objectСreation(arr, obj, cordinX, width, height, col) {
            //Создание районов 
            for (var i = 0; i < col; i++) {
                arr.push(new obj(cordinX, i * (height / 3), width, height / col));
            }

            generateStrings(arr);
        };

        var generateStrings = function generateStrings(arry) {
            //генерирую строки 

            for (var i = 0; i < arry.length; i++) {
                var cordinY = arry[i].corY;
                for (var j = 0; j < arry.length; j++) {

                    arry[i].arryStrings.push(new Strings(0, 0, arry[i].width, arry[i].height / 3));
                }
            }

            positionStringNew(arry);
            generateCell(arry);
        };

        var positionStringNew = function positionStringNew(arry) {
            for (var i = 0; i < arry.length; i++) {
                var cordinY = arry[i].corY;
                for (var j = 0; j < arry.length; j++) {

                    if (j === 0) {
                        arry[i].arryStrings[j].strcorY = cordinY;
                    } else {
                        cordinY += arry[i].height / 3;
                        arry[i].arryStrings[j].strcorY = cordinY;
                    }
                }
            }
        };

        var generateCell = function generateCell(arry) {
            //генерирую ячейки и ахуеваю с этой портянки !!! Придумаю лучше решение перепишу  
            for (var i in arry) {
                var counter = void 0;
                if (arry[i] === arry[0]) {
                    counter = 0;
                    for (var j in arry[i].arryStrings) {
                        if (j == 1) {
                            counter = 3;
                        }
                        if (j == 2) {
                            counter = 6;
                        }
                        for (var a = 0; a < 9; a++) {
                            if (counter === 9 && a < 9) {
                                counter = 0;
                            }
                            counter++;
                            arry[i].arryStrings[j].arrCell.push(new Cell(arry[i].width / 9 * a, arry[i].arryStrings[j].strcorY, arry[i].width / 9, arry[i].arryStrings[j].strHeight, counter, false)); //генерирую ячейку

                        }
                    }
                }

                if (arry[i] === arry[1]) {
                    counter = 1;
                    for (var _j in arry[i].arryStrings) {
                        if (_j == 1) {
                            counter = 4;
                        }
                        if (_j == 2) {
                            counter = 7;
                        }
                        for (var _a = 0; _a < 9; _a++) {
                            if (counter === 9 && _a < 9) {
                                counter = 0;
                            }
                            counter++;
                            arry[i].arryStrings[_j].arrCell.push(new Cell(arry[i].width / 9 * _a, arry[i].arryStrings[_j].strcorY, arry[i].width / 9, arry[i].arryStrings[_j].strHeight, counter, false));
                        }
                    }
                }

                if (arry[i] === arry[2]) {
                    counter = 2;
                    for (var _j2 in arry[i].arryStrings) {
                        if (_j2 == 1) {
                            counter = 5;
                        }
                        if (_j2 == 2) {
                            counter = 8;
                        }
                        for (var _a2 = 0; _a2 < 9; _a2++) {
                            if (counter === 9 && _a2 < 9) {
                                counter = 0;
                            }
                            counter++;
                            arry[i].arryStrings[_j2].arrCell.push(new Cell(arry[i].width / 9 * _a2, arry[i].arryStrings[_j2].strcorY, arry[i].width / 9, arry[i].arryStrings[_j2].strHeight, counter, false));
                        }
                    }
                }

                // randomString(arrArea)  
            }
        };

        objectСreation(arrArea, Area, 0, width, height, 3);

        //Перетасовка комбинаций
        var numbRandom = function numbRandom(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        var randomArea = function randomArea(areaArry) {

            var number = numbRandom(0, 2);
            if (number === 0) {
                areaArry[0].corY = areaArry[0].corY + areaArry[0].height;
                areaArry[1].corY = areaArry[1].corY - areaArry[1].height;
                positionStringNew(areaArry);
            }
            if (number === 1) {

                areaArry[1].corY = areaArry[1].corY + areaArry[1].height;
                areaArry[2].corY = areaArry[2].corY - areaArry[2].height;
                positionStringNew(areaArry);
            }
            if (number === 2) {
                areaArry[2].corY = areaArry[2].corY - areaArry[2].height - areaArry[2].height;
                areaArry[1].corY = areaArry[1].corY + areaArry[1].height;
                areaArry[0].corY = areaArry[0].corY + areaArry[0].height;
                positionStringNew(areaArry);
            }
        };

        var randomString = function randomString(arrObj) {
            //рандомное позиционирование строки в нутри района 
            var number = void 0;
            for (var i = 0; i < arrObj.length; i++) {
                number = numbRandom(0, 2);
                if (number === 0) {
                    arrObj[i].arryStrings[number + 1].positionString(arrObj[i].arryStrings[number].strcorY);

                    arrObj[i].arryStrings[number].positionString(arrObj[i].arryStrings[number].strcorY + arrObj[i].arryStrings[number].strHeight);

                    arrObj[i].arryStrings[number + 2].positionString(arrObj[i].arryStrings[number + 2].strcorY);
                };
                if (number === 1) {
                    arrObj[i].arryStrings[number].positionString(arrObj[i].arryStrings[number].strcorY - arrObj[i].arryStrings[number].strHeight);
                    arrObj[i].arryStrings[number - 1].positionString(arrObj[i].arryStrings[number - 1].strcorY + arrObj[i].arryStrings[number - 1].strHeight);
                    arrObj[i].arryStrings[number + 1].positionString(arrObj[i].arryStrings[number + 1].strcorY);
                };
                if (number === 2) {
                    arrObj[i].arryStrings[number - 2].positionString(arrObj[i].arryStrings[number - 2].strcorY);
                    arrObj[i].arryStrings[number].positionString(arrObj[i].arryStrings[number].strcorY - arrObj[i].arryStrings[number].strHeight);
                    arrObj[i].arryStrings[number - 1].positionString(arrObj[i].arryStrings[number - 1].strcorY + arrObj[i].arryStrings[number - 1].strHeight);
                };
            };
        };

        var hideCell = function hideCell(arrArea) {
            var number = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 25;


            for (var i = 0; i < number; i++) {
                var arre = arrArea[numbRandom(0, arrArea.length - 1)];
                var string = arre.arryStrings[numbRandom(0, arre.arryStrings.length - 1)];
                var cell = string.arrCell[numbRandom(0, string.arrCell.length - 1)];

                cell.hide = true;
            }
        };

        function creatComb(arrArea) {
            //создаем комбинацию 
            randomArea(arrArea);
            randomString(arrArea);
            hideCell(arrArea);
            drawSudok(arrArea);
        }

        creatComb(arrArea);
        var changeNumber  = function (cell) {
            var count;
            if (cell.countUser == undefined || cell.countUser  ===9 ){
                count=  cell.countUser = 1;
                cell.draw()
                cell.numberDraw(count);

            }
            else if( cell.countUser < 9)  {
                 count = cell.countUser += 1;
                cell.draw()
                 cell.numberDraw(count);

            }
            else {

            }

        }

        var inMouseCell = function searchCell(cursorX, cursorY) {
            for (var i in arrArea) {

                for (var j in arrArea[i].arryStrings) {

                    for (var a in arrArea[i].arryStrings[j].arrCell) {

                        var cell = arrArea[i].arryStrings[j].arrCell[a];
                        if (cursorX > cell.cellCorX && cursorX < cell.cellCorX + cell.cellWidth) {
                            if (cursorY > cell.cellCorY && cursorY < cell.cellCorY + cell.cellHeight) {
                                if(cell.hide){
                                    changeNumber(cell)
                                    console.log(cell)
                                }
                            }
                        }
                    }
                }
            }
        };
        canvas.addEventListener('click', function (event) {

            var x = event.offsetX == undefined ? event.layerX : event.offsetX;
            var y = event.offsetY == undefined ? event.layerY : event.offsetY;

            inMouseCell(x, y);
            // if (checkSudok(arrArea)) {
            //     alert('Молодец')
            // }

        });
    };

    //
    // function checkSudok(arrArea) {
    //     for (var i in arrArea) {
    //
    //         for (var j in arrArea[i].arryStrings) {
    //
    //             for (var a in arrArea[i].arryStrings[j].arrCell) {
    //
    //                 var cell = arrArea[i].arryStrings[j].arrCell[a];
    //
    //                 if (!cell.countCell === cell.countUser) {
    //                     return false
    //                 }
    //                 else {
    //                     return true
    //                 }
    //
    //
    //             }
    //         }
    //     }
    //
    // };

    generateCanvas();
});