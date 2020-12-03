#!/usr/bin/python3
import mysql.connector
from mysql.connector import errorcode
from datetime import datetime

class mediClass:
 Nombre=None
 contrasenia=None
 correo=None
 def __init__(self,Nombre,descrip,contraindica): #Constructor 
    self.Nombre = Nombre
    self.descrip=descrip
    self.contraindica=contraindica
#Funciones con conexion a la base de datos para el manejo de estos
 def ObtenerMedicamento(nmed): 
  try: #Consulta Medicamento
   aux=False
   #cnx = mysql.connector.connect(user='val', password = 'Abc.123.', database='EPS',host='127.0.0.1')
   cnx = mysql.connector.connect(user='alejandro', password='Pass.123', database='EPS', host='127.0.0.1')
   cursor = cnx.cursor()
   cursor.execute("select * from Medicamentos where nombre_med='{}';".format(nmed))
   data = cursor.fetchone()
   u= None
   if data == None:
     return None
   else: #Creacion objeto Medicamento 
     u=mediClass(data[1],data[2],data[3])
   cursor.close()
   cnx.close()
   return u
  except mysql.connector.Error as err:
    if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
         print("Something is wrong with your user name or password")
    elif err.errno == errorcode.ER_BAD_DB_ERROR:
        print("Database does not exist")
    return None
  else:
      cnx.close()
      return None

 def InsertarMedicamento(self):
    try: #Insercion de Medicamento
        #cnx = mysql.connector.connect(user='val', password='Abc.123.', database='EPS', host='127.0.0.1')
        cnx = mysql.connector.connect(user='alejandro', password='Pass.123', database='EPS', host='127.0.0.1')
        cursor = cnx.cursor()
        cursor.execute("insert into Medicamentos (nombre_med,descripcion_med,contraindicaciones_med) "
                       " value('{}','{}','{}');".format(self.Nombre,self.descrip,self.contraindica)); #Sentencia SQL
        cnx.commit()
        cursor.close()
        cnx.close()
        return True
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your user name or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(err)
        return False
    else:
        cnx.close()
        return False

 def ActualizarMedicamento(name,descrip,contraindica):
  try: #Modificacion Medicamento
   aux=False
   #cnx = mysql.connector.connect(user='val', password = 'Abc.123.', database='EPS',host='127.0.0.1')
   cnx = mysql.connector.connect(user='alejandro', password='Pass.123', database='EPS', host='127.0.0.1')
   cursor = cnx.cursor()
   cursor.execute("UPDATE Medicamentos SET descripcion_med= '{}', contraindicaciones_med= '{}' WHERE nombre_med = '{}';".format(descrip,contraindica,name))
   cnx.commit()
   cursor.execute("select * from Medicamentos where descripcion_med= '{}' and contraindicaciones_med= '{}';".format(descrip,contraindica))
   data = cursor.fetchone()
   if data == None:
     return None
   else: #Creacion objeto Medicamento
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

 def BorrarMedicamento(name):
      try: #Eliminacion Medicamento  
          aux = False
          #cnx = mysql.connector.connect(user='val', password='Abc.123.', database='EPS', host='127.0.0.1')
          cnx = mysql.connector.connect(user='alejandro', password='Pass.123', database='EPS', host='127.0.0.1')
          cursor = cnx.cursor()
          cursor.execute("DELETE FROM Medicamentos WHERE nombre_med='{}';".format(name))
          cnx.commit()
          cursor.execute("select * from Medicamentos where nombre_med='{}';".format(name))
          data = cursor.fetchone()
          if data == None:
              cursor.close()
              return True
          else:
              cursor.close()
              return False
      except mysql.connector.Error as err:
          if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
              print("Something is wrong with your user name or password")
          elif err.errno == errorcode.ER_BAD_DB_ERROR:
              print("Database does not exist")
          else:
              print(err)
          return False
      else:
          cnx.close()
          return False
