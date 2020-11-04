#!/usr/bin/python3
import mysql.connector
from mysql.connector import errorcode
from datetime import datetime

class usuarioClass:
 
 def __init__(self,name,ape,correo,rol,contra):
    self.Nombre = name
    self.Apellido= ape
    self.correo = correo
    self.rol= rol
    self.contrasenia=contra

 def ObtenerUsuario(correo1, contrasenia1):
    try:
        aux=False
        cnx = mysql.connector.connect(user='alejandro', password = 'Pass.123', database='EPS',host='127.0.0.1')
        cursor = cnx.cursor()
        cursor.execute("select * from Usuario where correo_Usuario='{}' and contrasenia=sha('{}');".format(correo1,contrasenia1))
        data = cursor.fetchone()
        u=None
        if data == None:
            cursor.close()
            return u
        else:
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
    try:
        cnx = mysql.connector.connect(user='alejandro', password='Pass.123', database='EPS', host='127.0.0.1')
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
