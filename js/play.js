import {$} from "../library/jquery-4.0.0.slim.module.min.js";

function fixarMode(mode){
    var opc = localStorage.options
        ? JSON.parse(localStorage.options) : {};
    opc.mode = mode;
    localStorage.options = JSON.stringify(opc);
}

function entrar(mode){
    fixarMode(mode);
    var nom = prompt("Introdueix el teu nom:", "");
    localStorage.alias = nom;
    sessionStorage.removeItem('load');
    sessionStorage.removeItem('mode2_level');
    window.location.assign("./game.html");
}

$('#mode1').on('click', function(){ entrar('1'); });
$('#mode2').on('click', function(){ entrar('2'); });
$('#tornar').on('click', function(){
    window.location.assign("./canvasgame.html");
});