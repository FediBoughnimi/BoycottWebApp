import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategorieComponent } from './clients/categorie/categorie.component';
import { HomeComponent } from './clients/home/home.component';
import { LoginComponent } from './admin/login/login.component';
import { ProductComponent } from './clients/product/product.component';
import { ModalComponent } from './clients/modal/modal.component';
import { SomethingMissingComponent } from './clients/something-missing/something-missing.component';
import { SearchAllComponent } from './clients/search-all/search-all.component';
import { ScanComponent } from './clients/scan/scan.component';
import { NavBarComponent } from './admin/nav-bar/nav-bar.component';
import { SideBarComponent } from './admin/side-bar/side-bar.component';
import { DashbordComponent } from './admin/dashbord/dashbord.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { ProductListComponent } from './admin/product-list/product-list.component';
import { AddCategorieComponent } from './admin/add-categorie/add-categorie.component';
import { ReviewComponent } from './admin/review/review.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { ContactComponent } from './clients/contact-form/contact-form.component';
import {ContactMessagesComponent} from './admin/contact/contact.component';
import { ChatbotComponent } from './clients/chatbot/chatbot.component';
import { UserHomeComponent } from './clients/user-home/user-home.component';
import { authGuard } from './guard/auth.guard.guard';
import { roleGuardGuard } from './guard/role-guard.guard';
const routes: Routes = [
  {path:'user',component:UserHomeComponent ,
  canActivate: [authGuard]},
  {path:'user/categorie',component:CategorieComponent ,
  canActivate: [authGuard]},
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path: 'user/products/:categoryId', component: ProductComponent  ,
  canActivate: [authGuard]},
  {path:'user/something-missing',component:SomethingMissingComponent ,
  canActivate: [authGuard]},
  {path:'user/searchAll',component:SearchAllComponent ,
  canActivate: [authGuard]},
  {path:'user/scan',component:ScanComponent ,
  canActivate: [authGuard]},
  {path:'admin/navbar',component:NavBarComponent,canActivate: [authGuard, roleGuardGuard]},
  {path:'admin/sidebar',component:SideBarComponent,canActivate: [authGuard, roleGuardGuard]},
  {path:'admin',component:DashbordComponent,canActivate: [authGuard, roleGuardGuard]},
  {path:'admin/products/add',component:AddProductComponent,canActivate: [authGuard, roleGuardGuard]},
  {path:'admin/products/list',component:ProductListComponent,canActivate: [authGuard, roleGuardGuard]},
  {path:'admin/categories/add',component:AddCategorieComponent,canActivate: [authGuard, roleGuardGuard]},
  {path:'admin/categories/list',component:CategoriesComponent,canActivate: [authGuard, roleGuardGuard]},
  {path:'admin/reviews',component:ReviewComponent,canActivate: [authGuard, roleGuardGuard]},
  {path:'contact-form',component:ContactComponent},
  {path:'admin/contact',component:ContactMessagesComponent,canActivate: [authGuard, roleGuardGuard]},
  {path:'chatbot',component:ChatbotComponent },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
