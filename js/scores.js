import {$} from "../library/jquery-4.0.0.slim.module.min.js";

var raw = localStorage.ranking;
var llista = raw ? JSON.parse(raw) : [];
var top = llista.slice(0, 10);
var ol = $('#ranking');

if (top.length === 0){
    ol.append('<li>Encara no hi ha puntuacions</li>');
} else {
    top.forEach(function(e){
        ol.append('<li>' + e.alias +
            ' - nivell ' + e.level +
            ' - ' + e.punts + ' punts</li>');
    });
}

$('#tornar').on('click', function(){
    window.location.assign("../");
});