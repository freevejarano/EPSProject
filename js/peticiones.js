const url = "http://ec2-3-93-58-254.compute-1.amazonaws.com";
var token = "";

async function crearCuenta(nombre, apellido, correo, contraseña) {
    let result;
    let data = {
        "email": correo,
        "fname": nombre,
        "lname": apellido,
        "password": contraseña
    }
    try {
        return 1;
    } catch (error) {
         return 0;
    }

}

async function login(correo, contraseña) {
    let result;
    let data = {
        "email": correo,
        "password": contraseña
    }
    try {
       
    } catch (error) {
        return 0;
    }

}
