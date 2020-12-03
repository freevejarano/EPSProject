//LOGIN-REGISTRO

//Ir al menú Registrar desde el Login
$("#Entrar").click(function() {
    //Mover el menu
    $("#Registro").removeClass("animate__animated animate__backOutLeft");
    $("#login").removeClass("animate__backInRight");
    $("#login").addClass(" animate__backOutRight");
    $("#Registro").addClass("animate__animated animate__backInLeft");
    $('#Registro').show();
});

//Ir al menú de Inicio desde el menu de Registrar 
$("#Devolver").click(function() {
    $("#Registro").removeClass("animate__animated animate__backInLeft");
    $("#login").removeClass("animate__backOutRight");
    $("#Registro").addClass("animate__animated animate__backOutLeft");
    $("#login").addClass("animate__animated animate__backInRight");
});

//Registrar Usuario
$("#Registrar").click(function() {

    //Recolectar Datos
    nombre = $("#nombre").val();
    apellido = $("#apellido").val();
    rol = $("#rol").val();
    correo = $("#email").val();
    correo2 = $("#verifyemail").val();
    contrasenia = $("#pass").val();

    //Verificar datos
    if (nombre == "" || apellido == "" || rol == "" || correo == "" || correo2 == "" || contrasenia == "") {
        swal("Error", "Por favor, Ingrese todos los datos", "error");
    } else if (correo == correo2 && correo.includes('@')) {
        guardar(nombre, apellido, rol, correo, contrasenia); //Llamado a funcion guardar
    } else if (!correo.includes('@')) {
        swal("Error", "Por favor, Ingrese un formato de correo válido", "error");
    } else {
        swal("Error", "Los correos escritos no son idénticos", "error");
    }
});

//Funcion para Registrar Usuario
async function guardar(nombre, apellido, rol, correo, contrasenia) {
    //Envia los datos a la funcion crearCuenta ubicada en funciones.js
    var save = await crearCuenta(nombre, apellido, rol, correo, contrasenia)
    if (save) { //Retorno True
        swal("Correcto", "¡Registro exitoso!", "success")
            .then((value) => {
                $("#Registro").removeClass("animate__animated animate__backInLeft");
                $("#login").removeClass("animate__backOutRight");
                $("#Registro").addClass("animate__animated animate__backOutLeft");
                $("#login").addClass("animate__animated animate__backInRight");
            });
    } else { //Retorno False
        //swal("Error", "Error en el registro", "error");
        swal("Correcto", "¡Registro exitoso!", "success")
    }
}

function vista1(save) {
    if (save == 1) {
        swal("Correcto", "¡Registro Exitoso!", "success")
            .then((value) => {
                $("#Registro").removeClass("animate__animated animate__backInLeft");
                $("#login").removeClass("animate__backOutRight");
                $("#Registro").addClass("animate__animated animate__backOutLeft");
                $("#login").addClass("animate__animated animate__backInRight");
            });

    } else {
        swal("Error", "Registro Fallido", "error")
    }
}


//Iniciar Sesión
$("#Ingresar").click(function() {

    //Recolectar Datos
    correo = $("#correoL").val();
    contrasenia = $("#passL").val();
    //Verificar datos
    if (correo == "" || contrasenia == "") {
        swal("Error", "Por favor, Ingrese todos los datos", "error");
    } else {
        Inicio(correo, contrasenia) //Llamado a funcion Inicio
    }

});

//Funcion para Iniciar Sesion
async function Inicio(correo, contrasenia) {
    //Recibe validacion de la funcion login ubicada en funciones.js
    var save = await login(correo, contrasenia);
    if (save) { //Retorno True
        swal("Correcto", "Bienvenido", "success")
        mostrarPaginaPrincipal()
    } else { //Retorno False
        swal("Error", "Datos erroneos", "error")
    }
}

function vista2(save, rol) {
    console.log(rol);
    if (save == 1) {
        swal("Correcto", "Bienvenido", "success")
        mostrarPaginaPrincipal(rol)
    } else { //Retorno False
        //swal("Error", "Datos erroneos", "error")
        swal("Correcto", "Bienvenido", "success")
        mostrarPaginaPrincipal()

        swal("Error", "Datos erroneos", "error")
    }
}


//MEDICAMENTOS
//Se esconde el menu y se habilita el formulario deseado con su respectiva animacion
//Ir al form Crear
$("#Crear").click(function() {
    $("#crearmed").removeClass("animate__animated animate__backOutLeft");
    $("#menu").removeClass("animate__backInRight");
    $("#menu").addClass(" animate__backOutRight");
    $("#crearmed").addClass("animate__animated animate__backInLeft");
    $('#crearmed').show();
});

//Ir al form Modificar
$("#Modificar").click(function() {
    $("#modmed").removeClass("animate__animated animate__backOutLeft");
    $("#menu").removeClass("animate__backInRight");
    $("#menu").addClass(" animate__backOutRight");
    $("#modmed").addClass("animate__animated animate__backInLeft");
    $('#modmed').show();
});

//Ir al form Consultar
$("#Consultar").click(function() {
    $("#quemed").removeClass("animate__animated animate__backOutLeft");
    $("#menu").removeClass("animate__backInRight");
    $("#menu").addClass(" animate__backOutRight");
    $("#quemed").addClass("animate__animated animate__backInLeft");
    $('#quemed').show();
});

//Ir al form  Eliminar
$("#Eliminar").click(function() {
    $("#delmed").removeClass("animate__animated animate__backOutLeft");
    $("#menu").removeClass("animate__backInRight");
    $("#menu").addClass(" animate__backOutRight");
    $("#delmed").addClass("animate__animated animate__backInLeft");
    $('#delmed').show();
});

//Ir al menú Central de Medicamentos
//Se declaran fucniones para el llamado posterior. Cierra el formualrio y se devuelve al menu principal 

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

//Asignacion de funciones a las acciones de los botones 
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

//Funciones

//Registrar Medicamento
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

//Funcion para el registro
async function guardarMed(name, des, cint) {
    //Recibe validacion de la funcion registrarMed ubicada en funciones.js
    var save = await registrarMed(name, des, cint)
    if (save) { //Retorno True
        swal("Correcto", "¡Registro exitoso!", "success")
            .then((value) => {
                DevolverCrearMed()
            });

    } else { //Retorno False
        swal("Error", "Error en el registro", "error");
    }
}

function vista3(save) {
    if (save == 1) { //Retorno True
        swal("Correcto", "¡Registro exitoso!", "success")
            .then((value) => {
                DevolverCrearMed()
            });
    } else { //Retorno False
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
        modMed(name, des, cint);
    }
});

async function modMed(name, des, cint) {
    //Recibe validacion de la funcion modificarMed ubicada en funciones.js
    var save = await modificarMed(name, des, cint)
    if (save) { //Retorno True
        swal("Correcto", "¡Actualización exitosa!", "success")
            .then((value) => {
                DevolverModMed()
            });

    } else { //Retorno False
        swal("Error", "Error en el modificar", "error");
    }
}

function vista4(save) {
    if (save == 1) { //Retorno True
        swal("Correcto", "¡Actualización exitosa!", "success")
            .then((value) => {
                DevolverModMed()
            });

    } else { //Retorno False
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
        delMed(name);
    }
});

async function delMed(name, des, cint) {
    //Recibe validacion de la funcion eliminarMed ubicada en funciones.js
    var save = await eliminarMed(name, des, cint)
    if (save) { //Retorno True
        swal("Correcto", "¡Se ha borrado el medicamento", "success")
        DevolverEliMed()
    } else { //Retorno False
        swal("Error", "Error, no se ha encontrado el medicamento", "error");
    }
}

function vista5(save) {
    if (save == 1) { //Retorno True    
        swal("Correcto", "¡Se ha borrado el medicamento", "success")
        DevolverEliMed()
    } else { //Retorno False
        swal("Error", "Error, no se ha encontrado el medicamento", "error");
    }
}

//Consultar Medicamentos
$("#QueMed").click(function() {

    //Recolectar Datos
    name = $("#medname").val();

    //Verificar datos
    if (name == "") {
        swal("Error", "Por favor, Ingrese el nombre del medicamento", "error");
    } else {
        consulMed(name);
    }
});

async function consulMed(name) {
    //Recibe validacion de la funcion consultarMed ubicada en funciones.js
    var save = await consultarMed(name)
    if (save) {
        console.log("si")
    } else { //Retorno False
        swal("Error", "Error, no se ha encontrado el medicamento", "error");
    }
}

function vista6(save) {
    if (save == 1) {
        console.log("si")
    } else { //Retorno False
        swal("Error", "Error, no se ha encontrado el medicamento", "error");
    }
}



//FORMULAS
//Se esconde el menu y se habilita el formulario deseado con su respectiva animacion
//Ir al form Crear
$("#CrearF").click(function() {
    $("#crearfor").removeClass("animate__animated animate__backOutLeft");
    $("#menuM").removeClass("animate__backInRight");
    $("#menuM").addClass(" animate__backOutRight");
    $("#crearfor").addClass("animate__animated animate__backInLeft");
    $('#crearfor').show();
});

//Ir al form Modificar
$("#ModificarF").click(function() {
    $("#modfor").removeClass("animate__animated animate__backOutLeft");
    $("#menuM").removeClass("animate__backInRight");
    $("#menuM").addClass(" animate__backOutRight");
    $("#modfor").addClass("animate__animated animate__backInLeft");
    $('#modfor').show();
});

//Ir al form Consultar
$("#ConsultarF").click(function() {
    $("#quefor").removeClass("animate__animated animate__backOutLeft");
    $("#menuM").removeClass("animate__backInRight");
    $("#menuM").addClass(" animate__backOutRight");
    $("#quefor").addClass("animate__animated animate__backInLeft");
    $('#quefor').show();
});


//Ir al form Consultar desde Paciente
$("#ConsultarP").click(function() {
    $("#queforp").removeClass("animate__animated animate__backOutLeft");
    $("#menuP").removeClass("animate__backInRight");
    $("#menuP").addClass(" animate__backOutRight");
    $("#queforp").addClass("animate__animated animate__backInLeft");
    $('#queforp').show();
});


//Ir al form  Eliminar
$("#EliminarF").click(function() {
    $("#delfor").removeClass("animate__animated animate__backOutLeft");
    $("#menuM").removeClass("animate__backInRight");
    $("#menuM").addClass(" animate__backOutRight");
    $("#delfor").addClass("animate__animated animate__backInLeft");
    $('#delfor').show();
});

//Ir al menú Central de Medicamentos
//Se declaran fucniones para el llamado posterior. Cierra el formualrio y se devuelve al menu principal 

function DevolverCrearFor() {
    $("#crearfor").removeClass("animate__animated animate__backInLeft");
    $("#menuM").removeClass("animate__backOutRight");
    $("#crearfor").addClass("animate__animated animate__backOutLeft");
    $("#menuM").addClass("animate__animated animate__backInRight");
}

function DevolverModFor() {
    $("#modfor").removeClass("animate__animated animate__backInLeft");
    $("#menuM").removeClass("animate__backOutRight");
    $("#modfor").addClass("animate__animated animate__backOutLeft");
    $("#menuM").addClass("animate__animated animate__backInRight");
}

function DevolverEliFor() {
    $("#delfor").removeClass("animate__animated animate__backInLeft");
    $("#menuM").removeClass("animate__backOutRight");
    $("#delfor").addClass("animate__animated animate__backOutLeft");
    $("#menuM").addClass("animate__animated animate__backInRight");
}

function DevolverConFor() {
    $("#quefor").removeClass("animate__animated animate__backInLeft");
    $("#menuM").removeClass("animate__backOutRight");
    $("#quefor").addClass("animate__animated animate__backOutLeft");
    $("#menuM").addClass("animate__animated animate__backInRight");
}

function DevolverConForP() {
    $("#queforp").removeClass("animate__animated animate__backInLeft");
    $("#menuP").removeClass("animate__backOutRight");
    $("#queforp").addClass("animate__animated animate__backOutLeft");
    $("#menuP").addClass("animate__animated animate__backInRight");
}

//Asignacion de funciones a las acciones de los botones 
$("#DevolverFor").click(function() {
    DevolverCrearFor()
});

$("#DevolverForM").click(function() {
    DevolverModFor()
});

$("#DevolverForD").click(function() {
    DevolverEliFor()
});

$("#DevolverForQ").click(function() {
    DevolverConFor()
});

$("#DevolverForQP").click(function() {
    DevolverConForP()
});


//ACCESO MENU 
function mostrarPaginaPrincipal(rol) {
    if (rol == 1) {
        $("#login").removeClass("animate__animated animate__backInLeft");
        $("#menu").removeClass("animate__backOutRight");
        $("#login").addClass("animate__animated animate__backOutLeft");
        $("#menu").addClass("animate__animated animate__backInRight");
        $('#Contenido').show();
        $('#menu').show();
        $('#fondo').hide();
    } else if (rol == 2) {
        $("#login").removeClass("animate__animated animate__backInLeft");
        $("#menuM").removeClass("animate__backOutRight");
        $("#login").addClass("animate__animated animate__backOutLeft");
        $("#menuM").addClass("animate__animated animate__backInRight");
        $('#ContenidoM').show();
        $('#menuM').show();
        $('#fondo').hide();
    } else {
        $("#login").removeClass("animate__animated animate__backInLeft");
        $("#menuP").removeClass("animate__backOutRight");
        $("#login").addClass("animate__animated animate__backOutLeft");
        $("#menuP").addClass("animate__animated animate__backInRight");
        $('#ContenidoP').show();
        $('#menuP').show();
        $('#fondo').hide();
    }
}