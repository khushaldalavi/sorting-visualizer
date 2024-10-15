
/*
Variable naming convention: <object>_<action>_<objectname>; Example -> Button_click_b1;
*/

//Variables (BE CAREFUL THESE MIGHT BE USED IN OTHER JS FILES TOO)
var inp_as = document.getElementById('a_size'), array_size = inp_as.value;
var inp_gen = document.getElementById("a_generate");
var inp_aspeed = document.getElementById("a_speed");
var array_speed = document.getElementById('a_speed').value;

var butts_algos = document.querySelectorAll(".algos button");
let user=document.getElementById("own_arr_btn")

var div_sizes = [];
var divs = [];
var margin_size;
var cont = document.getElementById("array_container");
cont.style = "flex-direction:row";

//Array generation and updation.

inp_gen.addEventListener("click", generate_array);
inp_as.addEventListener("input", update_array_size);
user.addEventListener("click", generate_user_array);

function generate_array() {
    cont.innerHTML = "";

    for (var i = 0; i < array_size; i++) {
        div_sizes[i] = Math.floor(Math.random() * 0.5 * (inp_as.max - inp_as.min)) + 10;
        divs[i] = document.createElement("div");
        cont.appendChild(divs[i]);
        margin_size = 0.1;
        divs[i].style = " margin:0% " + margin_size + "%; background-color:blue; width:" + (100 / array_size - (2 * margin_size)) + "%; height:" + (div_sizes[i]) + "%;";
        const d = divs[i]
        divs[i].addEventListener('click', () => { console.log('click', d.style.height) })
        divs[i].dataset.height = div_sizes[i]
    }
}

function getInput() {
    // return [10, 50, 30, 100, 200]
    var myinputarr = [];
    var size = prompt('Enter array Size ');
    for (var a = 0; a < size; a++) {
        myinputarr[a] = prompt('Enter array Element ' + (a + 1));
    }
    return myinputarr;
}

function scaleInput(inp, min, max) {
   // var result = Math.floor(50 * (inp - min) / (max - min)) + 10
   var result = inp;
    console.log(inp, min, max, result);
    return result;
}

function generate_user_array() {
    cont.innerHTML = "";
    var myinputarr = getInput();
    array_size = myinputarr.length;
    var min = Math.min(...myinputarr);
    var max = Math.max(...myinputarr);
    for (var a = 0; a < myinputarr.length; a++) {
        div_sizes[a] = scaleInput(myinputarr[a], min, max);
        divs[a] = document.createElement("div");
        cont.appendChild(divs[a]);
        margin_size = 0.1;
        var styleStr = " margin:0% " + margin_size + "%; background-color:blue; width:" + (100 / myinputarr.length - (2 * margin_size)) + "%; height:" + (div_sizes[a]) + "%;";
        divs[a].style = styleStr;
        divs[a].dataset.height = div_sizes[a]

    }
}

function update_array_size() {
    array_size = inp_as.value;
    generate_array();
}

window.onload = update_array_size();

//Running the appropriate algorithm.
for (var i = 0; i < butts_algos.length; i++) {
    butts_algos[i].addEventListener("click", runalgo);
}

function disable_buttons() {
    for (var i = 0; i < butts_algos.length; i++) {
        butts_algos[i].classList = [];
        butts_algos[i].classList.add("butt_locked");
        butts_algos[i].disabled = true;
        inp_as.disabled = true;
        inp_gen.disabled = true;
        inp_aspeed.disabled = true;
        user.disabled=true;

    }
}

function runalgo() {
    disable_buttons();

    this.classList.add("butt_selected");
    switch (this.innerHTML) {
        case "Bubble": Bubble();
            break;
        case "Selection": Selection_sort();
            break;
        case "Insertion": Insertion();
            break;
        case "Merge": Merge();
            break;
        case "Quick": Quick();
            break;
        case "Heap": Heap();
            break;
    }
}

