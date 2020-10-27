#!/usr/bin/python3
import cgi

datos = cgi.FieldStorage()
nombre= datos.getvalue('nombre')
contra= datos.getvalue('pass')
correo= datos.getvalue('correo')

print("Hola")
