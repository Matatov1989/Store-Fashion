import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ItemComponent } from './components/item/item.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { AdminComponent } from './components/admin/admin.component';

const appRoutes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'item', component:ItemComponent},
  {path: 'purchase', component:PurchaseComponent},
  {path: 'privacy', component:PrivacyComponent},
  {path: 'admin', component:AdminComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ItemComponent,
    PrivacyComponent,
    PurchaseComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
