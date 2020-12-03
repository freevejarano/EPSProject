#!/usr/bin/python3
from flask import Flask, request, jsonify
import json
from Formula import formulaClass as form


app=Flask(__name__)
@app.route('/')
def hello():
  return "hello"

@app.route('/formula',methods=['POST'])
def formula():
# try:
  j=request.get_json()
  print(j.get('paciente'))
  formula= form(j.get('doctor'),j.get('paciente'),j.get('medicamento'),j.get('cantidad'),j.get('descripcion'))
  crear= formula.InsertarFormula(j.get('doctor'),j.get('paciente'))
  print(crear)
  if crear:
    return "True"
  else:
    return "False"
# except:
 #   return (request,"Error, no llegaron correctamente los datos")

@app.route('/verFormula',methods=['POST'])
def verFormula():
# try:
 # response_object = {'status': 'success'}
  
  j = request.get_json()
  formula=form.ObtenerFormula(j.get('paciente'))
  print(formula)
  if formula is None:
     return "False"
  else:
     return formula
# except:
#  return ("Error, no llegaron correctamente los datos")

@app.route('/actualizarFormula',methods=['POST'])
def actualizarProductos():
 #try:
  j=request.get_json()
  si= form.ActualizarFormula(j.get('medicamento'),j.get('cantidad'),j.get('descripcion'),j.get('paciente'))
  if si:
    return "True"
  else:
    return "False"
# except:
#    return ("Error, no llegaron correctamente los datos")


@app.route('/borrarFormula', methods=['POST'])
def borrarProductos():
#try
  j = request.get_json()
  delete = form.BorrarFormula(j.get('paciente'))
  if delete:
    return "True"
  else:
    return "False"
# except:
#    return ("Error, no llegaron correctamente los datos")


if __name__ == '__main__':
  app.run(host="0.0.0.0")
