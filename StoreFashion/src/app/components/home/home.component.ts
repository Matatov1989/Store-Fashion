import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Store Fashion';

  product: Product[] = [];

  prod: string[] = [];

  listSortPrice: SortPrice[] = [
    {value: 'steak-0', viewValue: 'по убыванию'},
    {value: 'pizza-1', viewValue: 'по возрастанию'}
  ];

  listSortTop: SortTop[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.getProducts1();
  //            console.log("data  ", this.getProducts());
  }

  getProducts1() {
     this.firestore.collection('Product')
      .snapshotChanges().subscribe(serverItems => {
      //  this.users = [];
        serverItems.forEach(docProduct => {

          let product: any = docProduct.payload.doc.data();

          console.log('Constractor user ', product)

          this.product.push(
          {
            productId: product.productId.value,
            productName: product.productName.value,
            productPrice: product.productPrice.value,
            productType: product.productType.value,
            productDescription: product.productDescription.value,
            productInsertdDate: product.productInsertdDate.value,
            productSell: product.productSell.value,
            productImages: product.productImages.value,
          })

            console.log('Constractor size ', this.product[0].productName);
        });
      });


    }

  getProducts() {
    return this.firestore.collection('Product').valueChanges()
    .subscribe(val =>
//      console.log("val  ", val.length)

      this.prod  = Object.assign([], val)
/*
      this.product.push(
      {
        productId: val.productId.value,
        productName: val.productName.value,
        productPrice: val.productPrice.value,
        productType: val.productType.value,
        productDescription: val.productDescription.value,
        productInsertdDate: val.productInsertdDate.value,
        productSell: val.productSell.value,
        productImages: val.productImages.value,
      })
      */
    );

    console.log("product  ", this.prod.length);
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


interface Product {
  productId: string,
  productName: string,
  productPrice: number,
  productType: string,
  productDescription: string,
  productInsertdDate: any,
  productSell: boolean,
  productImages: Array<string>;
}
