#!/usr/bin/python3

from Usuario import usuarioClass as us
import cgi
import json

print('Content-Type: text/json')
print('')

data=cgi.FieldStorage()

regusuario=us.InsertarUsuario(data.getvalue('fname'),data.getvalue('lname'),data.getvalue('email'),data.getvalue('rol'),data.getvalue('contra'))

if(regusuario is not None):
    print(json.dumps('{"tipo":"OK","mensaje":"Bienvenido"}'))
else:
    print(json.dumps('{"tipo":"error","mensaje":"Usuario o contrasena inválidos"}'))