'use strict';

/**
 *  File        :   main.hpp
 *  Explain     :   Javascript 4 operaiton Math Game
 *  Author      :   Mehmet Ekemen
 *  Nickname    :   `hun
 *  Email       :   ekemenms@hotmail.com
 *  Date        :   20.04.2022 (DD-MM-YYYY)  (Updated)
 *  Github      :   github.com/hun756
 *  Resource    :   https://github.com/hun756/Javascript4OperationMathGame
**/

const __bi = Math.imul, __bf = (x)=> ~~x, __td = new TextDecoder();

/** 
 * Application starting point.
**/
document.addEventListener('DOMContentLoaded', () => {
    console.clear();
    
    /** Game Variables */
    const inputElem = byId('inputElem'),
    checkButton = byId('chck-btn'),
    reloadButton = byId('reload');

    /** Modal Variables */
    const modal = byId('modal'),
    theAnswer = byQS('.theAnswer'),
    closeButton = byQS('.close');

    /** Ask Variables */
    const op = byQS('.op'),
    num1 = byQS('.blue'),
    num2 = byQS('.red')

    /** Answer Options */
    let answerOptions = [
        // Correct, good work
        __td.decode($answeroption01),
        // "Incorrext, try again"
        __td.decode($answeroption02)
    ];

    /** Operations */
    let operations = ['+', '-', '*', '/']

    update();
    /** Generate Formula */
    function update() {
        const opCh = operations[generateRandom(0, 4)];
        op.textContent = opCh;

        let opnum1, opnum2;

        switch (opCh) {
            case '+':
            case '-': {
                num1.textContent = String(generateRandom(1, 100));
                num2.textContent = String(generateRandom(1, 100));
                break;
            }
            case '*': {
                num1.textContent = String(generateRandom(0, 10));
                num2.textContent = String(generateRandom(1, 100));
                break;
            }
            case '/': {
                opnum1 = generateRandom(1, 100);
                num1.textContent = String(opnum1);
                const _divNums = divisibleNums(opnum1);
                opnum2 = _divNums[generateRandom(0, _divNums.length)];
                num2.textContent = String(opnum2);

                break;
            }

            default: {
                throw new Error('Operator not found..!');
            }
        }
    }

    /**
     *  Handle click event. (Fro answer checking and showing modal) 
    **/
    const __click__callback = () => {
        modal.style.display = 'block'; // this returns string parse int
        if (check()) {
            modal.style.background = "rgb(46, 204, 113)";
            theAnswer.textContent = answerOptions[0];
        } else {
            modal.style.background = "#e74c3c";
            theAnswer.textContent = answerOptions[1];
        }
    }

    /** 
     *  Keyboard Events
     */
    const _chck_enter_callback = (e) => {
        if (e.keyCode == 13) {
            __click__callback();
        }
    }

    const _esc_key_callback = (e) => {
        if (e.keyCode == 27) {
            refresh();
        }
    }

    // chck-button user input
    checkButton.addEventListener('click', __click__callback);

    inputElem.addEventListener('keydown', _chck_enter_callback);

    document.addEventListener('keydown', _esc_key_callback);

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    reloadButton.addEventListener('click', () => {
        refresh();
    });

    const check = () => {
        let userInput = +inputElem.value;
        const c_num1 = +(num1.innerText) | 0;
        const c_num2 = +(num2.innerText) | 0;
        const c_op = op.innerText;

        let res = 0 | 0;

        switch (c_op) {
            case '+': {
                res = add(c_num1, c_num2);
                break;
            }
            case '-': {
                res = sub(c_num1, c_num2);
                break;
            }
            case '*': {
                res = mul(c_num1, c_num2);
                break;
            }
            case '/': {
                res = div(c_num1, c_num2);
                break;
            }
            default: {
                throw new Error('Invalid op ' + op);
                debugger;
            }
        }

        return userInput == res;
    }

    const refresh = () => {
        modal.style.display = 'none';
        update();
        inputElem.value = "";
    }
});

/* find divisble numbers */
function divisibleNums(num) {
    let result = new Array();
    const sqpoint = __bf(Math.sqrt(num));

    result.push(1);
    for (let i = 2; i < sqpoint; ++i) {
        if (num % i == 0) {
            result.push(i);
            result.push(num / i);
        }
    }
    result.push(num);
    return result;
}

/**
 * @param {string} x
 */
const byId = (x) => document.getElementById(x); 

/**
 * @param {string} x
 */
const byQS = (x) => document.querySelector(x);

/** Generate Random */
/**
 *  @brief
 *      This method generates a random number given range.
 *  @param {in} from 
 *  @param {in} to 
 *  @returns [int]
 */
const generateRandom = (from, to) => 0 | ~~(+Math.random() * to + from);


/* arithmetic operations */
const add = (a, b) => a + b;
const sub = (a, b) => a - b;
const mul = (a, b) => __bi(a, b);
const div = (a, b) => a / b;

/** Variables */
const $answeroption01 = new Uint8Array([
    67, 111, 114, 114, 101, 99, 116, 44, 32, 103, 111, 111, 100, 32, 119, 111,
    114, 107, 0
]);
const $answeroption02 = new Uint8Array([
    73, 110, 99, 111, 114, 114, 101, 99, 116, 44, 32, 116, 114, 121, 32, 97,
    103, 97, 105, 110, 0
]);