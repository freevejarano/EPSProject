#!/usr/bin/python3
from Usuario import usuarioClass as us
import cgi

data=cgi.FieldStorage()

usuario=us.ObtenerUsuario(data.getvalue('correo'),data.getvalue('contra'))

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
