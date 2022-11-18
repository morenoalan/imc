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
var currentLang = ['lang-pt', 'lang-en'];
var currentSist = ['sist-mks', 'sist-imp'];

function CheckIfMobile(){
    let checkMob = false;
    window.mobileAndTabletCheck = function() {
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) checkMob = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return checkMob;
    };
    if(checkMob === true){
        inputWeight.setAttribute('readonly', 'readonly');
        inputHeight.setAttribute('readonly', 'readonly');
    }else if(checkMob === false){
        inputWeight.removeAttribute('readonly');
        inputHeight.removeAttribute('readonly');
    }
}

function InitialState(){
    if(currentLang == 'lang-pt'){
        bmiResult.innerHTML = 'IMC';
        situTitle.innerHTML = 'Situação';
    }else if(currentLang == 'lang-en'){
        bmiResult.innerHTML = 'BMI';
        situTitle.innerHTML = 'Situação';
    }
    situTitle.setAttribute('class', '');
    bmiResult.style.color = 'var(--color-gray-two)';
    situTitle.style.color = 'var(--color-gray-two)';
    situAlert.setAttribute('class', 'display-none');
    equalSign.innerHTML = '=';
    inputHeight.value = '';
    inputWeight.value = '';
    currentInputWeight = '';
    currentInputHeight = '';
    inputWeight.focus();
    whereIsTheFocus = 'inputWeight';
    CheckIfMobile();
}
InitialState();

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
}

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
        'range':'40',
        'langpt':'Obesidade III (mórbida)',
        'langen':'Obese (Class III)'
    }
];

function Calculate(){
    let valuePrint = '';
    let valueResult = '';
    let valueWeight = Number(inputWeight.value);
    let valueHeight = Number(inputHeight.value);
    if(valueWeight && valueHeight != ''){
        valueResult = valueWeight / Math.pow(valueHeight, 2);
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
        }
        
        for(let i=0; i<statusList.length; i++){        
            if(valuePrint < statusList[i].range){
                currentLang[0] == 'lang-pt' ? console.log(statusList[i].langpt) : console.log(statusList[i].langen);
                return;
            }
        }
        if(valuePrint >= 40){
            currentLang[0] == 'lang-pt' ? console.log(statusList[statusList.length-1].langpt) : console.log(statusList[statusList.length-1].langen);
            console.log('range > 40');
        }

        if(valuePrint < 17){
            situStatus.innerHTML = 'Muito abaixo do peso';
        }else if(valuePrint < 18.49){
            situStatus.innerHTML = 'Abaixo do peso';
        }else if(valuePrint < 24.99){
            situStatus.innerHTML = 'Peso normal';
        }else if(valuePrint < 29.99){
            situStatus.innerHTML = 'Acima do peso';
        }else if(valuePrint < 34.99){
            situStatus.innerHTML = 'Obesidade I';
        }else if(valuePrint < 39.99){
            situStatus.innerHTML = 'Obesidade II (severa)';
        }else{
            situStatus.innerHTML = 'Obesidade III (mórbida)';
        }

    }else{
        InitialState();
    }
}
Calculate();

document.getElementById('copyleft-year').innerHTML =  new Date().getUTCFullYear();

function Tabulate(){
    if(whereIsTheFocus == 'inputWeight'){
        inputHeight.focus();
        whereIsTheFocus = 'inputHeight';
    }else if(whereIsTheFocus == 'inputHeight'){
        inputWeight.focus();
        whereIsTheFocus = 'inputWeight';
    }
}

document.addEventListener('keydown', function onEvent(event){
    if (event.key === 'Tab'){
        event.preventDefault();
        Tabulate();
    }
    if (event.key === 'Enter'){
        event.preventDefault();
        TapEnter();
    }
});

function AddNumber(digit){
    eval(whereIsTheFocus).value += digit.innerHTML;
    printInput();
}

function TapErase(){
    eval(whereIsTheFocus).value = eval(whereIsTheFocus).value.slice(0, -1);
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

function Clean(){
    InitialState();
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