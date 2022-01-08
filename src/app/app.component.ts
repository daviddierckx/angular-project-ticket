import { Component } from '@angular/core'
import { isConstructorDeclaration } from 'typescript'
import { AuthService } from './pages/auth.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private _authService: AuthService) { }
}

