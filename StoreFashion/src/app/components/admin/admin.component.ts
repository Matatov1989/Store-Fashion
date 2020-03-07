import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

import * as firebase from 'firebase';

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

  product: Product;
  links: any[] = [];

  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL;

  profileForm = new FormGroup({
    formProductName: new FormControl(''),
    formProductDescription: new FormControl(''),
    formProductPrice: new FormControl(''),
    formProductType: new FormControl(''),
    formProductSell: new FormControl(''),
  });

  files: File[] = [];

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) { }

  ngOnInit(): void {
    	console.log("ngOnInit ");
  }

  startUpload() {

    for (let i = 0; i < this.files.length; i++) {

      // The storage path
      const path = `test/${Date.now()}_123`;
      // Reference to storage bucket
      const ref = this.storage.ref(path);

      this.storage.upload(path, this.files[i])
      .snapshotChanges().pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe((url) => {
            console.log("url  ", url);
      //      this.firestore.collection('files').add( { downloadURL: url, path });
            this.links.push(url);

          })
        })
      ).subscribe();
    }
  }

	onSelect(event) {
		console.log("dron zone select EVENT ", event.addedFiles);

		this.files.push(...event.addedFiles);

    this.startUpload();
	}

	onRemove(event) {
		console.log("drop zone remove ", event);
		this.files.splice(this.files.indexOf(event), 1);
	}

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);

    this.product = {
      productId: "1234567",
      productName: this.profileForm.value.formProductName,
      productPrice: this.profileForm.value.formProductPrice,
      productType: this.profileForm.value.formProductType,
      productDescription: this.profileForm.value.formProductDescription,
      productInsertdDate: firebase.firestore.FieldValue.serverTimestamp(),
      productSell: this.profileForm.value.formProductSell,
      productImages: this.links,
    }
    console.log('this.product ', this.product);
    this.createPolicy(this.product);
  }

  createPolicy(product: Product){
    return this.firestore.collection('Product').add(this.product);
  }
/*
  updatePolicy(product: Product){
    delete product.productId;
    this.firestore.doc('Product/' + product.productId).update(product);
  }

  getPolicies() {
    return this.firestore.collection('Product').snapshotChanges();
  }

  deletePolicy(productId: string){
    this.firestore.doc('Product/' + productId).delete();
  }
*/
}

interface Type {
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
