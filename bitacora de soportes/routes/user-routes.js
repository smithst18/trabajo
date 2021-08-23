const express = require('express');
//import del controlador y de express para hacer rutas de dicho controlador 
const userControler = require('../controllers/users');
const router = express.Router();
//rutas del router

//metodo   //ruta  //controlador //methodo 
router.post('/save-user',userControler.saveUser);
router.get('/user/:ci/:password',userControler.getUser);
router.get('/users',userControler.getUsers);
/*
router.put('/update-user/:id',userControler.updateUser);
router.delete('/delete-user/:id/:permise',userControler.deleteUser);
*/
module.exports = router;

