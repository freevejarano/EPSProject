const ur= "http://ec2-34-227-90-132.compute-1.amazonaws.com/";
const url = "/cgi-bin/EPSProject";

// Registrar Usuario
function crearCuenta(nombre, apellido, correo, contrasenia) {
    //Almecena los datos en JSON
    var obj = {
        "email": correo,
        "fname": nombre,
        "lname": apellido,
        "password": contrasenia,
        "rol": 'Operario'
    }; //Envio de datos por AJAX con metodo POST
    $.ajax({
        method: 'POST',
        url: url + '/ControladorRegistro.py',
        dataType: 'json',
    data: obj,
        success: function(rta) {
            console.log(rta)
            response=JSON.parse(rta);
            console.log(response)
            if(response.tipo==="OK"){ //Autenticacion de tipo
                vista1(1)
            }else{
               vista1(2)
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
    var  dat = {
        "email": correo,
        "password": contrasenia
    }; //Envio de datos por AJAX con metodo POST
    $.ajax({
    method: 'POST',
        url: url + '/ControladorLogin.py', //Ruta Especificada 
        data:dat,
        dataType: 'json', //Tipo de dato
        success: function(rta) {
           console.log(rta)
            if(rta.Rol===undefined){
               vista2(2,"")
            }
            else{
                aux=0
                if(rta.Rol=="Operario"){
                   aux=1;
                } else if(rta.Rol=="Medico"){
                  aux=2;
                } else if(rta.Rol=="Paciente"){
                aux=3;
                }
              vista2(1, aux);
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
        dataType: 'json',
    data: dat,
        success: function(rta) {
        console.log(rta)
            response=JSON.parse(rta);
        console.log(response)
            if(response.tipo==="OK"){
                vista3(1)
            }
            else{
        vista3(2)
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
        url: url + '/ControlaMedicamentos.py', //Ruta Especificada 
    data: dat,
        dataType: 'json',

        success: function(rta) {
            response=JSON.parse(rta);
            if(response.tipo==="OK"){
                 vista4(1)
            }
            else{
        vista4(2)
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
        url: url + '/ControlaMedicamentos.py', //Ruta Especificada 
    data: dat,
        dataType: 'json',
        success: function(rta) {
            response=JSON.parse(rta);
            if(response.tipo==="OK"){
            vista5(1)
            }
            else{
        vista5(2)
                alert("Error: "+response.mensaje) //Envio de False
            }
        },
        error: function(response){
            console.log(JSON.stringify(response))
        }
    });
}

function consultarMed(medname) {
   console.log("m",medname);
    var dat = {
        "medname": medname,
        "act": 'cons'
    };//Envio de datos por AJAX con metodo POST
    $.ajax({
        method: 'POST',
        url: url + '/ControlaMedicamentos.py', //Ruta Especificada 
    data: dat,
        dataType: 'json',
        success: function(rta) {
       console.log(rta.Nombre);
       if(rta.Nombre===undefined){
             $("#medname4").val("")
             $("#descp4").val("")
             $("#cint4").val("")

        vista6(2)
       }else{ 
             console.log("No fallo");
             $("#medname4").val(rta.Nombre)
             $("#descp4").val(rta.Desc)
             $("#cint4").val(rta.Contra)
    }
        },
        error: function(response){
            console.log(JSON.stringify(response))  //Envio de False
        }
    });
}
