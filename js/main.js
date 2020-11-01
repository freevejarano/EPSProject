
//Ir al menú Registrar
    $("#Entrar").click(function () {
    $("#Registro").removeClass("animate__animated animate__backOutLeft");
    $("#login").removeClass("animate__backInRight");
    $("#login").addClass(" animate__backOutRight");
    $("#Registro").addClass("animate__animated animate__backInLeft");
    $('#Registro').show();
});

//Ir al menú de Inicio
$("#Devolver").click(function () {
    $("#Registro").removeClass("animate__animated animate__backInLeft");
    $("#login").removeClass("animate__backOutRight");
    $("#Registro").addClass("animate__animated animate__backOutLeft");
    $("#login").addClass("animate__animated animate__backInRight");
});

//Guardar Datos
$("#Registrar").click(function () {
    
   //Recolectar Datos
    nombre = $("#nombre").val();
    apellido = $("#apellido").val();
    correo = $("#email").val();
    correo2 = $("#verifyemail").val();
    contraseña = $("#pass").val();

    //Verificar datos
    if (nombre == "" || apellido == "" || correo == "" || correo2 == "" || contraseña == ""){
        swal("Error", "Por favor, Ingrese todos los datos", "error");
    }else if (correo == correo2 && correo.includes('@')) {
        guardar(nombre, apellido, correo, contraseña);
    } else if (!correo.includes('@')) {
        swal("Error", "Por favor, Ingrese un formato de correo válido", "error");
    } else {
        swal("Error", "Los correos escritos no son idénticos", "error");
    }
});

async function  guardar(nombre, apellido, correo, contraseña) {
    var save= await crearCuenta(nombre, apellido, correo, contraseña)
    if (save == 1) {
        
        swal("Correcto","¡Registro exitoso!", "success")
            .then((value) => {
                 $("#Registro").removeClass("animate__animated animate__backInLeft");
                 $("#login").removeClass("animate__backOutRight");
                 $("#Registro").addClass("animate__animated animate__backOutLeft");
                 $("#login").addClass("animate__animated animate__backInRight");
            });
       
    } else {
        swal("Error","El correo ingresado ya se encuentra registrado", "error");
    }


}


//Iniciar Sesión
$("#Ingresar").click(function () {

   
    //Recolectar Datos
    correo = $("#correoL").val();
    contraseña = $("#passL").val();

    //Verificar datos
    if (correo == "" || contraseña == "") { 
       swal("Error", "Por favor, Ingrese todos los datos", "error");

    } else {
        Inicio(correo, contraseña)
    }

});

async function Inicio(correo, contraseña) {
    
    var save = await login(correo, contraseña);
    if (save) {
    } else {
        swal("Error", "Datos erróneos", "error");
    }
}
