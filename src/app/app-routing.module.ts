import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router'
import { DashboardComponent } from './core/dashboard/dashboard.component'
import { LayoutComponent } from './core/layout/layout.component'
import { AboutComponent } from './pages/about/about.component'
import { AuthGuard } from './pages/auth.guard'
import { LoginComponent } from './pages/login/login.component'
import { OrderComponent } from './pages/orders/order/order.component'
import { OrdersComponent } from './pages/orders/orders.component'
import { RegisterComponent } from './pages/register/register.component'


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'order' },
      { path: 'orders', component: OrdersComponent },
      {
        path: 'order', children: [
          { path: '', component: OrderComponent },
          { path: 'edit/:id', component: OrderComponent }
        ]
      },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'about', component: AboutComponent },
      {
        path: 'users',
        loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'festivals',
        loadChildren: () => import('./pages/festival/festival.module').then(m => m.FestivalModule)
      },

      {
        path: 'artiesten',
        loadChildren: () => import('./pages/artiest/artiest.module').then(m => m.ArtiestModule),

      },
      {
        path: 'myorders',
        loadChildren: () => import('./pages/myorders/myorders.module').then(m => m.MyOrderModule),

      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
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
