var url1="http://ec2-34-229-184-217.compute-1.amazonaws.com:5000/";

new Vue({
      el: '#app',
      vuetify: new Vuetify(),
       data () {
        return {            
            formulas: [],            
            paciente: null,
            medicamento: null,
            cantidad: null,
            descripcion: null
        }
       },
       methods:{          
            //MÉTODOS PARA EL CRUD
            mostrarF:function(){
              axios.get(url1+"formula", {paciente:this.paciente})
              .then(response =>{
                var form = response.data;
                this.paciente= form.paciente;
                this.medicamento=form.doctor;
                this.cantidad=form.cantidad;
                this.descripcion=form.descripcion;
              })
            },
            insertarF:function(){    
                this.paciente=            
                axios.post(url1+"crearFormula", {paciente: this.paciente, medicamento: this.medicamento, cantidad: this.cantidad, descripcion: this.descripcion})
                .then(response =>{
                  Swal.fire('Formula Insertada', '', 'success');
                });   
                this.paciente= "";
                this.medicamento= "";
                this.cantidad= "";
                this.descripcion= "";
            },  
            actualizarF:function(id, descripcion, precio, stock){
              axios.post(url1+"actualizarFormula", {paciente: this.paciente, medicamento: this.medicamento, cantidad: this.cantidad, descripcion: this.descripcion})
                  .then(response =>{
                    Swal.fire('Formula Actualizada', '', 'success');
              }); 
            },             
            borrarF:function(id){               
              axios.post(url1+"borrarFormula", {paciente: this.paciente})
                  .then(response =>{           
                    Swal.fire('Formula Actualizada', '', 'success');
              });      
                            
            }
       }      
    });