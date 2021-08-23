'use strict'
var Report = require('../models/reports');

var controller = {
    saveReport: function(req,res){
        var report = new Report();
        var params = req.body;
        

        report.ci = params.ci;
        report.name = params.name;
        report.date = params.date;
        report.department = params.department;
        report.problemDescription = params.problemDescription;
        report.toolName = params.toolName;
        report.toolNumber = params.toolNumber;
        report.lastDate = params.lastDate;
        report.status = params.status;

        report.save(function(err,reportSaved){
            if(err) return res.status(500).send({message:"error al  guardar"});
            if(!reportSaved) return res.status(404).send({message:"no es posible guardar"});

            return res.status(200).send({
                message:"Reporte guardado exitosamente ",
                reportSaved,
            });
        });
    },
    
    getOneReport:function(req,res){
        var id = req.params.id

        Report.findById({_id:id},function(err, reportDoc){
            if(err)return res.status(500).send('Not possible');
            if(!reportDoc)return res.status(404).send('Not found');

                return res.status(200).send({reportDoc});
        });
    },
    getReports:function(req,res){
        var ci = req.params.ci
        
        Report.find({ci: ci},function(err, reportDocs){
            if(err) return res.status(500).send({message:"no es posible la busqueda"});
            if(!reportDocs) return res.status(404).send({message:"no se ha encontrado resultados"});
             
            return res.status(200).send({

                message:`archivos encontrados`,
                reportDocs,
            });
        });
    },
    updateReport: function(req,res){
        var _id = req.params.id;
        var update = req.body;
                                // { campo:valor } para editar solo 1 campo
        Report.findByIdAndUpdate(_id,update,{new:true},(err,updateDoc)=>{
            if(err) return res.status(500).send({message:"no es posible la actualizacion "});
            if(!updateDoc) return res.status(404).send({message:"reporte a actualizar no disponible"});

            return res.status(200).send({
                message:"Actualizacion de reporte realizada correctamente",
                doc:updateDoc,
            });
        });
    },

    deleteReport: function(req,res){
        var _id = req.params.id;

        Report.findByIdAndRemove(_id,(err,removeDoc)=>{
            if(err) return res.status(500).send({message:"no es posible la eliminacion del report"});
            if(!removeDoc) return res.status(404).send({message:"no se ha encontrado el fichero a eliminar"});

            return res.status(200).send({message:`eliminado correctamente el doc`,doc:removeDoc});
        });
    }
}

module.exports = controller;