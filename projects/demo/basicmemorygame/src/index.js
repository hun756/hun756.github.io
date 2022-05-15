/*
 *  File        :   index.js
 *  Explain     :   Javascript Basically Memory Game
 *  Author      :   Mehmet Ekemen
 *  Nickname    :   `hun
 *  Email       :   ekemenms@hotmail.com
 *  Date        :   15.05.2022 (DD-MM-YYYY)  (Updated)
 *  Github      :   github.com/hun756
 *  Resource    :   https://github.com/hun756/JavascriptBasicMemoryGame
**/

(function () {
    "use strict";

    /* Global game control objects */
    let clickedTiles = [], clickCount = 0, gameStart = false,
        colors = [], appliedArr = [], mutex_t = 0;

    const tilesMap = new Map([
        ["tile1", 0],
        ["tile2", 1],
        ["tile3", 2],
        ["tile4", 3],
        ["tile5", 4],
        ["tile6", 5],
        ["tile7", 6],
        ["tile8", 7],
        ["tile9", 8],
        ["tile10", 9],
    ]);

    const default_background = "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)";

    const tiles = document.querySelectorAll('.tiles');

    const timeOutValue = 250;
    const intervalTimeValue = 1000;

    function fillColor() {
        for (let i = 0; i < 5; i++) {
            colors.push(generateRandomColor());
        }
    };

    function generateRandomColor() {
        return "#" + (0xffffff * Math.random() << 0).toString(16).padStart(6, "0");
    }

    function assignAppliedArray() {
        for (let i = 0; i < colors.length; i++) {
            appliedArr.push(colors[i]);
            appliedArr.push(colors[i]);
        }
    }

    function shuffle(array) {
        var len = array.length,
            rnd,
            temp;
        while (len) {
            rnd = ~~(Math.random() * len--);
            temp = array[len];
            array[len] = array[rnd];
            array[rnd] = temp
        }
    }

    let dupClick = new Map([
        ["first", false],
        ["second", false]
    ]);

    function resetDupClick() {
        dupClick.set("first", false);
        dupClick.set("second", false);
    }

    let clickedTilesMap = new Map([
        ["firstTile", null],
        ["secondTile", null]
    ]);

    document.getElementById("start").addEventListener("click", startGame);
    document.getElementById("reset").addEventListener("click", resetGame);

    tiles.forEach(elem => {
        elem.addEventListener("click", () => {
            if (gameStart) {
                ++clickCount;

                if (!clickedTiles.includes(elem)) {
                    if (dupClick.get("first") == false) {
                        dupClick.set("first", true);
                        clickedTilesMap.set("firstTile", elem);

                        change_tiles(elem);

                    } else if (dupClick.get("first")) {
                        dupClick.set("second", true);
                        clickedTilesMap.set("secondTile", elem);

                        if (checkSameTiles(clickedTilesMap)) {
                            change_tiles(elem);
                            check(clickedTilesMap);
                            resetDupClick();
                        } else {
                            if (window) {
                                alert(`you clicked ${elem.id} already`)
                            }
                        }
                    }
                } else {
                    if (window) {
                        alert("Card already flipped...!")
                    }
                }
            }
        });
    });

    /**
     * @brief
     *   Check tile matching
     * @param {Map} mapObj
     *  type {firstTile: Obj, secondTile: Obj}
     */
    function check(mapObj) {
        let tile1 = mapObj.get("firstTile");
        let tile2 = mapObj.get("secondTile");

        if (appliedArr[tilesMap.get(tile1.id)] != appliedArr[tilesMap.get(tile2.id)]) {
            setTimeout(() => {
                tile1.style.background = default_background;
                tile2.style.background = default_background;
            }, timeOutValue);
        } else {
            clickedTiles.push(tile1);
            clickedTiles.push(tile2);
            if (checkWin()) {
                gameStart = false;
                if (window) {
                    if (mutex_t) {
                        onceClearInterVal();
                    }
                    alert("You win..!\nTotal Click is :" + clickCount);
                }
            }
            resetDupClick();
        }
    }

    function checkWin() {
        return clickedTiles.length == 10;
    }

    function checkSameTiles(mapObj) {
        return mapObj.get("firstTile") != mapObj.get("secondTile");
    }

    function resetVarShallow() {
        clickCount = 0;
        clickedTiles = [];
        gameStart = true;

        /** clear and assing new colors */
        colors = [];
        fillColor();

        /** assignappliedarray and shuffle it */
        appliedArr = [];
        assignAppliedArray();

        shuffle(appliedArr);
        shuffle(appliedArr);

        /** assign default background */
        for (let i = 0; i < tiles.length; i++) {
            const elm = tiles[i];
            elm.style.background = default_background;
        }

        timeControl();
    }

    function startGame() {
        if (!gameStart) {
            resetVarShallow();
        } else {
            if (window) {
                alert("Game already started");
            }
        }
    }

    function resetGame() {
        resetVarShallow();
    }

    function change_tiles(tile) {
        if (gameStart) {
            tile.style.background = appliedArr[tilesMap.get(tile.id)];
        } else {
            return;
        }
    }

    /** for time checking */
    function timeControl() {
        const timeElem = document.getElementById("time");
        let timeCount = 10;

        /** check is interval running ?  */
        if (mutex_t) {
            onceClearInterVal();
        }

        const interval = setInterval(() => {
            mutex_t = 1;
            if (timeCount >= 0) {
                timeElem.textContent = String(timeCount--);
            } else {
                if (checkWin()) {
                    gameStart = false;
                } else {
                    if (window) {
                        alert("Timout..!\nYou Lose..!\nTotal Click is : " + clickCount);
                    }
                }

                gameStart = false;
                mutex_t = 0;
                clearInterval(interval);
            }
        }, intervalTimeValue);
    }

    function onceClearInterVal() {
        const interval_id = window.setInterval(function () { }, Number.MAX_SAFE_INTEGER);

        for (let i = 1; i < interval_id; i++) {
            window.clearInterval(i);
        }
    }

})();