import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

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

 file: File;

  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL;

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) { }

  ngOnInit(): void {
    	console.log("ngOnInit ");
//     this.startUpload();
  }

  startUpload() {

    // The storage path
    const path = `test/${Date.now()}_${this.file.name}`;
    console.log("path ", path);
    // Reference to storage bucket
    const ref = this.storage.ref(path);

    // The main task
    this.task = this.storage.upload(path, this.file);

    // Progress monitoring
    this.percentage = this.task.percentageChanges();

    this.snapshot   = this.task.snapshotChanges().pipe(
      tap(console.log),
      // The file's download URL
      finalize( async() =>  {
        this.downloadURL = await ref.getDownloadURL().toPromise();

        this.firestore.collection('files').add( { downloadURL: this.downloadURL, path });
      }),
    );
  }

  profileForm = new FormGroup({
    formProductName: new FormControl(''),
    formProductDescription: new FormControl(''),
    formProductPrice: new FormControl(''),
    formProductType: new FormControl(''),
    formProductSell: new FormControl(''),
  });

  files: File[] = [];

	onSelect(event) {
		console.log("dron zone select ", event);
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

    console.log('FORM ', this.profileForm.value.formProductName);

    console.log('select ',  this.profileForm.value.formProductSell);

    this.product = {
      productId: "1234567",
      productName: this.profileForm.value.formProductName,
      productPrice: this.profileForm.value.formProductPrice,
      productType: this.profileForm.value.formProductType,
      productDescription: this.profileForm.value.formProductDescription,
      productInsertdDate: firebase.firestore.FieldValue.serverTimestamp(),
      productSell: this.profileForm.value.formProductSell,
      productPictures: "",
    }

    this.createPolicy(this.product);
  }

  createPolicy(product: Product){
    return this.firestore.collection('Product').add(product);
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
  productPictures: any,
}
