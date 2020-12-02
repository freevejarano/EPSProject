#!/usr/bin/python3
import mysql.connector
from mysql.connector import errorcode
from datetime import datetime
import json
class formulaClass:
 doctor=None
 paciente=None
 entregado=True
 fecha=None
 medicamento=None
 cantidad=None
 descripcion=None

 def __init__(self,doctor,paci,medi,cant,descrip): #Constructor
     self.doctor = doctor
     self.paciente = paci
     now = datetime.now()  # Obtiene la fecha actual
     fecha = now.strftime("%Y-%m-%d %H:%M:%S")  # Le da el formato para ir a la BD
     self.fecha = fecha
     self.medicamento=medi
     self.cantidad = cant
     self.descripcion = descrip

#Funciones con conexion a la base de datos para el manejo de estos
 def ObtenerFormula(nPac):
  try: #Consulta Formula
   cnx = mysql.connector.connect(user='val', password = 'Abc.123.', database='EPS',host='127.0.0.1')
   cursor = cnx.cursor()
   cursor.execute("select Pacientes.nombre_Paciente, Medicamentos.nombre_med,"
                  "Formula_Medicamentos.cantidad, Formula_Medicamentos.descripcion "
                  "from Formula,Pacientes,Formula_Medicamentos,Medicamentos "
                  "where Pacientes.nombre_Paciente='{}';".format(nPac))
   data = cursor.fetchone()
   aux=None
   if data == None:
     return None
   else: #Creacion objeto Formula
      u={}
      u["nombre"]= data[0]
      u["medicamento"]=data[1]
      u["cantidad"]=data[2]
      u["descripcion"]=data[3]
      aux=json.dumps(u)

   cursor.close()
   cnx.close()
   return aux
  except mysql.connector.Error as err:
    if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
         print("Something is wrong with your user name or password")
    elif err.errno == errorcode.ER_BAD_DB_ERROR:
        print("Database does not exist")
    return None
  else:
      cnx.close()
      return None

 def InsertarFormula(self, nDoc, nPac):
    try: #Insercion de Formula
        cnx = mysql.connector.connect(user='val', password='Abc.123.', database='EPS', host='127.0.0.1')
        cursor = cnx.cursor()
        cursor.execute("select * from Doctores where nombre_Doc='{}';".format(nDoc))
        data = cursor.fetchone()
        idDoc=data[0]
        cursor.execute("select * from Pacientes where nombre_Paciente='{}';".format(nPac))
        data = cursor.fetchone()
        idPac=data[0]
        cursor.execute("insert into Formula (Doctores_id_Doctor,Pacientes_id_Paciente,Entregado,fecha_formula) "
                       "value({},{},{},'{}');".format(idDoc,idPac,self.entregado,self.fecha)); #Sentencia SQL
        cnx.commit()
        cursor.execute("select * from Formula where Doctores_id_Doctor='{}' and Pacientes_id_paciente='{}' and fecha_formula='{}';".format(idDoc,idPac,self.fecha))
        data = cursor.fetchone()
        idFor = data[0]
        cursor.execute("select * from Medicamentos where nombre_Med='{}';".format(self.medicamento))
        idMed=data[0]
        cursor.execute("insert into Formula_Medicamentos (Formula_id_Formula,Medicamentos_cod_Medicamento,cantidad,descripcion)"
                       "value ('{}','{}','{}','{}');".format(idFor, idMed, self.cantidad, self.descripcion));  # Sentencia SQL
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

 def ActualizarFormula(nameM,cant,descp,nameP):
  try: #Modificacion Formula
   aux=False
   cnx = mysql.connector.connect(user='val', password = 'Abc.123.', database='EPS',host='127.0.0.1')
   cursor = cnx.cursor()
   cursor.execute("update Formula_Medicamentos, Medicamentos, Pacientes, Formula set Medicamentos.nombre_Med='{}',"
                  "Formula_Medicamentos.cantidad={}, Formula_Medicamentos.descripcion='{}'"
                  "where Formula.Pacientes_id_Paciente=Pacientes.id_Paciente and Pacientes.nombre_Paciente='{}';".format(nameM,cant,descp,nameP))
   cnx.commit()
   cursor.execute("select * from Formula, Formula_Medicamentos,Medicamentos "
                  "where Formula_Medicamentos.cantidad={} and "
                  "Formula_Medicamentos.Medicamentos_cod_Medicamento=Medicamentos.cod_Medicamento"
                  "and Medicamentos.nombre_med='{}';".format(cant,nameM))
   data = cursor.fetchone()
   if data == None:
     return None
   else: #Creacion objeto Medicamento
     u=data
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

 def BorrarFormula(name):
      try: #Eliminacion Medicamento
          aux = False
          cnx = mysql.connector.connect(user='val', password='Abc.123.', database='EPS', host='127.0.0.1')
          cursor = cnx.cursor()
          cursor.execute("select Formula.id_Formula, Pacientes.nombre_Paciente"
                         "from Pacientes,Formula, Formula_Medicamentos"
                         "where Formula.Pacientes_id_Paciente=Pacientes.id_Paciente"
                         "and Pacientes.nombre_Paciente='{}'".format(name))
          data = cursor.fetchone()
          idF=data[0]
          cursor.execute("DELETE FROM Formula WHERE id_Formula='{}';".format(idF))
          cnx.commit()
          cursor.execute("select * from Formula where id_Formula='{}';".format(idF))
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