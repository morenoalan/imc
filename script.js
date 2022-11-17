const inputWeight = document.getElementById("weight");
const inputHeight = document.getElementById("height");
var currentInputWeight = '11';
var currentInputHeight = '22';
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

function RefreshCurrentValues(replacedFutureInput) {
    if(whereIsTheFocus == 'inputWeight') {
        currentInputWeight = replacedFutureInput;
    }else if(whereIsTheFocus == 'inputHeight') {
        currentInputHeight = replacedFutureInput;
    }
}
function UpdateInput(replacedFutureInput) {
    console.log(replacedFutureInput);
    eval(whereIsTheFocus).value = replacedFutureInput;
    RefreshCurrentValues(replacedFutureInput);
}
function VerifyMaxLength(replacedFutureInput) {
    console.log(replacedFutureInput+' Veryf');
    let focusedCurrentValue = eval('current' + whereIsTheFocus.charAt(0).toUpperCase() + whereIsTheFocus.slice(1));
    console.log(replacedFutureInput.length+', '+eval(whereIsTheFocus).maxLength);
    if(replacedFutureInput.length <= eval(whereIsTheFocus).maxLength){
        console.log("go Update");
        UpdateInput(replacedFutureInput);
    }else{
        eval(whereIsTheFocus).value = focusedCurrentValue;
        RefreshCurrentValues(focusedCurrentValue);
        console.log("don't go Update");
        return;
    }
}
function VerifyCharacters() {
    let futureInputValue = eval(whereIsTheFocus).value;
    let replacedFutureInput = futureInputValue.replace(/([^\d.])+/gim, '').replace(/^([^.]*\.[^.]*)\./, '$1');
    console.log(replacedFutureInput+', '+futureInputValue);
    if(replacedFutureInput != futureInputValue){
        let focusedCurrentValue = eval('current' + whereIsTheFocus.charAt(0).toUpperCase() + whereIsTheFocus.slice(1));
        UpdateInput(focusedCurrentValue);
        console.log("different "+focusedCurrentValue+ " " +eval('current' + eval(whereIsTheFocus).charAt(0).toUpperCase() + eval(whereIsTheFocus).slice(1)));
    }else{
        VerifyMaxLength(replacedFutureInput);
        /*RefreshCurrentValues(focusedCurrentValue);*/
        console.log('equal');
        return;
    }
}
eval(whereIsTheFocus).addEventListener('input', printInput);
function printInput() {
    console.log(currentInputWeight+", "+currentInputHeight);
    VerifyCharacters();
}