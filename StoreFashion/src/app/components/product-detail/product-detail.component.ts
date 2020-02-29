import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  types: Type[] = [
    {viewValue: 'Рубашка'},
    {viewValue: 'Пежама'},
    {viewValue: 'Шорты'},
    {viewValue: 'Кофточки'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

interface Type {
  viewValue: string;
}
