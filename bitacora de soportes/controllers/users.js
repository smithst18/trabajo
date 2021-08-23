'use strict'
//import del modelo de usuario para  implementarlo cuanas veces se quiera 
var User = require('../models/users');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const SECRET_KEY = "secretKey123"

var controller = {
    saveUser: function(req,res){
        var user = new User();
        var params = req.body;

        user.name = params.name;
        user.password = bcrypt.hashSync(params.password); //codificacion de contrase;a
        user.ci = params.ci
        user.permise = params.permise;

        //comprobamos que no exista el usuario 
        User.findOne({ci:params.ci},(err,userdoc)=>{
            if(err){ //internal server error
                return res.status(500).send({message:`type error: ${err}`});
            }
            if(userdoc){ //si conseguimos el usuario no sera creado y se envia un mensaje
                return res.status(400).send('Ya existe el usuario');
                
                //si no se consigue creamos nuestro usuario 
            }else if(!userdoc){
                //guardamos
                user.save((err,userStored)=>{
                    //validamos algun error
                    if(err){
                        return res.status(500).send({
                            message: "Error saving User",
                            err:err,
                        });
                    }//error al guardar documento
                    if(!userStored){
                        return res.status(404).send('impossible saved');
                    }
                });
                return res.status(201).send({
                    user,
                    message:function(){
                        alert("usuario creado correctamente");
                    },
                });              
            }
        });
    },
    getUser: function(req,res){
        var userCi = req.params.ci;
        var userPassword = req.params.password;
        
        User.findOne({ci:userCi},(err,user) => {
            if(err) return res.status(500).send({message:"error devolviendo datos "});
            if(!user){
                return res.status(404).send({message:"usuario inexistente"});
            }
            else{     //bolean          //comparar has      //unhashed  //hashed
                const resultPassword = bcrypt.compareSync(userPassword,user.password) //comparacion de contrase;a hassing y nohassing
                if(resultPassword){

                    const expiresIn = 1*60*60;
                    const token = jwt.sign( {id:user._id}, SECRET_KEY, {expiresIn: expiresIn});
                    const userData = {
                        id: user._id,
                        name: user.name,
                        ci: user.ci,
                        permise: user.permise,
                        accesToken: token,
                        expireIn: expiresIn,
                    };
                    return res.status(200).send({
                        userData,
                        message:"usuario encontrado correctamente",
                    });
                }
            }
        });
    },

   
    getUsers:function(req,res){
        User.find({permise:false},function(err,userDocs){
            if(err) return res.status(500).send({message:"error al devolver datos"});
            if(!userDocs) return res.status(404).send({message:"archivos no encontrados"});

            return res.status(200).send({userDocs});
        });
    },
    /* 
    updateUser: function(req,res){
        var userId = req.params.id;
        var update = req.body;

        User.findByIdAndUpdate(userId,update,{new:true},(err,updaDoc)=>{
            if(err) return res.status(500).send({message:"error al actualizar datos"});
            if(!updaDoc) return res.status(404).send({message:"no encontrado usuario a actualizar "});

            return res.status(200).send({updated:updaDoc});
        });
    },

    deleteUser:function(req, res){
        var userId = req.params.id;
        var permise = req.params.permise;
        if(permise == true){
            User.findByIdAndRemove(userId,(err,userDelete)=>{
                if(err) return res.status(500).send({err:'no es posible la eliminacion'});
                if(!userDelete) return res.status(404).send({err:`Usuario a eliminar no encontrado`});
    
                return res.status(200).send({
                    message:"usuario eliminado correctametne",
                    user:userDelete,
                });
            });
        }else{
            return res.status(403).send({message:"unauthorized/no tienes permisos"});
        }
    }
*/
}
module.exports = controller; 