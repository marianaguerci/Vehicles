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

    if (carPlate == "" || carBrand == "" || carColor == "" ) {
        error(document.getElementById("carError"));
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
function submitWheels(){
    if (validateWheels() == true)  {   
        for (var i=0; i<4; i++) {
            let brandWheel: any = document.getElementById("brandWheel" + i);
            let diameterWheel: any = document.getElementById("diameterWheel" + i);
            car.addWheel(new Wheel(diameterWheel.value, brandWheel.value));
        }
    
        let wheelsInputs: any = document.getElementById("wheelsInputs");
        let newCarInfo: any = document.getElementById("carInfo");
        let successText: any = document.getElementById("mainTitle");
        successText.innerHTML = "New Car Successfully Created";
        displayContent(newCarInfo, wheelsInputs);
        showCarInfo(car.plate, car.brand, car.color);
        showWheels();
    }
} //end submitWheels()

function validateWheels() {
    var wheelCounter: number = 0;

    for (var i=0; i<4; i++) {
        let brandWheel: any = document.getElementById("brandWheel" + i);
        let diameterWheel: any = document.getElementById("diameterWheel" + i);
        let errorTxt: any =  document.getElementById("wheelErrorField" + i);
               
        if ((brandWheel.value == "") || (diameterWheel.value == "")) {
            error(document.getElementById("wheelError"));
        } else if ((diameterWheel.value < 0.4) || (diameterWheel.value > 2)) {
            errorField(errorTxt, diameterWheel);
            errorTxt.innerHTML = `Wheel ${i+1} diameter must be between 0.4 and 2.`;
        } else {
            resetErrorField(errorTxt, diameterWheel);
            wheelCounter = wheelCounter + 1;
        }
    } //end for 

    if (wheelCounter == 4) {
        return true;
    } else {
        return false;
    }
} //end validateWheels()


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
    for (var i=0; i<4; i++) {
        let newWheel: any = document.getElementById("wheel"+ i);
        newWheel.innerHTML = `Brand: ${car.wheels[i].brand}<br>Diameter: ${car.wheels[i].diameter}`;
    }
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