//Ir al menú Registrar
$("#Entrar").click(function() {
    $("#Registro").removeClass("animate__animated animate__backOutLeft");
    $("#login").removeClass("animate__backInRight");
    $("#login").addClass(" animate__backOutRight");
    $("#Registro").addClass("animate__animated animate__backInLeft");
    $('#Registro').show();
});

//Ir al menú de Inicio
$("#Devolver").click(function() {
    $("#Registro").removeClass("animate__animated animate__backInLeft");
    $("#login").removeClass("animate__backOutRight");
    $("#Registro").addClass("animate__animated animate__backOutLeft");
    $("#login").addClass("animate__animated animate__backInRight");
});

//Guardar Datos
$("#Registrar").click(function() {

    //Recolectar Datos
    nombre = $("#nombre").val();
    apellido = $("#apellido").val();
    correo = $("#email").val();
    correo2 = $("#verifyemail").val();
    contraseña = $("#pass").val();

    //Verificar datos
    if (nombre == "" || apellido == "" || correo == "" || correo2 == "" || contraseña == "") {
        swal("Error", "Por favor, Ingrese todos los datos", "error");
    } else if (correo == correo2 && correo.includes('@')) {
        guardar(nombre, apellido, correo, contraseña);
    } else if (!correo.includes('@')) {
        swal("Error", "Por favor, Ingrese un formato de correo válido", "error");
    } else {
        swal("Error", "Los correos escritos no son idénticos", "error");
    }
});

async function guardar(nombre, apellido, correo, contraseña) {
    var save = await crearCuenta(nombre, apellido, correo, contraseña)
    if (save == 1) {
        swal("Correcto", "¡Registro exitoso!", "success")
            .then((value) => {
                $("#Registro").removeClass("animate__animated animate__backInLeft");
                $("#login").removeClass("animate__backOutRight");
                $("#Registro").addClass("animate__animated animate__backOutLeft");
                $("#login").addClass("animate__animated animate__backInRight");
            });

    } else if (save == 2) {
        swal("Error", "Error en el registro", "error");
    }
}


//Iniciar Sesión
$("#Ingresar").click(function() {

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
    if (save == 1) {
        swal("Correcto", "Bienvenido", "success")
    } else if (save == 2) {
        swal("Error", "Datos erróneos", "error");
    } else {
        swal("PruebaError", "Realizada correctamente", "success")
        mostrarPaginaPrincipal();
    }
}

function mostrarPaginaPrincipal() {
    $("#login").removeClass("animate__animated animate__backInLeft");
    $("#menu").removeClass("animate__backOutRight");
    $("#login").addClass("animate__animated animate__backOutLeft");
    $("#menu").addClass("animate__animated animate__backInRight");
    $('#menu').show();
    $('#fondo').hide();
}


//MEDICAMENTOS

//Ir al menú Crear
$("#Crear").click(function() {
    $("#crearmed").removeClass("animate__animated animate__backOutLeft");
    $("#menu").removeClass("animate__backInRight");
    $("#menu").addClass(" animate__backOutRight");
    $("#crearmed").addClass("animate__animated animate__backInLeft");
    $('#crearmed').show();
});

//Ir al menú Modificar
$("#Modificar").click(function() {
    $("#modmed").removeClass("animate__animated animate__backOutLeft");
    $("#menu").removeClass("animate__backInRight");
    $("#menu").addClass(" animate__backOutRight");
    $("#modmed").addClass("animate__animated animate__backInLeft");
    $('#modmed').show();
});

//Ir al menú Consultar
$("#Consultar").click(function() {
    $("#quemed").removeClass("animate__animated animate__backOutLeft");
    $("#menu").removeClass("animate__backInRight");
    $("#menu").addClass(" animate__backOutRight");
    $("#quemed").addClass("animate__animated animate__backInLeft");
    $('#quemed').show();
});

//Ir al menú Eliminar
$("#Eliminar").click(function() {
    $("#delmed").removeClass("animate__animated animate__backOutLeft");
    $("#menu").removeClass("animate__backInRight");
    $("#menu").addClass(" animate__backOutRight");
    $("#delmed").addClass("animate__animated animate__backInLeft");
    $('#delmed').show();
});

//Ir al menú 

function DevolverCrearMed() {
    $("#crearmed").removeClass("animate__animated animate__backInLeft");
    $("#menu").removeClass("animate__backOutRight");
    $("#crearmed").addClass("animate__animated animate__backOutLeft");
    $("#menu").addClass("animate__animated animate__backInRight");
}

function DevolverModMed() {
    $("#modmed").removeClass("animate__animated animate__backInLeft");
    $("#menu").removeClass("animate__backOutRight");
    $("#modmed").addClass("animate__animated animate__backOutLeft");
    $("#menu").addClass("animate__animated animate__backInRight");
}

function DevolverEliMed() {
    $("#delmed").removeClass("animate__animated animate__backInLeft");
    $("#menu").removeClass("animate__backOutRight");
    $("#delmed").addClass("animate__animated animate__backOutLeft");
    $("#menu").addClass("animate__animated animate__backInRight");
}

function DevolverConMed() {
    $("#quemed").removeClass("animate__animated animate__backInLeft");
    $("#menu").removeClass("animate__backOutRight");
    $("#quemed").addClass("animate__animated animate__backOutLeft");
    $("#menu").addClass("animate__animated animate__backInRight");
}

$("#DevolverMed").click(function() {
    DevolverCrearMed()

});

$("#DevolverMedM").click(function() {
    DevolverModMed()
});


$("#DevolverMedD").click(function() {
    DevolverEliMed()
});

$("#DevolverMedQ").click(function() {
    DevolverConMed()
});

//Guardar Datos
$("#RegistrarMed").click(function() {

    //Recolectar Datos
    name = $("#medname").val();
    des = $("#descp").val();
    cint = $("#cint").val();

    //Verificar datos
    if (name == "" || des == "" || cint == "") {
        swal("Error", "Por favor, Ingrese todos los datos", "error");
    } else {
        guardarMed(name, des, cint);
    }
});

async function guardarMed(name, des, cint) {
    var save = await crearMed(name, des, cint)
    if (save == 1) {
        swal("Correcto", "¡Registro exitoso!", "success")
            .then((value) => {
                DevolverCrearMed()
            });

    } else if (save == 2) {
        swal("Error", "Error en el registro", "error");
    }
}


//Modificar Medicamentos
$("#ModMed").click(function() {

    //Recolectar Datos
    name = $("#medname").val();
    des = $("#descp").val();
    cint = $("#cint").val();

    //Verificar datos
    if (name == "" || des == "" || cint == "") {
        swal("Error", "Por favor, Ingrese todos los datos", "error");
    } else {
        modificarMed(name, des, cint);
    }
});

async function modificarMed(name, des, cint) {
    var save = await updMed(name, des, cint)
    if (save == 1) {
        swal("Correcto", "¡Actualización exitosa!", "success")
            .then((value) => {
                DevolverModMed()
            });

    } else if (save == 2) {
        swal("Error", "Error en el modificar", "error");
    }
}

//Eliminar Medicamentos
$("#DelMed").click(function() {

    //Recolectar Datos
    name = $("#medname").val();

    //Verificar datos
    if (name == "") {
        swal("Error", "Por favor, Ingrese el nombre del medicamento a eliminar", "error");
    } else {
        eliminarMed(name);
    }
});

async function eliminarMed(name, des, cint) {
    var save = await deleMed(name, des, cint)
    if (save == 1) {
        swal("Correcto", "¡Se ha borrado el medicamento", "success")
        DevolverEliMed()
    } else if (save == 2) {
        swal("Error", "Error, no se ha encontrado el medicamento", "error");
    }
}


//Consultar Medicamentos
$("#ModMed").click(function() {

    //Recolectar Datos
    name = $("#medname").val();

    //Verificar datos
    if (name == "") {
        swal("Error", "Por favor, Ingrese el nombre del medicamento", "error");
    } else {
        consultarMed(name);
    }
});

async function consultarMed(name) {
    var save = await queryMed(name)
    if (save == 1) {

    } else if (save == 2) {
        swal("Error", "Error, no se ha encontrado el medicamento", "error");
    }
}