import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



const routes: Routes = [

  { path: '', pathMatch: 'full', component: ListComponent },
  // { path: ':id', pathMatch: 'full', component: DetailComponent },
  { path: "edit/:id", pathMatch: 'full', component: EditComponent }

]
@NgModule({
  declarations: [
    // DetailComponent,
    ListComponent,
    EditComponent
  ],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(routes)
  ]
})
export class MyOrderModule { }
