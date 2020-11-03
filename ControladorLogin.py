#!/usr/bin/python3

from Usuario import usuarioClass as us
import cgi
import json

print('Content-Type: text/json')
print('')
data=cgi.FieldStorage()

usuario=us.ObtenerUsuario(data.getvalue('email'),data.getvalue('contra'))

email=data.getvalue('email')
contraseña =data.getvalue('contra')
if(usuario is not None):
    print(json.dumps('{"tipo":"OK","mensaje":"Bienvenido"}'))
else:
    print(json.dumps('{"tipo":"error","mensaje":"Usuario o contrasena inválidos"}'))

