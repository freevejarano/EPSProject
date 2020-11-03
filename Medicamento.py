#!/usr/bin/python3
import mysql.connector
from mysql.connector import errorcode
from datetime import datetime

class mediClass:
 Nombre=None
 contrasenia=None
 correo=None
 def __init__(self,Nombre,descrip,contraindica):
    self.Nombre = Nombre
    self.descrip=descrip
    self.contraindica=contraindica
 def ObtenerMedicamento(self,nmed):
  try:
   aux=False
   cnx = mysql.connector.connect(user='alejandro', password = 'Pass.123', database='db',host='127.0.0.1')
   cursor = cnx.cursor()
   cursor.execute("select * from Medicamento where nombre_med='{}';".format(nmed))
   data = cursor.fetchone()
   if data == None:
     return None
   else:
     u=mediClass(data[1],data[2],data[3])
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

 def InsertarMedicamento(self, name,descrip,contraindica):
    try:
        cnx = mysql.connector.connect(user='alejandro', password='Pass.123', database='db', host='127.0.0.1')
        cursor = cnx.cursor()
        cursor.execute("insert into Medicamentos (nombre_med,descripcion_med,contraindicaciones_med) "
                       " value('{}','{}','{}');".format(name, descrip, contraindica)); #Sentencia SQL
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

 def ActualizarMedicamento(self,name,descrip,contraindica):
  try:
   aux=False
   cnx = mysql.connector.connect(user='alejandro', password = 'Pass.123', database='db',host='127.0.0.1')
   cursor = cnx.cursor()
   cursor.execute("UPDATE Medicamentos SET descripcion_med= '{}', contraindicaciones_med= '{}' WHERE nombre_med = '{}';".format(descrip,contraindica,name))
   cnx.commit()
   cursor.execute("select * from Medicamento where descripcion_med= '{}' and contraindicaciones_med= '{}';".format(descrip,contraindica))
   data = cursor.fetchone()
   if data == None:
     return None
   else:
     u=mediClass(data[1],data[2],data[3])
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

  def BorrarMedicamento(self, name):
      try:
          aux = False
          cnx = mysql.connector.connect(user='alejandro', password='Pass.123', database='db', host='127.0.0.1')
          cursor = cnx.cursor()
          cursor.execute("DELETE FROM Medicamentos WHERE nombre_med='{}';".format(name))
          cnx.commit()
          cursor.execute("select * from Medicamento where nombre_med='{}';".format(name))
          data = cursor.fetchone()
          if data == None:
              return None
          else:
              u = mediClass(data[1], data[2], data[3])
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