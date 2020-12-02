#!/usr/bin/python3
from Formula import formulaClass as form
#!/usr/bin/python3
from flask import Flask, request
app=Flask(__name__)
@app.route('/')
def hello():
  return "hello"

@app.route('/formula',methods=['POST'])
def productos():
  j=request.get_json()
  #Creando=pro.crearProducto(j.get('id'),j.get('Aroma'),j.get('Imagen'),j.get('Nombre'),j.get('precio'),j.get('stock'),j.get('Tipo'))
  formula= form(j.get('doctor'),j.get('paciente'),j.get('medicamento'),j.get('cantidad'),j.get('descripcion'))
  crear= formula.InsertarFormula()
  if crear:
    return "True"
  else:
    return "False"

@app.route('/crearFormula',methods=['GET'])
def crearProductos():
  response_object = {'status': 'success'}
  j = request.get_json()
  formula=form.ObtenerFormula(j.get('paciente'))
  return formula

@app.route('/actualizarFormula',methods=['PUT'])
def actualizarProductos():
  j=request.get_json()
  si= form.ActualizarFormula(j.get('medicamento'),j.get('cantidad'),j.get('descripcion'),j.get('paciente'))
  if si:
    return "True"
  else:
    return "False"


@app.route('/borrarFormula', methods=['POST'])
def borrarProductos():
  j = request.get_json()
  delete = form.BorrarFormula(j.get('paciente'))
  if delete:
    return "True"
  else:
    return "False"


if __name__ == 'main_':
  app.run(host="0.0.0.0")