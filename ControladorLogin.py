#!/usr/bin/python3
from Usuario import usuarioClass as us
import cgi
import json

datos=cgi.FieldStorage()

print('Content-Type: text/json')
print('')
#Se obtiene una verificacion del objeto usuario 
usuario=us.ObtenerUsuario(datos.getvalue('email'),datos.getvalue('password'))
#Validacion de usuario no encontrado(vacio)
if usuario is not None:
    print(json.dumps('{"tipo":"OK","mensaje":"Bienvenido"}')) #Respuesta objeto encontrado 
else:
    print(json.dumps('{"tipo":"error","mensaje":"Usuario o contrasena inválidos"}')) #Respuesta objeto vacio
    
