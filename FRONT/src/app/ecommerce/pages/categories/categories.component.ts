import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EcommerceService } from '../../services/ecommerce.service';


@Component({

  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  
  
  products:any="";


  page: number = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _product: EcommerceService
  ) {}

    ngOnInit(): void {
       this.activatedRoute.params.subscribe(({id})=>{ this.listproducts(id); });
      
    }

  listproducts(name: string){
    this._product.getlistproducts(name).subscribe(res =>{ 
      this.products = res;
      console.log(this.products.result[0].name)
    });
  }

  
}
