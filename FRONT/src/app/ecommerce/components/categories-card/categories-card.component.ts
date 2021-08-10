import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories-card',
  templateUrl: './categories-card.component.html',
  styleUrls: ['./categories-card.component.css']
})
export class CategoriesCardComponent implements OnInit {

  categories = [
    {
      content: 'suplementos'
    },
    {
      content: 'medicamentos'
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
