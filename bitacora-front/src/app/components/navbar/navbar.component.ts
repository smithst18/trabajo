import { Component, AfterContentChecked } from '@angular/core';
import { UserService } from '../../services/userService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements AfterContentChecked {
  public show!:number;
  constructor(private _userService:UserService,private router:Router) {
   }

  ngAfterContentChecked():void{
    let localst = localStorage.getItem('PERMISSE')
    if(this.router.url == '/signIn' || this.router.url == '/logIn'){ // si esta en inicio o regis muestra iniciar sesion
      this.show = 0;
    }else if(localst == "true"){//si el usuario tiene permisos muestra cerrar sesion pero no cargar bitacora ni bitacora
      this.show = 1;
    }else{
      this.show = 2;//si es un usuario normal mostrara todo
    }
  }
  closeSession(){
    console.log("Sesion acabada ");
    this._userService.logOut();
    this.show = 0;
    console.log(this.show);
  }   

  showboton(){

  }
}

