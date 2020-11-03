#!/usr/bin/python3

from Usuario import usuarioClass as us
import json
import cgi

print('Content-Type: text/json')
print('')


data=cgi.FieldStorage()

regusuario=us.InsertarUsuario(data.getvalue('fname'),data.getvalue('lname'),data.getvalue('email'),data.getvalue('rol'),data.getvalue('password'))

if(regusuario is not None):
    print(json.dumps('{"tipo":"OK","mensaje":"Bienvenido"}'))
else:
    print(json.dumps('{"tipo":"error","mensaje":"Usuario o contrasena inválidos"}'))
