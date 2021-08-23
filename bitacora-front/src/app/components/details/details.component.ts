import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/userService';
import { ReportService } from "src/app/services/reportService";
import { Report } from 'src/app/models/report';
import { ActivatedRoute,Router } from '@angular/router';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit{
  public report:Report;
  public id!:string
  public alertDelete:Boolean;
  constructor(
    private _userService : UserService,
    private _reportService : ReportService,
    private rout : ActivatedRoute,
    private router:Router,
    
    ) {
      this.report = new Report("","","","","","","",0,"","");
      this.alertDelete = false;
    }
    
  ngOnInit(): void {
    this._userService.redirect();
    this.getId()
    this.getOneReport(this.id);
  }
  //obtener id de los parametros de la url
  getId():void{
    this.rout.params.subscribe(
      response=>{
        this.id = response._id;
      }, 
      err=>{
        console.log(err);
      }
    )
  }
  //obtener el reporte espesifico selecionado en logs
  getOneReport(id:any){
    this._reportService.getOneReport(id).subscribe(
      res =>{
        this.report = res.reportDoc;
      },
      err =>{
        console.log('error de respuesta',err);
      },
    )
  }

  deleteReport(){
    if(this.alertDelete = true){
      this._reportService.deleteReport(this.id).subscribe(
        res =>{
          console.log('eliminado');
          this.router.navigateByUrl('/logs');
        },
        err =>{
          alert('no es posible borrar al usuario');
        },
      );
  }
}
  
  updateReport(){
    console.log('se actualizado');
    this._reportService.updateReport(this.id,this.report).subscribe(
      res =>{
        console.log('reporte actualizado correctamente');
        this.router.navigateByUrl('logs');
      },
      err =>{
        console.log('Error al actualizar usuario');
      }
    )
  }
}
