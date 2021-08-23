import { Component, OnInit } from '@angular/core';
import { User } from "../../models/user";
import { UserService } from "../../services/userService"
import { Permised } from "../../services/code";
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user : User;
  public codePermise:number;
  public alert:Boolean;
  public showCode:boolean;
  constructor( private _userService : UserService,private router:Router) { 

      this.user = new User("","","",0,"",false);
      this.codePermise = Permised.codePermise;
      this.alert = false;
      this.showCode = false;
  }

  ngOnInit(): void {
    this._userService.redirect();
  }
  showAlert(){
    this.alert = true;
      window.scrollTo(0,0);
  }
  Validation(form:any){
    if(this.user.password == this.user.repassword){
      if(this.user.code == this.codePermise )
      {
        this.user.permise = true
        this.sendForm(form);
        this.router.navigateByUrl('/singIn');
      }else{
        this.sendForm(form); 
        this.router.navigateByUrl('/singIn');
      }
    }else{
      this.showAlert();
    }
    console.log(this.user);
  }
  sendForm(form:any){
      this._userService.saveUser(this.user).subscribe(
        response =>{
            console.log('registrado');
        },
        err =>{
            console.log(<any>err);
            if(err.status == 400){
              this.showAlert();
            }
        },
      );
  }

  ShowImputCode(){//motrar input code
    console.log("click");
    if(this.showCode == false){
      this.showCode = true;
    }else{
      this.showCode = false;
    }
  }

}
