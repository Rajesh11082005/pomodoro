const BODY = document.getElementById('body');
const MAIN = document.getElementById('main-wrapper');

const T = document.getElementById('t');
const B = document.getElementById('b');
const M = document.getElementById('m');
const MENU = document.getElementById('menu');
const CHECK = document.getElementsByClassName('checkmark');
const RANGE = document.getElementsByClassName('range');
const CM = document.getElementsByClassName('checkmark');

const PATH = document.getElementsByClassName("path")

const FRAME = document.getElementById("spotify")

const K = document.getElementsByClassName("b")

const FBTN = document.getElementsByClassName("fbtn")

const SBTN = document.getElementById("start")

const root = document.documentElement;

let fillColor = "#74D5FF";
let shadowColor = "#30CDFF"




function rangeSlide(value, inp1, inp2) {
    document.getElementById(inp1).innerHTML = value < 10 ? `0${value}` : value;
    document.getElementById(inp2).innerHTML = value < 10 ? `0${value}` : value;
}
function rangeSlide2(value, inp){
    document.getElementById(inp).innerHTML = value < 10 ? `0${value}` : value;
}

function changeColor(tfillColor, tshadowColor){
    fillColor = tfillColor ;

    shadowColor = tshadowColor ;
    
    
    console.log(tshadowColor)

    root.style.setProperty('--thumbcolor', tfillColor);
    root.style.setProperty('--hovercolor', tshadowColor);
}


function moveMenu() {
    const menuElement = document.getElementById("menu");
    const checkbox = document.getElementById("check");

    if (checkbox.checked) {
        menuElement.style.transform = "translate(-50%, -50%) scale(1)";
        menuElement.style.opacity = "1";
    } else {
        menuElement.style.transform = "translate(-50%, -50%) scale(0)";
        menuElement.style.opacity = "0";
    }
    console.log("pressed")
}

document.getElementById("ham").addEventListener("click", moveMenu)
document.getElementById("red").addEventListener("click", function(){
    changeColor('#FF7474','#FF7474a2');
})
document.getElementById("yellow").addEventListener("click", function(){
    changeColor('#DFE302','#DFE302a2');
})
document.getElementById("green").addEventListener("click", function(){
    changeColor('#77FF74','#77FF74a2');
})
document.getElementById("blue").addEventListener("click", function(){
    changeColor('#74D5FF','#74D5FFa2');
})
document.getElementById("orange").addEventListener("click", function(){
    changeColor('#FF7425','#FF7425a2')
});





export { fillColor, shadowColor, rangeSlide, changeColor, K , rangeSlide2};

