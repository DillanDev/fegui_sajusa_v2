import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/pages/dashboard/dashboard.component';
import { LoginComponent } from './admin/pages/login/login.component';
import { AccountComponent } from './ecommerce/pages/account/account.component';
import { ArticleComponent } from './ecommerce/pages/article/article.component';
import { BlogComponent } from './ecommerce/pages/blog/blog.component';
import { CartComponent } from './ecommerce/pages/cart/cart.component';
import { CategoriesComponent } from './ecommerce/pages/categories/categories.component';
import { CheckoutComponent } from './ecommerce/pages/checkout/checkout.component';
import { ContactComponent } from './ecommerce/pages/contact/contact.component';
import { HomeComponent } from './ecommerce/pages/home/home.component';
import { LoginRegisterComponent } from './ecommerce/pages/login-register/login-register.component';
import { NotFoundComponent } from './ecommerce/pages/not-found/not-found.component';
import { ProductsComponent } from './ecommerce/pages/product/product.component';


const routes: Routes = [
  
    
  {path:'', redirectTo: 'inicio',pathMatch: 'full'},
  {path:'inicio',component: HomeComponent},
  {path:'carrito',component: CartComponent},
  {path:'blog',component: BlogComponent},
  {path:'articulo',component: ArticleComponent},
  {path:'checkout',component: CheckoutComponent},
  {path:'cuenta',component:AccountComponent},
  {path:'cuenta/login',component: LoginRegisterComponent },
  {path:'contacto',component: ContactComponent},
  {path:'categorias/:id',component: CategoriesComponent},
  {path:'producto/:id',component: ProductsComponent },
  {path:'admin/login', component: LoginComponent},
  {path:'admin/dashboard', component: DashboardComponent},
  {path:'admin', redirectTo: 'admin/login',pathMatch: 'full'},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [

    RouterModule.forRoot(routes)
    

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
