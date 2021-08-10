import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  //Ultimo articulo
  articles = [
    {
      title:  'Contrary to popular belief',
      content: 'Contrary to popular belief, Lorem Ipsum is not simply random text. '
    
    
    },
    {
      title: 'Contrary to popular belief',
      content: 'Contrary to popular belief, Lorem Ipsum is not simply random text.'
    
    
    },
    {
      title:  'Contrary to popular belief',
      content: 'Contrary to popular belief, Lorem Ipsum is not simply random text. '
    
    
    },
    {
      title: 'Contrary to popular belief',
      content: 'Contrary to popular belief, Lorem Ipsum is not simply random text.'
    
    
    },
    {
      title:  'Contrary to popular belief',
      content: 'Contrary to popular belief, Lorem Ipsum is not simply random text. '
    
    
    },
    {
      title: 'Contrary to popular belief',
      content: 'Contrary to popular belief, Lorem Ipsum is not simply random text.'
    
    
    },
    {
      title:  'Contrary to popular belief',
      content: 'Contrary to popular belief, Lorem Ipsum is not simply random text. '
    
    
    },
    {
      title: 'Contrary to popular belief',
      content: 'Contrary to popular belief, Lorem Ipsum is not simply random text.'
    
    
    },
    {
      title:  'Contrary to popular belief',
      content: 'Contrary to popular belief, Lorem Ipsum is not simply random text. '
    
    
    },
    {
      title: 'Contrary to popular belief',
      content: 'Contrary to popular belief, Lorem Ipsum is not simply random text.'
    
    
    }
  ]


  page:number = 1;

  constructor() { }

  ngOnInit(): void {
  }

}
