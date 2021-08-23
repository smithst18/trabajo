import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/userService';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard /*implements CanActivate*/ {
  constructor(private _userService: UserService){

  }
  //canActivate(): Observable<boolean>{

  //}
  
}
