const url = "cgi-bin/Proyecto/EPSProject";

//var nombre=$("#").val();
//var nombre=$("#").val();


$("#btnIngresar").click(function(e){
    var correoL=$("#correoL").val();
    var passL=$("#passL").val();
    login(correoL,passL);
});

$("#btnRegistrar").click(function(e){
    var nombre=$("#nombre").val();
    var apellido=$("#apellido").val();
    var correo=$("#email").val();
    var contrasenia=$("#pass").val();
    crearCuenta(nombre, apellido, correo, contrasenia);
});

$("#btnIngresar").click(function(e){
    var medname=$("#medname").val();
    var descp=$("#descp").val();
    var cint=$("#cint").val();
    registrarMed(medname,descp,cint);
});

$("#btnModMed").click(function(e){
    var medname=$("#medname").val();
    var descp=$("#descp").val();
    var cint=$("#cint").val();
    modificarMed(medname,descp,cint);
});

$("#btnDelMed").click(function(e){
    var medname=$("#medname").val();
    eliminarMed(medname);
});

$("#btnQueMed").click(function(e){
    var medname=$("#medname").val();
    consultarMed(medname);
});

function crearCuenta(nombre, apellido, correo, contrasenia) {
    let result;
    let data = {
        "email": correo,
        "fname": nombre,
        "lname": apellido,
        "password": contrasenia,
        "rol": 'Paciente',
    }
    $.ajax({
        method: 'POST',
        url: url + '/ControladorRegistro.py',
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

function login(correo, contraseña) {
    let result;
    let data = {
        "email": correo,
        "password": contraseña
    }
    $.ajax({
        url: url + '/ControladorLogin.py',
        data: JSON.stringify(data),
        type: "POST",
        dataType: 'json',
        contentType: "application/json; charset=utf-8"
    }).done(function(data) {
        return 1
    }).fail(function(data) {
        return 2
    });
}

function registrarMed(medname,descp,cint) {
    let result;
    let data = {
        "medname": medname,
        "descp": descp,
        "lname": apellido,
        "password": contrasenia,
        "rol": 'Paciente'
    }
    $.ajax({
        method: 'POST',
        url: url + '/ControladorMedicamentos.py',
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