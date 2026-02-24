addEventListener('load', function() {
    
    document.getElementById('play').addEventListener('click', 
    function(){
        const nom_jugador = prompt("Introdueix el teu nom:",
                "");
        alert("Hola " + nom_jugador + "!\nComença la partida");
    });

    document.getElementById('options').addEventListener('click', 
    function(){
        console.error("Opció no implementada");
    });

    document.getElementById('saves').addEventListener('click', 
    function(){
        console.error("Opció no implementada");
    });

    document.getElementById('exit').addEventListener('click', 
    function(){
        console.warn("No es pot sortir!");
    });
});