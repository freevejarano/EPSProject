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
   #cnx = mysql.connector.connect(user='val', password = 'Abc.123.', database='EPS',host='127.0.0.1')
   cnx = mysql.connector.connect(user='alejandro', password='Pass.123', database='EPS', host='127.0.0.1')
   cursor = cnx.cursor()
   cursor.execute("select Pacientes.nombre_Paciente, Medicamentos.nombre_med, Formula.cantidad, Formula.descripcion from Formula,Pacientes,Medicamentos where Formula.Pacientes_id_Paciente=Pacientes.id_Paciente and Pacientes.nombre_Paciente='{}'".format(nPac)); 
   data = cursor.fetchone()
   aux=None
   if data == None:
     return aux
   else: #Creacion objeto Formula
      u={}
      u["nombre"]= data[0]
      u["medicamento"]=data[1]
      u["cantidad"]=data[2]
      u["descripcion"]=data[3]
      aux=json.dumps(u)
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
        #cnx = mysql.connector.connect(user='val', password='Abc.123.', database='EPS', host='127.0.0.1')
        cnx = mysql.connector.connect(user='alejandro', password='Pass.123', database='EPS', host='127.0.0.1')
        cursor = cnx.cursor()
        cursor.execute("select * from Doctores where nombre_Doc='{}';".format(nDoc))
        data = cursor.fetchone()
        idDoc=data[0]
        cursor.execute("select * from Pacientes where nombre_Paciente='{}';".format(nPac))
        data = cursor.fetchone()
        idPac=data[0]
        cursor.execute("select * from Medicamentos where nombre_Med='{}';".format(self.medicamento))
        idMed=data[0]
        cnx2 = mysql.connector.connect(user='alejandro', password='Pass.123', database='EPS', host='127.0.0.1')
        cursor2= cnx2.cursor()
        print(idDoc,idPac,self.entregado,self.fecha,idMed,self.cantidad,self.descripcion)
        cursor2.execute("insert into Formula (Doctores_id_Doctor,Pacientes_id_Paciente,Entregado,fecha_formula,Medicamentos_cod_Medicamento,cantidad,descripcion)"
                       "value({},{},{},'{}',{},{},'{}');".format(idDoc,idPac,self.entregado,self.fecha,idMed,self.cantidad,self.descripcion)); #Sentencia SQL
        cnx2.commit()
 #       cursor.close()
  #      cnx.close()
   #     cnx2.close()
    #    cursor2.close()
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
   #cnx = mysql.connector.connect(user='val', password = 'Abc.123.', database='EPS',host='127.0.0.1')
   cnx = mysql.connector.connect(user='alejandro', password='Pass.123', database='EPS', host='127.0.0.1')
   cursor = cnx.cursor()
   cursor.execute("UPDATE Formula SET descripcion='{}', cantidad={} where Formula.Pacientes_id_Paciente=(select id_Paciente from Pacientes where Pacientes.nombre_Paciente='{}');".format(descp,cant,nameP))
   cnx.commit()
   cursor.execute("select Pacientes.nombre_Paciente, Medicamentos.nombre_med, Formula.cantidad, Formula.descripcion from Formula,Pacientes,Medicamentos where Formula.Pacientes_id_Paciente=Pacientes.id_Paciente and Pacientes.nombre_Paciente='{}'".format(nameP));

   data = cursor.fetchone()
   if data == None:
     return False
   else: #Creacion objeto Medicamento
     return True
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
          #cnx = mysql.connector.connect(user='val', password='Abc.123.', database='EPS', host='127.0.0.1')
          cnx = mysql.connector.connect(user='alejandro', password='Pass.123', database='EPS', host='127.0.0.1')
          cursor = cnx.cursor()
          cursor.execute("DELETE FROM Formula where Formula.Pacientes_id_Paciente in (select id_Paciente from Pacientes where Pacientes.nombre_Paciente='{}');".format(name))
          cnx.commit()
          cursor.execute("select Pacientes.nombre_Paciente, Medicamentos.nombre_med, Formula.cantidad, Formula.descripcion from Formula,Pacientes,Medicamentos where Formula.Pacientes_id_Paciente=Pacientes.id_Paciente and Pacientes.nombre_Paciente='{}'".format(name));
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
