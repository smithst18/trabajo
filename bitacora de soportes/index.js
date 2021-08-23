'use strict'
const mongoose = require('mongoose');

//importo mi archivo de configuraciones
const app = require('./app');
//puerto del servidor
const port = 3900;

/*conexion a la base de datos */
mongoose.set('useFindAndModify', false); //evitar errores con mongoose
mongoose.Promise = global.Promise;
                                //nombre de mi base de datos        //parametros para evitar errore de mongoose
mongoose.connect('mongodb://localhost:27017/trabajo',{ useNewUrlParser:true, useUnifiedTopology: true })
    //si se cumple la promesa
    .then(()=>{
        console.log('DataBase Conection succesfully');

        //una vez creada la conexion a la db  creamos el servidor dentro de la promesa
        app.listen(port,()=>{
            console.log('servidor runing on port 3900');
        });
    })
    //si da error
    .catch(err =>{
        console.log(err);
        console.log('not posible conection');
    });
