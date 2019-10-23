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
    if (carPlate == "" || carBrand == "" || carColor == "") {
        error(document.getElementById("carError"));
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
    if (validateWheels() == true) {
        for (var i = 0; i < 4; i++) {
            var brandWheel = document.getElementById("brandWheel" + i);
            var diameterWheel = document.getElementById("diameterWheel" + i);
            car.addWheel(new Wheel(diameterWheel.value, brandWheel.value));
        }
        var wheelsInputs = document.getElementById("wheelsInputs");
        var newCarInfo = document.getElementById("carInfo");
        var successText = document.getElementById("mainTitle");
        successText.innerHTML = "New Car Successfully Created";
        displayContent(newCarInfo, wheelsInputs);
        showCarInfo(car.plate, car.brand, car.color);
        showWheels();
    }
} //end submitWheels()
function validateWheels() {
    var wheelCounter = 0;
    for (var i = 0; i < 4; i++) {
        var brandWheel = document.getElementById("brandWheel" + i);
        var diameterWheel = document.getElementById("diameterWheel" + i);
        var errorTxt = document.getElementById("wheelErrorField" + i);
        if ((brandWheel.value == "") || (diameterWheel.value == "")) {
            error(document.getElementById("wheelError"));
        }
        else if ((diameterWheel.value < 0.4) || (diameterWheel.value > 2)) {
            errorField(errorTxt, diameterWheel);
            errorTxt.innerHTML = "Wheel " + (i + 1) + " diameter must be between 0.4 and 2.";
        }
        else {
            resetErrorField(errorTxt, diameterWheel);
            wheelCounter = wheelCounter + 1;
        }
    } //end for 
    if (wheelCounter == 4) {
        return true;
    }
    else {
        return false;
    }
} //end validateWheels()
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
    for (var i = 0; i < 4; i++) {
        var newWheel = document.getElementById("wheel" + i);
        newWheel.innerHTML = "Brand: " + car.wheels[i].brand + "<br>Diameter: " + car.wheels[i].diameter;
    }
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
