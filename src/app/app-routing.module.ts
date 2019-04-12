import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';
import { ClientComponent } from './client/client.component';
import { AddAnnoucementComponent } from './client/add-annoucement/add-annoucement.component';

const routes: Routes = [
  {path: '', redirectTo:'/client', pathMatch: 'full'},
  {path: 'admin', component:AdminComponent},
  {path: 'client', component:ClientComponent},
  {path: 'client/createAnnoucement', component:AddAnnoucementComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
