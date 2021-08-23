import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {Categories} from '../interfaces/categoriesMenu.interface';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private url: string = 'http://localhost:3000/';
  
  constructor(private http: HttpClient) { }

  getcategories(): Observable<Categories[]>{
    const _url = `${this.url}fegui_sajusa/api/v1/categories`;

    return this.http.get<Categories[]>(_url);
  }


}
