const resources = [
    '../resources/c1.svg',
    '../resources/c2.svg',
    '../resources/c3.svg',
    '../resources/c4.svg',
    '../resources/c5.svg',
    '../resources/c6.svg'
];
const back = '../resources/back.svg';

const StateCard = Object.freeze({
  DISABLE: 0,
  ENABLE: 1,
  DONE: 2
});

var game = {
    partidaId: null,
    items: [],
    states: [],
    setValue: null,
    ready: 0,
    lastCard: null,
    score: 200,
    tempsTorn: 1000,
    penal: 25,
    mode: '1',
    pairs: 2,
    groupSize: 2,
    selected: [],
    goBack: function(idx){
        this.setValue && this.setValue[idx](back);
        this.states[idx] = StateCard.ENABLE;
    },
    goFront: function(idx){
        this.setValue && this.setValue[idx](this.items[idx]);
        this.states[idx] = StateCard.DISABLE;
    },
    select: function(){
        this.applyOptions();
        if (sessionStorage.load){ // Carreguem partida
            let toLoad = JSON.parse(sessionStorage.load);
            this.items = toLoad.items;
            this.states = toLoad.states;
            this.lastCard = toLoad.lastCard;
            this.score = toLoad.score;
            this.pairs = toLoad.pairs;
            this.groupSize = toLoad.groupSize || 2;
            this.partidaId = toLoad.partidaId || null;
        }
        else { // Nova partida
            this.items = resources.slice();
            shuffe(this.items);
            this.items = this.items.slice(0, this.pairs);
            var base = this.items.slice();
            for (var i = 1; i < this.groupSize; i++){
                this.items = this.items.concat(base);
            }
            shuffe(this.items);
            this.states = new Array(this.items.length);
            this.selected = [];
        }
    },
    start: function(){
        this.items.forEach((_,indx)=>{
            if (this.states[indx] === StateCard.DISABLE ||
                this.states[indx] === StateCard.DONE){
                this.ready++;
            }
            else{
                setTimeout(()=>{
                    this.ready++;
                    this.goBack(indx);
                }, 1000 + 100 * indx);
            }
        });
    },
    click: function(indx){
        if (this.states[indx] !== StateCard.ENABLE ||
            this.ready < this.items.length) return;
        if (this.selected.indexOf(indx) !== -1) return;

        this.goFront(indx);
        this.selected.push(indx);

        if (this.selected.length < this.groupSize) return;

        var primera = this.items[this.selected[0]];
        var iguals = true;
        for (var i = 1; i < this.selected.length; i++){
            if (this.items[this.selected[i]] !== primera){
                iguals = false;
                break;
            }
        }

        var grup = this.selected.slice();
        var that = this;

        if (iguals){
            grup.forEach(function(idx){
                that.states[idx] = StateCard.DONE;
            });
            this.pairs--;
            this.selected = [];
            if (this.pairs <= 0){
                alert("Has guanyat amb " + this.score + " punts!!!!");
                window.location.assign("../");
            }
        }
        else {
            this.score -= this.penal;
            this.ready = 0;
            this.selected = [];
            setTimeout(function(){
                grup.forEach(function(idx){ that.goBack(idx); });
                that.ready = that.items.length;
                if (that.score <= 0){
                    alert("Has perdut");
                    window.location.assign("../");
                }
            }, this.tempsTorn);
        }
    },
    applyOptions: function(){
        var raw = localStorage.options;
        if (!raw) return;
        var o = JSON.parse(raw);
        this.mode = o.mode || '1';
        if (this.mode === '1'){
            this.pairs     = parseInt(o.pairs)     || 2;
            this.groupSize = parseInt(o.groupSize) || 2;
            var d = o.difficulty || 'normal';
            if (d === 'easy')   { this.score = 300; this.tempsTorn = 1500; this.penal = 15; }
            if (d === 'normal') { this.score = 200; this.tempsTorn = 1000; this.penal = 25; }
            if (d === 'hard')   { this.score = 120; this.tempsTorn =  600; this.penal = 40; }
        }
    },
    save: function(){
        if (this.partidaId === null){
            this.partidaId = "p_" + Date.now();
        }
        let to_save = JSON.stringify({
            partidaId: this.partidaId,
            items: this.items,
            states: this.states,
            lastCard: this.lastCard,
            score: this.score,
            pairs: this.pairs,
            groupSize: this.groupSize,
            alias: localStorage.alias || "anonim",
            data: new Date().toLocaleString()
        });
        localStorage["save_" + this.partidaId] = to_save;
        alert("Partida desada");
        window.location.assign("../");
    }
}

function shuffe(arr){
    arr.sort(function () {return Math.random() - 0.5});
}

export var gameItems;
export function selectCards() { 
    game.select();
    gameItems = game.items;
}
export function clickCard(indx){ game.click(indx); }
export function startGame(){ game.start(); }
export function initCard(callback) { 
    if (!game.setValue) game.setValue = [];
    game.setValue.push(callback); 
}
export function saveGame(){
    game.save();
}