import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public location = '';

  constructor(public _router: Router){
    
  }

  main(){
  if(this._router.url==='/admin/login' || this._router.url==='/admin/dashboard' )return 0;

  return 1;
    
  }
}
