import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user'
import { UserService } from 'src/app/services/userService';
import { Router } from '@angular/router'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  public user:User;
  public alert:Boolean;
  constructor(
    private _userService : UserService,private router:Router
  ) {
    this.user = new User('','','',0,"",false);
    this.alert = false;
   }

  ngOnInit(): void {
    this._userService.redirect();
  }
  validation(form:any){
    this.getUser(this.user);
  }

  getUser(user:User){
    this._userService.getUser(this.user.ci,this.user.password).subscribe(
      response =>{
        if(response.userData){
          if(response.userData.permise == true){
            localStorage.setItem('PERMISSE','true');
            this.router.navigateByUrl('analistas');
          }else{
            localStorage.setItem('PERMISSE','false');
            this.router.navigateByUrl('logs');
          }

        }
      },
      err =>{
        console.log(<any>err);
        console.log('Credenciales invalidas');
        this.alert = true;
        console.log(this.alert);
      },
    );
  }
}

