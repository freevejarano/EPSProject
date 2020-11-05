#!/usr/bin/python3

from Usuario import usuarioClass as us
import json
import cgi

print('Content-Type: text/json')
print('')

#Permitir extraccion de datos
data=cgi.FieldStorage()
#Insercion de datos de Usuario mediante el objeto
regusuario=us.InsertarUsuario(data.getvalue('fname'),data.getvalue('lname'),data.getvalue('email'),data.getvalue('rol'),data.getvalue('password'))
#Validacion 
if(regusuario is not None): #Correcta insersion (No objeto vacio)
    print(json.dumps('{"tipo":"OK","mensaje":"Bienvenido"}'))
else: #Insercion fallida
    print(json.dumps('{"tipo":"error","mensaje":"Usuario o contrasena inválidos"}'))
