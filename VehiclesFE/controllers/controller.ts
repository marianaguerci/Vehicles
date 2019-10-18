
var car: Car;

// CREATE CAR
function createCar(plate:string,color:string,brand:string){
    car = new Car(plate,color,brand);
}

function submitCar() {
    var carPlate = document.getElementById("plate").value;
    var carBrand = document.getElementById("brand").value;
    var carColor = document.getElementById("color").value;

    var platePattern = /\b[0-9]{4}[A-Za-z]{3}\b/;
    ///\b\d{4}[a-zA-Z]{3}\b/;
    

    if(carPlate == "" || carBrand == "" || carColor == "" ) {
        let errorTxt: any = document.getElementById("carError");
        error(errorTxt);
    } else if(carPlate != "" && !(carPlate.match(platePattern))){
        let carPlateField = document.getElementById("plate");
        let plateErrorTxt = document.getElementById("plateError");
        errorField(plateErrorTxt, carPlateField);
    } else {
        var carInputs = document.getElementById("carInputs");
        var wheelsInputs = document.getElementById("wheelsInputs");
        displayContent(wheelsInputs, carInputs);
        createCar(carPlate, carColor, carBrand);
    }
}

// ADD WHEELS
function submitWheels() {
    let brandWheel1: any = document.getElementById("brandWheel1");
    let brandWheel2: any = document.getElementById("brandWheel2");
    let brandWheel3: any = document.getElementById("brandWheel3");
    let brandWheel4: any= document.getElementById("brandWheel4");
    let diameterWheel1: any = document.getElementById("diameterWheel1");
    let diameterWheel2: any = document.getElementById("diameterWheel2");
    let diameterWheel3: any = document.getElementById("diameterWheel3");
    let diameterWheel4: any = document.getElementById("diameterWheel4");

    let errorTxt1: any = document.getElementById("wheelErrorField1");
    let errorTxt2: any = document.getElementById("wheelErrorField2");
    let errorTxt3: any = document.getElementById("wheelErrorField3");
    let errorTxt4: any = document.getElementById("wheelErrorField4");

    let errorTxt: any = document.getElementById("wheelError");
    
    if(brandWheel1.value == "" || brandWheel2.value == "" || brandWheel3.value == "" || brandWheel4.value == "" || diameterWheel1.value == "" || diameterWheel2.value == "" || diameterWheel3.value == "" || diameterWheel4.value == "") {

        error(errorTxt);

    } 
    //Añadimos rueda tras comprobar que todos los campos estan con valores.
    else {
        let Wheel1 = new Wheel(diameterWheel1.value, brandWheel1.value);

        if (validateDiameter(Wheel1.diameter) == true){
            car.addWheel(new Wheel(diameterWheel1.value, brandWheel1.value));
            resetErrorField(errorTxt1, diameterWheel1);
        } else {
            errorField(errorTxt1, diameterWheel1);
            errorTxt1.innerHTML = "Wheel 1: Incorrect diameter.";
        }

        let Wheel2 = new Wheel(diameterWheel2.value, brandWheel2.value);
        if (validateDiameter(Wheel2.diameter) == true){
            car.addWheel(new Wheel(diameterWheel2.value, brandWheel2.value));
            resetErrorField(errorTxt2, diameterWheel2);
        } else {
            errorField(errorTxt2, diameterWheel2);
            errorTxt2.innerHTML = "Wheel 2: Incorrect diameter.";
        }

        let Wheel3 = new Wheel(diameterWheel3.value, brandWheel3.value);
        if (validateDiameter(Wheel3.diameter) == true){
            car.addWheel(new Wheel(diameterWheel3.value, brandWheel3.value));
            resetErrorField(errorTxt3, diameterWheel3);
        } else {
            errorField(errorTxt3, diameterWheel3);
            errorTxt3.innerHTML = "Wheel 3: Incorrect diameter.";
        }

        let Wheel4 = new Wheel(diameterWheel4.value, brandWheel4.value);
        if (validateDiameter(Wheel4.diameter) == true){
            car.addWheel(new Wheel(diameterWheel4.value, brandWheel4.value));
            resetErrorField(errorTxt4, diameterWheel4);
        } else {
            errorField(errorTxt4, diameterWheel4);
            errorTxt4.innerHTML = "Wheel 4: Incorrect diameter.";
        }

        if ((validateDiameter(Wheel1.diameter) == true) && (validateDiameter(Wheel2.diameter) == true) && (validateDiameter(Wheel3.diameter) == true)  && (validateDiameter(Wheel4.diameter) == true)) {
            let wheelsInputs: any = document.getElementById("wheelsInputs");
            let newCarInfo: any = document.getElementById("carInfo");
            displayContent(newCarInfo, wheelsInputs);
            showCarInfo(car.plate, car.brand, car.color);
            showWheels();
        }  
    }
} //submitWheels END

//valida el diámetro de la rueda y retorna true si es correcto (isValid)
function validateDiameter(wheeldiameter: number): boolean {
    let isValid = true;

    if (wheeldiameter > 0.4 && wheeldiameter < 2){
        isValid;
    } else {
        isValid = false;
    }   
    return isValid;
}


// muestra la info del coche una vez creado
function showCarInfo (plate: string, brand: string, color:string) {
    let newCarPlate: any = document.getElementById("newCarPlate");
    newCarPlate.innerHTML = "Plate: " + plate;

    let newCarBrand: any = document.getElementById("newCarBrand");
    newCarBrand.innerHTML = "Brand: " + brand;

    let newCarColor: any = document.getElementById("newCarColor");
    newCarColor.innerHTML = "Color: " + color;
}

// muestra la info de las ruedas 
function showWheels() {
    let newWheel1: any = document.getElementById("wheel1");
    let newWheel2: any = document.getElementById("wheel2");
    let newWheel3: any = document.getElementById("wheel3");
    let newWheel4: any = document.getElementById("wheel4");

    newWheel1.innerHTML = "Brand: " + car.wheels[0].brand + "<br>" + "Diameter: " + car.wheels[0].diameter;
    newWheel2.innerHTML = "Brand: " + car.wheels[1].brand + "<br>" + "Diameter: " + car.wheels[1].diameter;
    newWheel3.innerHTML = "Brand: " + car.wheels[2].brand + "<br>" + "Diameter: " + car.wheels[2].diameter;
    newWheel4.innerHTML = "Brand: " + car.wheels[3].brand + "<br>" + "Diameter: " + car.wheels[3].diameter;
    
}

//muestra y esconde los formularios
function displayContent(show: any, hide: any){
    show.classList.remove("d-none");
    hide.classList.add("d-none");
}

//funciones de error
function error(text: any) {
    text.classList.remove("d-none");
}
function errorField(text: any, field: any) {
    text.classList.remove("d-none");
    field.style.border = "2px solid red";
    field.focus();
} 
function resetErrorField(text: any, field: any) {
    text.classList.add("d-none");
    field.style.border = "";
}