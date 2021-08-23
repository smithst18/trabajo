/*configuracion de express*/
const express = require('express');

const app = express();
//cargar archivos de rutas
const userRoutes = require('./routes/user-routes')
const reportRoutes = require('./routes/reports-routes')
/*middlewares*/
//comvierte cualquier peticion a json 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//cors (configuraciones necesarias para peticiones http)
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

	next();
});

//rutas //mediante un middleware
app.use('/api',userRoutes);
app.use('/api',reportRoutes);
//app.use('/',reportRoutes);

//export 
module.exports = app;