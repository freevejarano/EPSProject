#!/usr/bin/python3

from Medicamento import mediClass as med
import json
import cgi

print('Content-Type: text/json')
print('')
data=cgi.FieldStorage()
#Se valida la accion del CRUD a realizar y devuelve en formato JSON la respuesta 
if(data.getvalue('act')=="ins"):
    medIns=med(data.getvalue('medname'),data.getvalue('descp'),data.getvalue('cint'))
    if(medIns.InsertarMedicamento()): #Insertar Medicamento 
        print(json.dumps('{"tipo":"OK","mensaje":"Medicamento creado"}'))
    else:
        print(json.dumps('{"tipo":"error", "mensaje":"Error al crear el medicamento"}'))

elif (data.getvalue('act')=="upd"): #Modificacion del Medicamento
    medup = med.ActualizarMedicamento(data.getvalue('medname'), data.getvalue('descp'), data.getvalue('cint'))
    if (medup is not None):
        print(json.dumps('{"tipo":"OK", "mensaje":"Medicamento actualizado"}'))
    else:
        print(json.dumps('{"tipo":"error", "mensaje":"Error al actualizar el medicamento"}'))
elif (data.getvalue('act')=="cons"):
    medob = med.ObtenerMedicamento(data.getvalue('medname')) #Consulta del Medicamento
    if(medob is not None):
      z={} #Obtencion de datos mediante un diccionario
      z['Nombre']=medob.Nombre
      z['Desc']=medob.descrip
      z['Contra']=medob.contraindica
      print(json.dumps(z))
    else:
      print(json.dumps('{"tipo":"error", "mensaje":"Error al consultar el medicamento"}'))

elif (data.getvalue('act')=="del"):
    medel = med.BorrarMedicamento(data.getvalue('medname')) #Eliminación del medicamento 
    if(medel):
        print(json.dumps('{"tipo":"OK", "mensaje":"Medicamento eliminado"}'))
    else:
        print(json.dumps('{"tipo":"error", "mensaje":"Error al eliminar el medicamento"}'))


