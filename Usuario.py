#!/usr/bin/python3
import mysql.connector
from mysql.connector import errorcode
from datetime import datetime

class usuarioClass:
#Metodo Constructoor 
 def __init__(self,name,ape,correo,rol,contra):
    self.Nombre = name
    self.Apellido= ape
    self.correo = correo
    self.rol= rol
    self.contrasenia=contra
#Funciones que se coenctan a la base de datos para el manejo de los mismos
 def ObtenerUsuario(correo1, contrasenia1):
    try: #Consulta Usuario 
        aux=False
        #cnx = mysql.connector.connect(user='val', password = 'Abc.123.', database='EPS',host='127.0.0.1')
        cnx = mysql.connector.connect(user='alejandro', password='Pass.123', database='db', host='127.0.0.1')
        cursor = cnx.cursor()
        cursor.execute("select * from Usuario where correo_Usuario='{}' and contrasenia=sha('{}');".format(correo1,contrasenia1))
        data = cursor.fetchone()
        u=None
        if data == None:
            cursor.close()
            return u
        else: #Creacion de objeto Usuario
            u=usuarioClass(data[1],data[2],data[3],data[4],data[5])
            cursor.close()
            cnx.close()
            return u
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your user name or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print("Error")
        return None
    else:
        cnx.close()
        return None

 def InsertarUsuario(name,ape,correo,rol,contra):
    try: #Insercion de Usuario
        #cnx = mysql.connector.connect(user='val', password='Abc.123.', database='EPS', host='127.0.0.1')
        cnx = mysql.connector.connect(user='alejandro', password='Pass.123', database='db', host='127.0.0.1')
        cursor = cnx.cursor()
        now = datetime.now() #Obtiene la fecha actual
        # dd/mm/YY H:M:S
        fecha = now.strftime("%Y-%m-%d %H:%M:%S") #Le da el formato para ir a la BD
        cursor.execute("insert into Usuario (nombre_Usuario,apellido_Usuario,correo_Usuario, rol_Usuario,contrasenia,ultima_conexion)"
                       " value('{}','{}','{}','{}',sha('{}'),'{}');".format(name, ape, correo, rol, contra, fecha)); #Sentencia SQL
        cnx.commit()
        cursor.close()
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
