import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import * as fromComponents from "."
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: fromComponents.ListComponent },
  { path: ':id', pathMatch: 'full', component: fromComponents.DetailComponent },
  { path: "edit/:id", pathMatch: 'full', component: fromComponents.EditComponent }
]

@NgModule({
  declarations: [...fromComponents.components
    // fromComponents.DetailComponent,
    // fromComponents.ListComponent,
    // fromComponents.EditComponent
  ],
  imports: [
    CommonModule, FormsModule, RouterModule.forChild(routes)
  ]
})
export class UserModule { }
