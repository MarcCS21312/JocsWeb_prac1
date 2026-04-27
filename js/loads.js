import {$} from "../library/jquery-4.0.0.slim.module.min.js";

function pintar(){
    var llista = $('#llista');
    llista.empty();
    var trobades = 0;
    for (var i = 0; i < localStorage.length; i++){
        var k = localStorage.key(i);
        if (k.indexOf("save_") !== 0) continue;
        trobades++;
        var d = JSON.parse(localStorage[k]);
        var txt = d.alias + " - " + d.data + " - " + d.score + " punts";
        llista.append(
            '<li class="carregar" data-key="' + k + '">' + txt + '</li>'
        );
    }
    if (trobades === 0){
        llista.append('<li>Cap partida desada</li>');
    }
}

pintar();

$('#llista').on('click', '.carregar', function(){
    var k = $(this).attr('data-key');
    sessionStorage.load = localStorage[k];
    window.location.assign("./canvasgame.html");
});

$('#tornar').on('click', function(){
    window.location.assign("../");
});