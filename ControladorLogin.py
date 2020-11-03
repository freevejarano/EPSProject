#!/usr/bin/python3
from Usuario import usuarioClass as us
import json
import cgi



print('Content-Type: text/json')
print('')

datos = cgi.FieldStorage()
usuario=us.ObtenerUsuario(datos.getvalue('email'),datos.getvalue('password'))

if usuario is not None:
    print(json.dumps('{"tipo":"OK","mensaje":"Bienvenido"}"'))
else:
    print(json.dumps('{"tipo":"error","mensaje":"Usuario o contrasena inválidos"}'))

