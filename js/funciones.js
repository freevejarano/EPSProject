const ur= "http://ec2-34-227-90-132.compute-1.amazonaws.com/";
const url = "/cgi-bin/EPSProject";




function crearCuenta(nombre, apellido, correo, contrasenia) {
    let result;
    var obj = {
        "email": correo,
        "fname": nombre,
        "lname": apellido,
        "password": contrasenia,
        "rol": 'Operario'
    };
    $.ajax({
        method: 'POST',
        url: url + '/ControladorRegistro.py',
        dataType: 'json',
	data: obj,
        success: function(rta) {
            response=JSON.parse(rta);
            if(response.tipo==="OK"){
                return 1
            }
            else{
                alert("Error: "+response.mensaje)
            }
        },
        error: function(response){
            console.log(JSON.stringify(response))
        }
    });
}

function login(correo, contrasenia){
    let  dat = {
        "email": correo,
        "password": contrasenia
    };
    $.ajax({
	method: 'POST',
        url: url + '/ControladorLogin.py',
        data: dat,
        dataType: 'json',
    	success: function(rta) {
            response=JSON.parse(rta);
            if(response.tipo==="OK"){
                return 1
            }
            else{
                alert("Error: "+response.mensaje)
		return 2
            }
        },
        error: function(response){
            console.log(JSON.stringify(response))
        }

    });
}

function registrarMed(medname,descp,cint) {
    let result;
    var dat = {
        "medname": medname,
        "descp": descp,
        "cint": cint,
        "act": 'ins'
    }
    $.ajax({
        method: 'POST',
        url: url + '/ControlaMedicamentos.py',
	data: dat,
        dataType: 'json',
        success: function(rta) {
            response=JSON.parse(rta);
            if(response.tipo==="OK"){
                return 1
            }
            else{
                alert("Error: "+response.mensaje)
            }
        },
        error: function(response){
            console.log(JSON.stringify(response))
        }
    }); 
}

function modificarMed(medname,descp,cint) {
    let result;
    var dat = {
        "medname": medname,
        "descp": descp,
        "cint": cint,
        "act": 'upd'
    }
    $.ajax({
        method: 'POST',
        url: url + '/ControladorMedicamentos.py',
	data: dat,
        dataType: 'json',	
        success: function(rta) {
            response=JSON.parse(rta);
            if(response.tipo==="OK"){
                return 1
            }
            else{
                alert("Error: "+response.mensaje)
            }
        },
        error: function(response){
            console.log(JSON.stringify(response))
        }
    }); 
}

function eliminarMed(medname) {
    let result;
    var dat = {
        "medname": medname,
        "act": 'del'
    }
    $.ajax({
        method: 'POST',
        url: url + '/ControladorMedicamentos.py',
	data: dat,
        dataType: 'json',
        success: function(rta) {
            response=JSON.parse(rta);
            if(response.tipo==="OK"){
                return 1
            }
            else{
                alert("Error: "+response.mensaje)
            }
        },
        error: function(response){
            console.log(JSON.stringify(response))
        }
    }); 
}

function consultarMed(medname) {
    let result;
    var dat = {
        "medname": medname,
        "act": 'del'
    }
    $.ajax({
        method: 'POST',
        url: url + '/ControladorMedicamentos.py',
	data: dat,
        dataType: 'json',
        success: function(rta) {
            response=JSON.parse(rta);
            console.log(response)
            if(response.tipo==="OK"){
                return 1
            }
            else{
                alert("Error: "+response.mensaje)
            }
        },
        error: function(response){
            console.log(JSON.stringify(response))
        }
    }); 
}
