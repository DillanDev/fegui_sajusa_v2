import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import {Router} from '@angular/router';

import { EcommerceService } from '../../services/ecommerce.service';
import { LoginI } from '../../interfaces/login.interface';
import { ResponseI } from '../../interfaces/response.interface';


@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {


  loginform = new FormGroup({
    email    : new FormControl('',Validators.required),
    password : new FormControl('',Validators.required)

  });


  b: boolean;
  constructor(private log: EcommerceService, private router:Router) { 
    this.b = true;
  }

  ngOnInit(): void {
    

  }
 
  
  mostrar(){

    return this.b;
  }


   onLogin(form:LoginI){

    this.log.LoginByEmail(form).subscribe(res =>{
      let dataResponse: ResponseI = res;
      if(dataResponse.ok == true){
        localStorage.setItem("token",dataResponse.token);
        this.router.navigate(['cuenta']);

      }
    })
  }
}
