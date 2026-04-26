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
    items: [],
    states: [],
    setValue: null,
    ready: 0,
    lastCard: null,
    score: 200,
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
        if (sessionStorage.load){ // Carreguem partida
            let toLoad = JSON.parse(sessionStorage.load);
            this.items = toLoad.items;
            this.states = toLoad.states;
            this.lastCard = toLoad.lastCard;
            this.score = toLoad.score;
            this.pairs = toLoad.pairs;
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
            this.score -= 25;
            this.ready = 0;
            this.selected = [];
            setTimeout(function(){
                grup.forEach(function(idx){ that.goBack(idx); });
                that.ready = that.items.length;
                if (that.score <= 0){
                    alert("Has perdut");
                    window.location.assign("../");
                }
            }, 1000);
        }
    },
    save: function(){
        let to_save = JSON.stringify({
            items: this.items,
            states: this.states,
            lastCard: this.lastCard,
            score: this.score,
            pairs: this.pairs
        });
        let ret = false;
        fetch('../php/save.php', {
            method: "POST",
            body: to_save,
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => ret = JSON.parse(response))
        .catch (err => console.error(err));

        if (!ret) {
            console.warn("La partida s'ha guardat en local.");
            localStorage.save = to_save;
        }
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