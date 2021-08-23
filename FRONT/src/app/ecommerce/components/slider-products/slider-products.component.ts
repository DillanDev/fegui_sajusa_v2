import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-slider-products',
  templateUrl: './slider-products.component.html',
  styleUrls: ['./slider-products.component.css']
})
export class SliderProductsComponent implements OnInit {




  slideConfig = {
    slidesToShow: 4, 
    slidesToScroll: 1,
    responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3
      }
    },
    {
      breakpoint: 999,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 1
      }
    }
  ]
  };  


 

 
  products =[
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
          },
          {
            id: '2312343434',
            title: "Producto 3",
            img: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/river-island-tienda-espan-a-1502873334.jpg?crop=0.8xw:1xh;center,top&resize=480:*",
            price: "999",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
          },{
            id: '2312343435',
            title: "Producto 4",
            img: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/river-island-tienda-espan-a-1502873334.jpg?crop=0.8xw:1xh;center,top&resize=480:*",
            price: "999",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
          },
          {
            id: '2312343434',
            title: "Producto 3",
            img: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/river-island-tienda-espan-a-1502873334.jpg?crop=0.8xw:1xh;center,top&resize=480:*",
            price: "999",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
          },{
            id: '2312343435',
            title: "Producto 4",
            img: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/river-island-tienda-espan-a-1502873334.jpg?crop=0.8xw:1xh;center,top&resize=480:*",
            price: "999",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
          }
        ]
  


  constructor() { }

  ngOnInit(): void {

  }


  
}
