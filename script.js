/* Pre-load Variables */
var currentLang = ['lang-pt', 'lang-en'];
var currentSist = ['sist-int', 'sist-imp'];

/* Storage Section */
/*
function saveTextOnLocalStorage(){
    var storedLang = currentLang[0];
    var storedSist = currentSist[0];
}

window.addEventListener('beforeunload', function(){
    saveTextOnLocalStorage();
});

if(localStorage.getItem('storedLang') != null){
    var storedLang = currentLang[0];
    list.push(list.splice(0,1)[0]);
    //currentLang = localStorage.getItem('currentLang');
}
if(localStorage.getItem('currentSist') != null){
    currentSist = localStorage.getItem('currentSist');
}
*/
/* Machine */
const inputWeight = document.getElementById('weight');
const inputHeight = document.getElementById('height');
const situTitle = document.getElementById('situation-title');
const situStatus = document.getElementById('situation-status');
const situAlert = document.getElementById('situation-alert');
const bmiResult = document.getElementById('bmi-result');
const equalSign = document.getElementById('equal-sign');

var currentInputWeight = '';
var currentInputHeight = '';
var whereIsTheFocus = 'inputWeight';

function InitialState(){
    if(currentLang[0] == 'lang-pt'){
        bmiResult.innerHTML = 'IMC';
        situTitle.innerHTML = 'Situação';
    }else if(currentLang[0] == 'lang-en'){
        bmiResult.innerHTML = 'BMI';
        situTitle.innerHTML = 'Situation';
    }
    situTitle.setAttribute('class', '');
    bmiResult.style.color = 'var(--color-gray-two)';
    situTitle.style.color = 'var(--color-gray-two)';
    situStatus.setAttribute('class', 'display-none');
    situAlert.setAttribute('class', 'display-none');
    equalSign.innerHTML = '=';
    inputHeight.value = '';
    inputWeight.value = '';
    currentInputWeight = '';
    currentInputHeight = '';
    inputWeight.focus();
    whereIsTheFocus = 'inputWeight';
}
InitialState();

const statusList = [
    {
        'range':'17',
        'langpt':'Muito abaixo do peso',
        'langen':'Unhealty underweight'
    },
    {
        'range':'18.49',
        'langpt':'Abaixo do peso',
        'langen':'Underweight'
    },
    {
        'range':'24.99',
        'langpt':'Peso normal',
        'langen':'Normal range'
    },
    {
        'range':'29.99',
        'langpt':'Acima do peso',
        'langen':'Overweight (Pre-obese)'
    },
    {
        'range':'34.99',
        'langpt':'Obesidade I',
        'langen':'Obese (Class I)'
    },
    {
        'range':'39.99',
        'langpt':'Obesidade II (severa)',
        'langen':'Obese (Class II)'
    },
    {
        'range':'999999',
        'langpt':'Obesidade III (mórbida)',
        'langen':'Obese (Class III)'
    }
];
var setStatus;
function GetStatus(){
    for(let i=0; i<statusList.length; i++){        
        if(valuePrint < statusList[i].range){
            currentLang[0] == 'lang-pt' ? setStatus = statusList[i].langpt : setStatus = statusList[i].langen;
            return;
        }
    }
}
var valuePrint;
function Calculate(){
    let valueResult = '';
    let valueWeight = Number(inputWeight.value);
    let valueHeight = Number(inputHeight.value);
    if(valueWeight && valueHeight != ''){
        if(currentSist[0] == 'sist-int'){
            valueResult = valueWeight / Math.pow(valueHeight, 2);
        }else if(currentSist[0] == 'sist-imp'){
            valueResult = (valueWeight / Math.pow(valueHeight, 2)) * 703;
        }
        valuePrint = parseFloat(valueResult.toFixed(1));
        if (valuePrint > 100){
            bmiResult.innerHTML = '100';
            equalSign.innerHTML = '>';
        }else{
            bmiResult.innerHTML = valuePrint;
            equalSign.innerHTML = '=';
        }
        if(typeof valuePrint == 'number'){
            bmiResult.style.color = 'var(--color-gray-two)';
            situTitle.style.color = 'var(--color-gray-two)';
            situAlert.setAttribute('class', '');
            situTitle.setAttribute('class', 'display-none');
            situStatus.setAttribute('class', '');
            GetStatus();
            situStatus.innerHTML = setStatus;
        }
    }else{
        InitialState();
    }
}

document.getElementById('copyleft-year').innerHTML =  new Date().getUTCFullYear();

function Clean(){
    InitialState();
}

function TapErase(){
    eval(whereIsTheFocus).value = eval(whereIsTheFocus).value.slice(0, -1);
}

function Tabulate(){
    if(whereIsTheFocus == 'inputWeight'){
        inputHeight.focus();
        whereIsTheFocus = 'inputHeight';
    }else if(whereIsTheFocus == 'inputHeight'){
        inputWeight.focus();
        whereIsTheFocus = 'inputWeight';
    }
}

function TapEnter(){
    if(inputWeight.value == ''){
        inputWeight.focus();
        whereIsTheFocus = 'inputWeight';
    }else if(inputHeight.value == ''){
        inputHeight.focus();
        whereIsTheFocus = 'inputHeight';
    }else{
        Calculate();
        Tabulate();
    }
}

function AddNumber(digit){
    eval(whereIsTheFocus).value += digit.innerHTML;
    printInput();
}

var hearingKeyDown = [
    {'key':'0', 'print': '0'},
    {'key':'1', 'print': '1'},
    {'key':'2', 'print': '2'},
    {'key':'3', 'print': '3'},
    {'key':'4', 'print': '4'},
    {'key':'5', 'print': '5'},
    {'key':'6', 'print': '6'},
    {'key':'7', 'print': '7'},
    {'key':'8', 'print': '8'},
    {'key':'9', 'print': '9'},
    {'key':',', 'print': '.'},
    {'key':'.', 'print': '.'}
];
document.addEventListener('keydown', function onEvent(event){
    if (event.key === 'Tab'){
        event.preventDefault();
        Tabulate();
        return;
    }
    if (event.key === 'Enter'){
        event.preventDefault();
        TapEnter();
        return;
    }
    if (event.key === 'Backspace'){
        event.preventDefault();
        TapErase()
        return;
    }
    for(let i=0; i<hearingKeyDown.length; i++){
        if (event.key ===  hearingKeyDown[i].key){
            event.preventDefault();
            let doc = new DOMParser().parseFromString('<p>'+hearingKeyDown[i].print+'</p>', 'text/html');
            let digit = doc.getElementsByTagName('p')[0];
            AddNumber(digit);
            return;
        }
    }
});

var firstListOfChanges = [];
var secondListOfChanges = [];
function ChangeClass(list){
    firstListOfChanges = document.getElementsByClassName(list[0]);
    secondListOfChanges = document.getElementsByClassName(list[1]);
    for(let i=0; i < firstListOfChanges.length; i++){
        firstListOfChanges[i].classList.add('display-none');
        secondListOfChanges[i].classList.remove('display-none');
    }
    list.push(list.splice(0,1)[0]);
    if(list[0] == 'lang-pt'){
        inputWeight.setAttribute('placeholder', 'PESO');
        inputHeight.setAttribute('placeholder', 'ALTURA');
        document.getElementById('title').innerHTML = 'IMC';
        InitialState();
    }else if(list[0] == 'lang-en'){
        inputWeight.setAttribute('placeholder', 'WEIGHT');
        inputHeight.setAttribute('placeholder', 'HEIGHT');
        document.getElementById('title').innerHTML = 'BMI';
        InitialState();
    }else if(list[0] == 'sist-int' || list[0] == 'sist-imp'){
        InitialState();
    }
}

function RefreshCurrentValues(replacedFutureInput){
    if(whereIsTheFocus == 'inputWeight'){
        currentInputWeight = replacedFutureInput;
    }else if(whereIsTheFocus == 'inputHeight'){
        currentInputHeight = replacedFutureInput;
    }
}
function UpdateInput(replacedFutureInput){
    eval(whereIsTheFocus).value = replacedFutureInput;
    RefreshCurrentValues(replacedFutureInput);
}
function VerifyMaxLength(replacedFutureInput){
    let focusedCurrentValue = 'current' + whereIsTheFocus.charAt(0).toUpperCase() + whereIsTheFocus.slice(1);
    if(replacedFutureInput.length <= eval(whereIsTheFocus).maxLength){
        UpdateInput(replacedFutureInput);
    }else{
        eval(whereIsTheFocus).value = eval(focusedCurrentValue);
        RefreshCurrentValues(eval(focusedCurrentValue));
        return;
    }
}
function VerifyCharacters(){
    let futureInputValue = eval(whereIsTheFocus).value;
    let replacedFutureInput = futureInputValue.replace(/([^\d.])+/gim,'').replace(/^([^.]*\.[^.]*)\./, '$1');
    if(replacedFutureInput != futureInputValue){
        let focusedCurrentValue = eval('current' + whereIsTheFocus.charAt(0).toUpperCase() + whereIsTheFocus.slice(1));
        UpdateInput(focusedCurrentValue);
    }else{
        VerifyMaxLength(replacedFutureInput);
        return;
    }
}
inputWeight.addEventListener('input', printInput);
inputHeight.addEventListener('input', printInput);
function printInput(){
    VerifyCharacters();
}