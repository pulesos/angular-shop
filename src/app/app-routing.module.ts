import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './components/base/base.component';
import { BasketComponent } from './components/basket/basket.component';
import { LoginComponent } from './components/login/login.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsComponent } from './components/products/products.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ProductResolver } from './services/product.resolver';
import {canActivate, redirectUnauthorizedTo, redirectLoggedInTo} from '@angular/fire/auth-guard'
import { ProfileComponent } from './components/profile/profile.component';

const redirectToLogin = () => redirectUnauthorizedTo(['login'])
const redirectToHome = () => redirectLoggedInTo(['home'])


const routes: Routes = [
  {path: '', component: BaseComponent, ...canActivate(redirectToLogin)},
  {path: 'products', component: ProductsComponent, ...canActivate(redirectToLogin)},
  {path: 'product/:id', component: ProductDetailsComponent, resolve: {data: ProductResolver}},
  {path: 'basket', component: BasketComponent, ...canActivate(redirectToLogin)},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'login', component: LoginComponent, ...canActivate(redirectToHome)},
  {path: 'profile', component: ProfileComponent, ...canActivate(redirectToLogin)},

  {path: '**', redirectTo: '', component: BaseComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
