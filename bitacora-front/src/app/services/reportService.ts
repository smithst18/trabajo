import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from "./global";
import { Report } from "../models/report";

@Injectable()
export class ReportService {
    public url:string;
    public headers:any;
    constructor(
        private _http:HttpClient,
    ){
        this.url = Global.url;
        this.headers = new HttpHeaders().set('Content-Type', 'application/json');
    }

    saveReport(report:Report):Observable<any>{
        let params = JSON.stringify(report);

        return this._http.post(this.url + "save-report",params,{headers: this.headers});
    }

    getReports(ci:String):Observable<any>{


        return this._http.get(this.url + `get-reports/${ci}`,{headers: this.headers});
    }
    updateReport(id:string,report:Report):Observable<any>{
        let params =JSON.stringify(report);

        return this._http.put(this.url + `update-report/${id}`,params,{headers:this.headers});
    }

    getOneReport(id:string):Observable<any>{

        return this._http.get(this.url + `get-one/${id}`,{headers:this.headers});
    }

    deleteReport(id:string):Observable<any>{

        return this._http.delete(this.url + `delete-report/${id}`,{headers:this.headers});
    }

}
