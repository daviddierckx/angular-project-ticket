import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



const routes: Routes = [

  { path: '', pathMatch: 'full', component: ListComponent },
  { path: ':id', pathMatch: 'full', component: DetailComponent },

]
@NgModule({
  declarations: [
    DetailComponent,
    ListComponent,],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(routes), FormsModule
  ]
})
export class FestivalModule { }
