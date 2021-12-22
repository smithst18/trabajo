import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from "./global";
import { User } from "../models/user";
import { tap } from "rxjs/operators";
import { Jwt } from "./jwt";
import { Router } from "@angular/router";

@Injectable()
export class UserService {
    public url:String;
    private token!: String;
    constructor(
        private _http:HttpClient,private router:Router
    ){
        this.url = Global.url;
    }

    saveUser(user:User):Observable<any>{
        let params = JSON.stringify(user);
        let headers =  new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url + "save-user",params,{headers: headers});
    }

    getUser(ci:String,password:String):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
                //pasamos nuestr interfaz para poder recibir la respuesta del backend
        return this._http.get<Jwt>(this.url + `user/${ci}/${password}`,{headers: headers}).pipe(tap(
            (res)=>{
                if(res){
                    this.saveToken(res.userData.accesToken,res.userData.expireIn,res.userData.ci,res.userData.name);
                }
            }
        ));
    }

    getUsers():Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.get(this.url + 'users',{headers: headers});
    }
    
    logOut(){
        if(this.token != ""){

        this.token = "";
        localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem("EXPIRE_IN");
        localStorage.removeItem("CI");
        localStorage.removeItem("NAME");
        localStorage.removeItem('PERMISSE');
        }
        if(this.router.url != '/logIn'){
            this.router.navigateByUrl('/signIn');
        }
    }

    private saveToken(token:string,expireIn:string,ci:string,name:string):void{
        localStorage.setItem("ACCESS_TOKEN",token);
        localStorage.setItem("EXPIRE_IN",expireIn);
        localStorage.setItem("CI",ci);
        localStorage.setItem("NAME",name);
        this.token = token;
    }
    private getToken(){
        if(!this.token){
            this.token = localStorage.getItem("ACCESS_TOKEN")!;
        }
        return this.token;
    }
    getCi(){
        return localStorage.getItem("CI");
    }
    getname(){
        return localStorage.getItem("NAME");
    }
    redirect(){
        this.getToken();
        if((this.token != null || this.token != undefined) && (this.router.url == "/logIn" || this.router.url == "/signIn")){
            this.router.navigateByUrl("/logs");
        }else if(this.token == null && this.router.url != '/logIn'){
            this.router.navigateByUrl("/signIn");
        }
    }
}
