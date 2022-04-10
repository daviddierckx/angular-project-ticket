import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isValid: Boolean = true;
  isUserValid: Boolean = true;

  loginUserData: any = {
    email: '',
    password: ''
  }
  constructor(private _auth: AuthService, private authService: AuthService, private _router: Router) { }

  ngOnInit(): void {
  }
  loginUser() {
    if (this.validateForm(this.loginUserData)) {
      this.authService.loginUser(this.loginUserData).subscribe(
        res => {
          console.log(res)
          localStorage.setItem('token', res.token)

          sessionStorage.setItem('userId', res.user._id);
          sessionStorage.setItem('isAdmin', res.user.isAdmin)
          var data = sessionStorage.getItem('userId');
          console.log(data)

          this._router.navigate(['/dashboard'])
          window.location.reload();

        },
        err => {
          console.log(err)
          this.isUserValid = false;
        }
      )
    }
    this._router.navigate(['/dashboard'])

  }
  validateForm(formData: any) {
    this.isValid = true;
    if (formData.email == '') {
      this.isValid = false;
    } else if (formData.password == '') {
      this.isValid = false;
    }
    return this.isValid;

  }
}
