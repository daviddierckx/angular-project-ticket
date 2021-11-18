import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import * as fromComponents from "."

const routes: Routes = [
  { path: '', pathMatch: 'full', component: fromComponents.ListComponent },
  { path: ':id', pathMatch: 'full', component: fromComponents.DetailComponent }
]

@NgModule({
  declarations: [...fromComponents.components
    // fromComponents.DetailComponent,
    // fromComponents.ListComponent,
    // fromComponents.EditComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class UserModule { }
