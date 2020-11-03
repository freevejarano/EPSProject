#!/usr/bin/python3

import cgi
from Usuario import usuarioClass as us

data=cgi.FieldStorage()

usuario=us.InsertarUsuario(data.getvalue('fname'),data.getvalue('lname'),data.getvalue('email'),data.getvalue('rol'),data.getvalue('contra'))

print('Content-Type:text/html')
print('')
def render(archivo,modelo=None):
    with open(archivo) as f:
         pagina=f.read()
         if modelo:
           pagina=pagina.format(nombre=modelo.Nombre)
    return pagina

if usuario== None:
   pagina=render("Login2.html")
   print(pagina)
else:
  pagina=render("Login3.html",usuario)
  print(pagina)