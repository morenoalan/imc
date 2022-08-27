function imc_calc() {
    let conta01 = "";
    let conta02 = "";
    let valorP = Number(document.getElementById("peso").value);
    let valorA = Number(document.getElementById("altura").value);
    if(valorP && valorA != ""){
        conta02 = valorP / Math.pow(valorA, 2);
        conta01 = parseFloat(conta02.toFixed(2));
        document.getElementById("resultado_imc").innerHTML = conta01 + " kg/m²";

        if(conta01 < 17){
            document.getElementById("situation").innerHTML = "Muito abaixo do peso";
        }else if(conta01 < 18.49){
            document.getElementById("situation").innerHTML = "Abaixo do peso";
        }else if(conta01 < 24.99){
            document.getElementById("situation").innerHTML = "Peso normal";
        }else if(conta01 < 29.99){
            document.getElementById("situation").innerHTML = "Acima do peso";
        }else if(conta01 < 34.99){
            document.getElementById("situation").innerHTML = "Obesidade I";
        }else if(conta01 < 39.99){
            document.getElementById("situation").innerHTML = "Obesidade II (severa)";
        }else{
            document.getElementById("situation").innerHTML = "Obesidade III (mórbida)";
        }

    }else{
        document.getElementById("resultado_imc").innerHTML = "IMC (kg/m²)";
        document.getElementById("situation").innerHTML = "Situação";
    }

    setTimeout(imc_calc, 1000/2);
}

imc_calc();