"use strict";
var car;
// CREATE CAR
function createCar(plate, color, brand) {
    car = new Car(plate, color, brand);
}
function submitCar() {
    var carPlate = document.getElementById("plate").value;
    var carBrand = document.getElementById("brand").value;
    var carColor = document.getElementById("color").value;
    var platePattern = /\b[0-9]{4}[A-Za-z]{3}\b/;
    ///\b\d{4}[a-zA-Z]{3}\b/;
    if (carPlate == "" || carBrand == "" || carColor == "") {
        var errorTxt = document.getElementById("carError");
        error(errorTxt);
    }
    else if (carPlate != "" && !(carPlate.match(platePattern))) {
        var carPlateField = document.getElementById("plate");
        var plateErrorTxt = document.getElementById("plateError");
        errorField(plateErrorTxt, carPlateField);
    }
    else {
        var carInputs = document.getElementById("carInputs");
        var wheelsInputs = document.getElementById("wheelsInputs");
        displayContent(wheelsInputs, carInputs);
        createCar(carPlate, carColor, carBrand);
    }
}
// ADD WHEELS
function submitWheels() {
    var brandWheel1 = document.getElementById("brandWheel1");
    var brandWheel2 = document.getElementById("brandWheel2");
    var brandWheel3 = document.getElementById("brandWheel3");
    var brandWheel4 = document.getElementById("brandWheel4");
    var diameterWheel1 = document.getElementById("diameterWheel1");
    var diameterWheel2 = document.getElementById("diameterWheel2");
    var diameterWheel3 = document.getElementById("diameterWheel3");
    var diameterWheel4 = document.getElementById("diameterWheel4");
    var errorTxt1 = document.getElementById("wheelErrorField1");
    var errorTxt2 = document.getElementById("wheelErrorField2");
    var errorTxt3 = document.getElementById("wheelErrorField3");
    var errorTxt4 = document.getElementById("wheelErrorField4");
    var errorTxt = document.getElementById("wheelError");
    if (brandWheel1.value == "" || brandWheel2.value == "" || brandWheel3.value == "" || brandWheel4.value == "" || diameterWheel1.value == "" || diameterWheel2.value == "" || diameterWheel3.value == "" || diameterWheel4.value == "") {
        error(errorTxt);
    }
    //Añadimos rueda tras comprobar que todos los campos estan con valores.
    else {
        var Wheel1 = new Wheel(diameterWheel1.value, brandWheel1.value);
        if (validateDiameter(Wheel1.diameter) == true) {
            car.addWheel(new Wheel(diameterWheel1.value, brandWheel1.value));
            resetErrorField(errorTxt1, diameterWheel1);
        }
        else {
            errorField(errorTxt1, diameterWheel1);
            errorTxt1.innerHTML = "Wheel 1: Incorrect diameter.";
        }
        var Wheel2 = new Wheel(diameterWheel2.value, brandWheel2.value);
        if (validateDiameter(Wheel2.diameter) == true) {
            car.addWheel(new Wheel(diameterWheel2.value, brandWheel2.value));
            resetErrorField(errorTxt2, diameterWheel2);
        }
        else {
            errorField(errorTxt2, diameterWheel2);
            errorTxt2.innerHTML = "Wheel 2: Incorrect diameter.";
        }
        var Wheel3 = new Wheel(diameterWheel3.value, brandWheel3.value);
        if (validateDiameter(Wheel3.diameter) == true) {
            car.addWheel(new Wheel(diameterWheel3.value, brandWheel3.value));
            resetErrorField(errorTxt3, diameterWheel3);
        }
        else {
            errorField(errorTxt3, diameterWheel3);
            errorTxt3.innerHTML = "Wheel 3: Incorrect diameter.";
        }
        var Wheel4 = new Wheel(diameterWheel4.value, brandWheel4.value);
        if (validateDiameter(Wheel4.diameter) == true) {
            car.addWheel(new Wheel(diameterWheel4.value, brandWheel4.value));
            resetErrorField(errorTxt4, diameterWheel4);
        }
        else {
            errorField(errorTxt4, diameterWheel4);
            errorTxt4.innerHTML = "Wheel 4: Incorrect diameter.";
        }
        if ((validateDiameter(Wheel1.diameter) == true) && (validateDiameter(Wheel2.diameter) == true) && (validateDiameter(Wheel3.diameter) == true) && (validateDiameter(Wheel4.diameter) == true)) {
            var wheelsInputs = document.getElementById("wheelsInputs");
            var newCarInfo = document.getElementById("carInfo");
            displayContent(newCarInfo, wheelsInputs);
            showCarInfo(car.plate, car.brand, car.color);
            showWheels();
        }
    }
} //submitWheels END
//valida el diámetro de la rueda y retorna true si es correcto (isValid)
function validateDiameter(wheeldiameter) {
    var isValid = true;
    if (wheeldiameter > 0.4 && wheeldiameter < 2) {
        isValid;
    }
    else {
        isValid = false;
    }
    return isValid;
}
// muestra la info del coche una vez creado
function showCarInfo(plate, brand, color) {
    var newCarPlate = document.getElementById("newCarPlate");
    newCarPlate.innerHTML = "Plate: " + plate;
    var newCarBrand = document.getElementById("newCarBrand");
    newCarBrand.innerHTML = "Brand: " + brand;
    var newCarColor = document.getElementById("newCarColor");
    newCarColor.innerHTML = "Color: " + color;
}
// muestra la info de las ruedas 
function showWheels() {
    var newWheel1 = document.getElementById("wheel1");
    var newWheel2 = document.getElementById("wheel2");
    var newWheel3 = document.getElementById("wheel3");
    var newWheel4 = document.getElementById("wheel4");
    newWheel1.innerHTML = "Brand: " + car.wheels[0].brand + "<br>" + "Diameter: " + car.wheels[0].diameter;
    newWheel2.innerHTML = "Brand: " + car.wheels[1].brand + "<br>" + "Diameter: " + car.wheels[1].diameter;
    newWheel3.innerHTML = "Brand: " + car.wheels[2].brand + "<br>" + "Diameter: " + car.wheels[2].diameter;
    newWheel4.innerHTML = "Brand: " + car.wheels[3].brand + "<br>" + "Diameter: " + car.wheels[3].diameter;
}
//muestra y esconde los formularios
function displayContent(show, hide) {
    show.classList.remove("d-none");
    hide.classList.add("d-none");
}
//funciones de error
function error(text) {
    text.classList.remove("d-none");
}
function errorField(text, field) {
    text.classList.remove("d-none");
    field.style.border = "2px solid red";
    field.focus();
}
function resetErrorField(text, field) {
    text.classList.add("d-none");
    field.style.border = "";
}
