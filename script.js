function imcCalc() {
    let valuePrint = "";
    let valueResult = "";
    let valueWeight = Number(document.getElementById("peso").value);
    let valueHeight = Number(document.getElementById("altura").value);
    if(valueWeight && valueHeight != ""){
        valueResult = valueWeight / Math.pow(valueHeight, 2);
        valuePrint = parseFloat(valueResult.toFixed(2));
        document.getElementById("imc-result").innerHTML = valuePrint + " kg/m²";

        if(valuePrint < 17){
            document.getElementById("situation").innerHTML = "Muito abaixo do peso";
        }else if(valuePrint < 18.49){
            document.getElementById("situation").innerHTML = "Abaixo do peso";
        }else if(valuePrint < 24.99){
            document.getElementById("situation").innerHTML = "Peso normal";
        }else if(valuePrint < 29.99){
            document.getElementById("situation").innerHTML = "Acima do peso";
        }else if(valuePrint < 34.99){
            document.getElementById("situation").innerHTML = "Obesidade I";
        }else if(valuePrint < 39.99){
            document.getElementById("situation").innerHTML = "Obesidade II (severa)";
        }else{
            document.getElementById("situation").innerHTML = "Obesidade III (mórbida)";
        }

    }else{
        document.getElementById("imc-result").innerHTML = "IMC (kg/m²)";
        document.getElementById("situation").innerHTML = "Situação";
    }

    setTimeout(imcCalc, 1000/2);
}

imcCalc();

document.getElementById("copyleft-year").innerHTML =  new Date().getUTCFullYear();