import { Component, OnInit } from '@angular/core';
import { Report } from "../../models/report"
import { ReportService } from "../../services/reportService"
import { UserService } from 'src/app/services/userService';
@Component({
  selector: 'app-charge-logs',
  templateUrl: './charge-logs.component.html',
  styleUrls: ['./charge-logs.component.css']
})
export class ChargeLogsComponent implements OnInit {
  public report : Report
  public alertNegative : Boolean;
  public alertPositive:boolean;
  constructor(private _reportService:ReportService,private _userService : UserService) {
    this.report = new Report("","","","","","","",0,"","")
    this.alertNegative = false;
    this.alertPositive = false;
   }

  ngOnInit(): void {
    this._userService.redirect();
  }

  Validation(form:any){
    this.sendForm(form);
    window.scroll(0, 0); 
  }

  sendForm(form:any){
    let localSt = this._userService.getCi();
    if(localSt){
      this.report.ci = localSt;
    }
    this._reportService.saveReport(this.report).subscribe(
      response =>{
        if(response.reportSaved){
          form.reset();
          this.alertPositive = true;
          setTimeout(()=>{
            this.alertPositive = false
          },5000);
        }
      },
      err =>{
        console.log(<any>err);
        this.alertNegative = true;
      });
  }
}
