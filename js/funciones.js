const url = "http://ec2-100-26-247-67.compute-1.amazonaws.com";
var token = "";

async function crearCuenta(nombre, apellido, correo, contraseña) {
    let result;
    let data = {
        "email": correo,
        "fname": nombre,
        "lname": apellido,
        "password": contraseña,
	"rol": 'Paciente'
    }

    $.ajax({
	url: url+'/cgi-bin/Proyecto/EPSProject/ControladorRegistro.py',
	data: JSON.stringify(data),
	type: "POST",
	dataType: 'json',
	contentType: "application/json; charset=utf-8"
    }).done(function(data){
	alert("Registro exitoso");
    }).fail(function(data){
	alert("Error en el registro");
    });

}

async function login(correo, contraseña) {
    let result;
    let data = {
        "email": correo,
        "password": contraseña
    }
    $.ajax({
        url: url+'/cgi-bin/Proyecto/EPSProject/ControladorLogin.py',
        data: JSON.stringify(data),
        type: "POST",
        dataType: 'json',
        contentType: "application/json; charset=utf-8"
    }).done(function(data){
        alert("Bienvenido");
    }).fail(function(data){
        alert("Datos incorrectos");
    });

}
