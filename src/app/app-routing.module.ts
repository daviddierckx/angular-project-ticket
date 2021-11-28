import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router'
import { DashboardComponent } from './core/dashboard/dashboard.component'
import { LayoutComponent } from './core/layout/layout.component'
import { AboutComponent } from './pages/about/about.component'


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'about', component: AboutComponent },
      {
        path: 'users',
        loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'festivals',
        loadChildren: () => import('./pages/festival/festival.module').then(m => m.FestivalModule)
      }
    ]
  },
  { path: '**', redirectTo: '/' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
