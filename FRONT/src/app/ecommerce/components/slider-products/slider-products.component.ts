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
            id: '2312343435',
            title: "Cubre Calzado",
            img: "../../../../../../assets/img/medicobotas.jpg",
            price: "88",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
          },
          {
            id: '2312343434',
            title: "Receptor de Orina",
            img: "../../../../../../assets/img/ORIMENS.jpg",
            price: "189",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
          },{
            id: '2312343435',
            title: "Orinal Urinal Femenino",
            img: "../../../../../../assets/img/orinal.jpg",
            price: "80",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
          },
          {
            id: '2312343434',
            title: "Cubre Calzado",
            img: "../../../../../../assets/img/botafarmacia.jpg",
            price: "88",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
          }
        ]
  


  constructor() { }

  ngOnInit(): void {

  }


  
}
