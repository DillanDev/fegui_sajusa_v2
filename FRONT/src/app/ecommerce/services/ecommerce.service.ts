import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders}  from '@angular/common/http';
import { Observable } from "rxjs";

import { LoginI } from '../interfaces/login.interface'
import { ResponseI } from '../interfaces/response.interface'
import { Products } from '../interfaces/product.interface'
import { Categories } from '../interfaces/categories.interface';



@Injectable({
  providedIn: 'root'
})
export class EcommerceService {

  url: string = "http://localhost:3000/"

  listproducts: any = '';

  constructor(private http:HttpClient) { 

  }

   LoginByEmail(form:LoginI):Observable<ResponseI>{
    let direccion = this.url + "fegui_sajusa/api/v1/customers/auth/login";
    return this.http.post<ResponseI>(direccion,form);

  }


  getcategory(): Observable<Categories[]>{
    const _url = `${this.url}fegui_sajusa/api/v1/categories`;
    return this.http.get<Categories[]>(_url);
  }


  getlistproducts(name:string): Observable<any>{
    const _url = `${this.url}fegui_sajusa/api/v1/categories/${name}/products`;
        
    return this.http.get<any>(_url);
  }




}
