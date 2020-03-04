import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Store Fashion';

  listSortPrice: SortPrice[] = [
    {value: 'steak-0', viewValue: 'по убыванию'},
    {value: 'pizza-1', viewValue: 'по возрастанию'}
  ];

  listSortTop: SortTop[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

interface SortPrice {
  value: string;
  viewValue: string;
}

interface SortTop {
  value: string;
  viewValue: string;
}
