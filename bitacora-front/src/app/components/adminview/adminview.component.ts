import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/userService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminview',
  templateUrl: './adminview.component.html',
  styleUrls: ['./adminview.component.css']
})
export class AdminviewComponent implements OnInit {
  public permise:string;
  public users!:User[];
  constructor(private _userService: UserService,private router:Router) {
    this.permise = localStorage.getItem("PERMISSE")!;

   }

  ngOnInit(): void {
    this._userService.redirect();
    this.getUsers();
  }
  getUsers(){
    if(this.permise == 'true'){
      
      this._userService.getUsers().subscribe(
        res =>{
          if(res.userDocs){
            this.users = res.userDocs;
          }
        },
        err =>{
          console.log('error not posible data response');
        },
      );
    }else{
      this.router.navigateByUrl('logs');
    }
  }

  setId(ci:any,name:any) {
    ci.toString();
    localStorage.setItem('CI',ci);
    localStorage.setItem('NAME',name);
  }

}
