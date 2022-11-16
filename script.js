const inputWeight = document.getElementById("weight");
const inputHeight = document.getElementById("height");
var currentInputWeight = '';
var currentInputHeight = '';
var whereIsTheFocus = 'inputWeight';

function InitialState() {
    document.getElementById("imc-result").innerHTML = "IMC";
    document.getElementById("imc-result").style.color = 'var(--color-gray-two)';
    document.getElementById("situation").children[0].innerHTML = "Situação";
    document.getElementById("situation").children[0].style.color = 'var(--color-gray-two)';
    document.getElementById("situation").children[1].setAttribute('class', 'display-none');
    document.getElementById("equal-sign").innerHTML = "=";
    inputWeight.focus();
    whereIsTheFocus = 'inputWeight';
}
InitialState();

function imcCalc() {
    let valuePrint = "";
    let valueResult = "";
    let valueWeight = Number(inputWeight.value);
    let valueHeight = Number(inputHeight.value);
    if(valueWeight && valueHeight != ""){
        valueResult = valueWeight / Math.pow(valueHeight, 2);
        valuePrint = parseFloat(valueResult.toFixed(1));
        if (valuePrint > 100){
            document.getElementById("imc-result").innerHTML = "100";
            document.getElementById("equal-sign").innerHTML = ">";
        }else{
            document.getElementById("imc-result").innerHTML = valuePrint;
            document.getElementById("equal-sign").innerHTML = "=";
        }
        if(typeof valuePrint == 'number') {
            document.getElementById("imc-result").style.color = 'var(--color-gray-two)';
            document.getElementById("situation").children[0].style.color = 'var(--color-gray-two)';
            document.getElementById("situation").children[1].setAttribute('class', '');
        }
        if(isNaN(valuePrint) == true) {
            console.log("it's not a number");
        }else if(typeof valuePrint == 'number'){
            console.log("it is a number");
        }

        if(valuePrint < 17){
            document.getElementById("situation").children[0].innerHTML = "Muito abaixo do peso";
        }else if(valuePrint < 18.49){
            document.getElementById("situation").children[0].innerHTML = "Abaixo do peso";
        }else if(valuePrint < 24.99){
            document.getElementById("situation").children[0].innerHTML = "Peso normal";
        }else if(valuePrint < 29.99){
            document.getElementById("situation").children[0].innerHTML = "Acima do peso";
        }else if(valuePrint < 34.99){
            document.getElementById("situation").children[0].innerHTML = "Obesidade I";
        }else if(valuePrint < 39.99){
            document.getElementById("situation").children[0].innerHTML = "Obesidade II (severa)";
        }else{
            document.getElementById("situation").children[0].innerHTML = "Obesidade III (mórbida)";
        }

    }else{
        InitialState();
    }
}
imcCalc();

document.getElementById("copyleft-year").innerHTML =  new Date().getUTCFullYear();

function Tabulate() {
    if(whereIsTheFocus == 'inputWeight'){
        inputHeight.focus();
        whereIsTheFocus = 'inputHeight';
    }else if(whereIsTheFocus == 'inputHeight') {
        inputWeight.focus();
        whereIsTheFocus = 'inputWeight';
    }
    console.log(whereIsTheFocus);
}

document.addEventListener("keydown", function onEvent(event) {
    if (event.key === 'Tab') {
        event.preventDefault();
        Tabulate();
    }
    if (event.key === 'Enter') {
        event.preventDefault();
        TapEnter();
    }
});

function AddNumber(digit) {
    eval(whereIsTheFocus).value += digit.innerHTML;
    printInput();
}

function TapErase() {
    eval(whereIsTheFocus).value = eval(whereIsTheFocus).value.slice(0, -1);
}

function TapEnter() {
    if(inputWeight.value == ''){
        inputWeight.focus();
        whereIsTheFocus = 'inputWeight';
    }else if(inputHeight.value == ''){
        inputHeight.focus();
        whereIsTheFocus = 'inputHeight';
    }else{
        imcCalc();
        Tabulate();
    }
}
function Clean() {
    inputHeight.value = '';
    inputWeight.value = '';
    InitialState();
}


/* in Process: */
function updateInput() {
    let replaceInputNumber = eval(whereIsTheFocus).value;
    let onlyNumbers = replaceInputNumber.replace(/([^\d.])+/gim, '').replace(/^([^.]*\.[^.]*)\./, '$1');
    eval(whereIsTheFocus).value = onlyNumbers;
    console.log(replaceInputNumber);
}
function verifyMaxLength() {
    whatsLength = eval(whereIsTheFocus).maxLength;
}
eval(whereIsTheFocus).addEventListener('input', printInput);
function printInput(){
    verifyMaxLength = eval(whereIsTheFocus).value;
    if(verifyMaxLength < eval(whereIsTheFocus).maxLength){

    }else{
        eval(whereIsTheFocus).value = eval(concat('current',eval(whereIsTheFocus).charAt(0).toUpperCase(),eval(whereIsTheFocus).slice(1)));
    }
}