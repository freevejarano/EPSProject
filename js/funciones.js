const ur= "http://ec2-34-227-90-132.compute-1.amazonaws.com/";
const url = "/cgi-bin/EPSProject";

// Registrar Usuario
function crearCuenta(nombre, apellido, rol, correo, contrasenia) {
    //Almecena los datos en JSON
    var obj = {
        "email": correo,
        "fname": nombre,
        "lname": apellido,
        "password": contrasenia,
        "rol": rol
    }; //Envio de datos por AJAX con metodo POST
    $.ajax({
        method: 'POST',
        url: url + '/ControladorRegistro.py',
        dataType: 'json',
        data: obj,
        success: function(rta) {
            response=JSON.parse(rta); 
            if(response.tipo==="OK"){ //Autenticacion de tipo 
               //Envio de True
            }
            else{
                alert("Error: "+response.mensaje) //Envio de False
            }
        },
        error: function(response){
            console.log(JSON.stringify(response))
        }
    });
}

// Inciar Sesion
function login(correo, contrasenia){
 //Almecena los datos en JSON
    var  obj = {
        "email": correo,
        "password": contrasenia
    }; //Envio de datos por AJAX con metodo POST
    $.ajax({
    method: 'POST',
        url: url + '/ControladorLogin.py', //Ruta Especificada 
        dataType: 'json', //Tipo de dato 
    data: obj,
        success: function(rta) {
    console.log(rta)
            response=JSON.parse(rta);
            if(response.tipo==="OK"){
                 //Envio de True
            }
            else{
                alert("Error: "+response.mensaje)
        //Envio de False
            }
        },
        error: function(response){
            console.log(JSON.stringify(response))
        }

    });
}

// Registrar Medicamento
function registrarMed(medname,descp,cint) {
    var dat = {
        "medname": medname,
        "descp": descp,
        "cint": cint,
        "act": 'ins'
    };
    $.ajax({ //Envio de datos por AJAX con metodo POST
        method: 'POST',
        url: url + '/ControlaMedicamentos.py', //Ruta Especificada 
    data: dat,
        dataType: 'json',
        success: function(rta) {
            response=JSON.parse(rta);
            if(response.tipo==="OK"){
                //Envio de True
            }
            else{
                alert("Error: "+response.mensaje) //Envio de False
            }
        },
        error: function(response){
            console.log(JSON.stringify(response))
        }
    }); 
}

function modificarMed(medname,descp,cint) {
    var dat = {
        "medname": medname,
        "descp": descp,
        "cint": cint,
        "act": 'upd'
    };//Envio de datos por AJAX con metodo POST
    $.ajax({
        method: 'POST',
        url: url + '/ControladorMedicamentos.py', //Ruta Especificada 
    data: dat,
        dataType: 'json',   
        success: function(rta) {
            response=JSON.parse(rta);
            if(response.tipo==="OK"){
                 //Envio de True
            }
            else{
                alert("Error: "+response.mensaje) //Envio de False
            }
        },
        error: function(response){
            console.log(JSON.stringify(response))
        }
    }); 
}

function eliminarMed(medname) {
    var dat = {
        "medname": medname,
        "act": 'del'
    };//Envio de datos por AJAX con metodo POST
    $.ajax({
        method: 'POST',
        url: url + '/ControladorMedicamentos.py', //Ruta Especificada 
    data: dat,
        dataType: 'json',
        success: function(rta) {
            response=JSON.parse(rta);
            if(response.tipo==="OK"){
                //Envio de True
            }
            else{
                alert("Error: "+response.mensaje) //Envio de False
            }
        },
        error: function(response){
            console.log(JSON.stringify(response))
        }
    }); 
}

function consultarMed(medname) {
    var dat = {
        "medname": medname,
        "act": 'del'
    };//Envio de datos por AJAX con metodo POST
    $.ajax({
        method: 'POST',
        url: url + '/ControladorMedicamentos.py', //Ruta Especificada 
    data: dat,
        dataType: 'json',
        success: function(rta) {
            response=JSON.parse(rta);
            console.log(response)
            if(response.tipo==="OK"){
                //Envio de True
            }
            else{
                alert("Error: "+response.mensaje)
            }
        },
        error: function(response){
            console.log(JSON.stringify(response))  //Envio de False
        }
    }); 
}
