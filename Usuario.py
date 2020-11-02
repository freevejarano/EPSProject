#!/usr/bin/python3
import mysql.connector
from mysql.connector import errorcode
from datetime import datetime

class usuarioClass:
 Nombre=None
 contrasenia=None
 correo=None
 def __init__(self,Nombre,correo,contrasenia):
  self.Nombre = Nombre
  self.contrasenia=contrasenia
  self.correo=correo
 def ObtenerUsuario(self,correo1, contrasenia1):
  try:
   aux=False
   cnx = mysql.connector.connect(user='alejandro', password = 'Pass.123', database='db',host='127.0.0.1')
   cursor = cnx.cursor()
   cursor.execute("select * from user where correo='{}' and pass=sha('{}');".format(correo1,contrasenia1))
   data = cursor.fetchone()
   if data == None:
     return None
   else:
     u=usuarioClass(data[0],data[1],data[2])
     return u
   cursor.close()
  except mysql.connector.Error as err:
   if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
     print("Something is wrong with your user name or password")
   elif err.errno == errorcode.ER_BAD_DB_ERROR:
     print("Database does not exist")
   else:
     print(err)
  else:
    cnx.close()

 def InsertarUsuario(self, name,ape,correo,rol,contra):
    try:
        cnx = mysql.connector.connect(user='alejandro', password='Pass.123', database='db', host='127.0.0.1')
        cursor = cnx.cursor()
        now = datetime.now() #Obtiene la fecha actual
        # dd/mm/YY H:M:S
        fecha = now.strftime("%Y-%m-%d %H:%M:%S") #Le da el formato para ir a la BD
        cursor.execute("insert into Usuario (nombre_Usuario,apellido_Usuario,correo_Usuario, rol_Usuario,contrasenia,ultima_conexion)"
                       " value('{}','{}','{}','{}',sha('{}'),'{}');".format(name, ape, correo, rol, contra, fecha)); #Sentencia SQL
        cnx.commit()
        cursor.close()
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your user name or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(err)
    else:
            cnx.close()