import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { RouterModule, Routes } from '@angular/router'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { DashboardComponent } from './core/dashboard/dashboard.component'
import { NavbarComponent } from './core/navbar/navbar.component'
import { LayoutComponent } from './core/layout/layout.component'
import { FooterComponent } from './core/footer/footer.component'
import { AboutComponent } from './pages/about/about.component'
import { UsecaseComponent } from './pages/about/usecases/usecase.component';
import { MatDialogModule } from '@angular/material/dialog'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { User } from './pages/user/user.model'
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthService } from './pages/auth.service'
import { AuthGuard } from './pages/auth.guard';
import { OrdersComponent } from './pages/orders/orders.component';
import { OrderComponent } from './pages/orders/order/order.component';
import { OrderItemsComponent } from './pages/orders/order-items/order-items.component'


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LayoutComponent,
    DashboardComponent,
    FooterComponent,
    AboutComponent,
    UsecaseComponent,
    RegisterComponent,
    LoginComponent,
    OrdersComponent,
    OrderComponent,
    OrderItemsComponent,

  ],
  imports: [BrowserModule, HttpClientModule, FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule, NgbModule, AppRoutingModule],
  entryComponents: [OrderItemsComponent],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
