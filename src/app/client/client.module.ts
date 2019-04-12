import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client.component';
import { AddAnnoucementComponent } from './add-annoucement/add-annoucement.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule} from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ClientComponent, AddAnnoucementComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ClientComponent,
    AddAnnoucementComponent
  ]
})
export class ClientModule { }
