#!/usr/bin/python3

from Medicamento import mediClass as med
import cgi

data=cgi.FieldStorage()

if(data.getvalue('act')=="ins"):
    medica=med.InsertarMedicamento(data.getvalue('medname'),data.getvalue('descp'),data.getvalue('cint'))
elif (data.getvalue('act')=="act"):
    medica = med.ActualizarMedicamento(data.getvalue('medname'), data.getvalue('descp'), data.getvalue('cint'))
elif (data.getvalue('act')=="cons"):
    medica = med.ObtenerMedicamento(data.getvalue('medname'))
elif (data.getvalue('act')=="del"):
    medica = med.BorrarMedicamento(data.getvalue('medname'))
    
print('Content-Type:text/html')
print('')
def render(archivo,modelo=None):
    with open(archivo) as f:
         pagina=f.read()
         if modelo:
           pagina=pagina.format(nombre=modelo.Nombre)
    return pagina

if medica== None:
   pagina=render("Login2.html")
   print(pagina)
else:
  pagina=render("Login3.html",medica)
  print(pagina)