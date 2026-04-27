import {$} from "../library/jquery-4.0.0.slim.module.min.js";
import {clickCard, gameItems, selectCards, startGame, initCard, saveGame} from "./memory.js";

let game = $('#game');
let canvas = game[0].getContext('2d');
let resources = {};
let cards = {};
const e_click = {click: false, x: -1, y: -1}
let key = null;
const c_w = 96;
const c_h = 128;
let idxSel = -1;

if (canvas){
    game.attr("width", 800);
    game.attr("height", 600);
    start();
    update();
}

function start(){
    selectCards();
    cards = gameItems.map((c)=>{return {texture:c}});
    loadCardResource("../resources/back.svg");

    var total = cards.length;
    var cols = Math.ceil(Math.sqrt(total));
    var marge = 10;
    var totalW = cols * (c_w + marge) - marge;
    var rows = Math.ceil(total / cols);
    var totalH = rows * (c_h + marge) - marge;
    var x0 = (800 - totalW) / 2;
    var y0 = (600 - totalH) / 2;

    cards.forEach(function(card, indx){
        loadCardResource(card.texture);
        initCard(function(val){ card.texture = val; });
        var f = Math.floor(indx / cols);
        var c = indx % cols;
        card.position = {
            xMin: x0 + c * (c_w + marge),
            xMax: x0 + c * (c_w + marge) + c_w,
            yMin: y0 + f * (c_h + marge),
            yMax: y0 + f * (c_h + marge) + c_h
        };
        card.onClick = function(x, y){
            return x >= this.position.xMin && x <= this.position.xMax &&
                y >= this.position.yMin && y <= this.position.yMax;
        };
    });
    // Vincular events
    game.on('click', function(e){
        e_click.click = true;
        e_click.x = e.pageX - this.offsetLeft;
        e_click.y = e.pageY - this.offsetTop;
    });
    $(document).keydown(e=>key = e.key);
    startGame();
}

function update(){
    checkInput();
    draw();
    requestAnimationFrame(update);
}

function loadCardResource(src){
    if (!resources[src]){
        let res = {image: null, ready: false}
        res.image = new Image();
        res.image.src = src;
        res.image.onload = ()=> res.ready = true;
        resources[src] = res;
    }
}

function draw(){
    canvas.reset();
    cards.forEach((card, indx) => {
        let res = resources[card.texture];
        if (res.ready){
            if (idxSel === indx)
                canvas.drawImage(res.image, card.position.xMin, 
                                card.position.yMin, c_w + 4, c_h + 4);
            else
                canvas.drawImage(res.image, card.position.xMin, 
                                    card.position.yMin, c_w, c_h);
        }
    });
}

function checkInput(){
    if (e_click.click){
        cards.some((card, indx)=>{
            let click = card.onClick(e_click.x, e_click.y);
            if (click) clickCard(indx);
            return click;
        });
    }
    if (key){
        let prevIndx = idxSel;
        switch(key){
            case "Escape":
                saveGame();
                break;
            case "ArrowRight":
                idxSel = (idxSel + 1)%cards.length;
                break;
            case "ArrowLeft":
                idxSel = (idxSel - 1 + cards.length)%cards.length;
                break;
            case "Enter":
                if (idxSel >= 0) clickCard(idxSel);
                break;
            default:
                console.warn("Tecla "+key+" no reconeguda.");
        }
        if (idxSel != prevIndx){
            if (prevIndx >= 0) {
                cards[prevIndx].position.xMin += 2;
            }
            cards[idxSel].position.xMin -= 2;
        }
    }
    e_click.click = key = false;
}

$('#tornar').on('click', function(){
    window.location.assign("../");
});

$('#save').on('click', function(){
    saveGame();
});