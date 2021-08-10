import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({

  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  
  
  products:any="";


  page: number = 1;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { 
   

  }

  ngOnInit(): void {
    this.activatedRoute.params
    .subscribe(({id})=>{
      if(id === 'suplementos'){
        this.products =[
          {
            id: '2312343434',
            title: "Producto 1",
            img: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/river-island-tienda-espan-a-1502873334.jpg?crop=0.8xw:1xh;center,top&resize=480:*",
            price: "999",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
          },{
            id: '2312343435',
            title: "Producto 2",
            img: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/river-island-tienda-espan-a-1502873334.jpg?crop=0.8xw:1xh;center,top&resize=480:*",
            price: "999",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
          }
        ]
      }else if(id === 'medicamentos'){
        this.products =[
          {
            id: '312343435',
            title: "Producto 3",
            img: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/river-island-tienda-espan-a-1502873334.jpg?crop=0.8xw:1xh;center,top&resize=480:*",
            price: "999",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
          },{
            id: '312343439',
            title: "Producto 4",
            img: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/river-island-tienda-espan-a-1502873334.jpg?crop=0.8xw:1xh;center,top&resize=480:*",
            price: "999",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
          }
        ]
      }
    });
  

  }

  
}
