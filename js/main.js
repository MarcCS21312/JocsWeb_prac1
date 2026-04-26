document.getElementById('play').addEventListener('click', function(){
    window.location.assign("./html/play.html");
});

document.getElementById('options').addEventListener('click', 
function(){
    window.location.assign("./html/options.html");
});

document.getElementById('saves').addEventListener('click', function(){
    window.location.assign("./html/loads.html");
});

document.getElementById('exit').addEventListener('click', 
    function(){
    console.warn("No es pot sortir!");
});