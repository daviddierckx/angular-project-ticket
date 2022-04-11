import { Component, Input, OnInit } from '@angular/core'
import { AuthService } from 'src/app/pages/auth.service'

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <div class="container">
        <a
          class="navbar-brand"
          routerLink="/"
          [routerLinkActive]="['active']"
          [routerLinkActiveOptions]="{ exact: true }"
          >{{ title }}</a
        >
        <button
          class="navbar-toggler hidden-sm-up"
          type="button"
          (click)="isNavbarCollapsed = !isNavbarCollapsed"
          data-target="#navbarsDefault"
          aria-controls="navbarsDefault"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
        
        </button>
        








        <div [ngbCollapse]="isNavbarCollapsed" class="collapse navbar-collapse" id="navbarsDefault">
          <ul class="navbar-nav mr-auto">
          
            <li class="nav-item">
            <a
              class="nav-link"
              routerLink="order"
              [routerLinkActive]="['active']"
              [routerLinkActiveOptions]="{ exact: true }"
              tabindex="-1"
              >Buy Ticket</a
            >
          </li>
          <li class="nav-item">
          <a
            class="nav-link"
            routerLink="myorders"
            [routerLinkActive]="['active']"
            [routerLinkActiveOptions]="{ exact: true }"
            tabindex="-1"
            >My Orders</a
          >
        </li>
            <li class="nav-item">
            <a
              class="nav-link"
              routerLink="festivals"
              [routerLinkActive]="['active']"
              [routerLinkActiveOptions]="{ exact: true }"
              tabindex="-1"
              >Festivals</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              routerLink="artiesten"
              [routerLinkActive]="['active']"
              [routerLinkActiveOptions]="{ exact: true }"
              tabindex="-1"
              >Artiesten</a
            >
          </li>
            <li class="nav-item" >
              <a *ngIf="isAdmin === 'true'"
                class="nav-link"
                routerLink="users"
                [routerLinkActive]="['active']"
                [routerLinkActiveOptions]="{ exact: true }"
                tabindex="-1"
                >Users</a
              >
            </li>
            <li class="nav-item">
            <a
              class="nav-link"
              routerLink="friends/1"
              [routerLinkActive]="['active']"
              [routerLinkActiveOptions]="{ exact: true }"
              >Friends</a
            >
          </li>
            <li class="nav-item">
              <a
                class="nav-link"
                routerLink="about"
                [routerLinkActive]="['active']"
                [routerLinkActiveOptions]="{ exact: true }"
                >About</a
              >
            </li>
            
          </ul>
          <ul class="navbar-nav">
          <li class="nav-link">
              <a *ngIf="!_authService.loggedIn()"
                class="nav-link"
                routerLink="login"
                [routerLinkActive]="['active']"
                [routerLinkActiveOptions]="{ exact: true }"
                >Login</a
              >
            </li>
            <li class="nav-link">
              <a *ngIf="!_authService.loggedIn()"
                class="nav-link"
                routerLink="register"
                [routerLinkActive]="['active']"
                [routerLinkActiveOptions]="{ exact: true }"
                >Register</a
              >
            </li>
            <li class="nav-link">
            <a *ngIf="_authService.loggedIn()"
              class="nav-link" 
              (click)="_authService.logoutUser()"
              >Logout</a
            >
          </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: [
    '.btn-link { color: rgba(255,255,255,.5); text-decoration: none; }',
    // tslint:disable-next-line: max-line-length
    '.btn-link.focus, .btn-link:focus, .btn-link.hover, .btn-link:hover { color: rgba(255,255,255,.75); text-decoration: none; box-shadow: none; }'
  ]
})
export class NavbarComponent {
  @Input() title: string = ''
  isNavbarCollapsed = true
  isAdmin = sessionStorage.getItem('isAdmin')?.valueOf()
  constructor(public _authService: AuthService) { }
}
