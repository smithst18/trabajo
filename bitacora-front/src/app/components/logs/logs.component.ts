import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/userService';
import { ReportService } from 'src/app/services/reportService';
import { Report } from 'src/app/models/report';
import { Router } from '@angular/router';

//data table source
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements AfterViewInit {
  public userCi:string;
  public userName:string;
  public reports!:Report[];
  //para mostrar o no el boton de detalles en el reporte si el que esta viendo es un admin o no 
  public show!:boolean;
  //campos de la tabla de angular material y la data
  public displayedColumns: string[] = ['position', 'name', 'date', 'department', 'problemDescription', 'toolName', 'toolNumber', 'lastDate', 'status'];
  public dataSource:any;
  public clickedRows = new Set<Report>();
  //paginator child
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //constructor
  constructor(private _userService:UserService,private _reportService:ReportService,private router:Router) {
    this.userCi = this._userService.getCi()!;
    this.userName = this._userService.getname()!;
   }

  ngAfterViewInit(): void {
    this._userService.redirect();
    if(this.userCi != ''){
      this.getLogs();
    }
    window.scrollTo(0,0);
  }

  getLogs(){
    this._reportService.getReports(this.userCi).subscribe(
      response => { 
        if(response.reportDocs.length > 0){
          //array tipo report  recoge todos los reportes
          this.reports = response.reportDocs;

          //cargamos data a la tabla 
          this.dataSource = new MatTableDataSource(this.reports);
          //en ciclo de vida / promesa asignamos al data sorce el paginator 
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log('data cargada');
        }
        if(localStorage.getItem('PERMISSE') == 'true'){
          this.show = true;
        }
      },
      err =>{
        console.log(err);
        alert('no hay data valida');
      },
    );
  }

  details(id:any){
    if(this.show != true){
      this.router.navigateByUrl(`/details/${id}`);
    }
  }
}
