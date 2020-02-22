import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

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
