import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isValid: Boolean = true;
  isvalidEmail: Boolean = true;
  private currentUserSubject = new BehaviorSubject<any>(null); // initializing with no user object since logged out

  registerUserData: any = {
    firstName: "",
    lastName: "",
    birthDate: new Date(),
    email: '',
    password: "",
    isAdmin: false
  }
  constructor(private _auth: AuthService, private authService: AuthService, private _router: Router) { }

  ngOnInit(): void {
  }
  registerUser() {
    if (this.ValidateEmail(this.registerUserData.emai)) {


      if (this.validateForm(this.registerUserData)) {
        this.authService.registerUser(this.registerUserData).subscribe(
          res => {
            console.log(res)
            localStorage.setItem('token', res.token)

            this._router.navigate(['/dashboard'])
            return
          },
          err => {
            console.log(err)
          }

        )
      }
    }
  }
  validateForm(formData: any) {
    this.isValid = true;
    if (formData.firstName == '') {
      this.isValid = false;
    } else if (formData.lastName == '') {
      this.isValid = false;
    } else if (formData.birthDate == '') {
      this.isValid = false;
    } else if (formData.email == '') {
      this.isValid = false;
    } else if (formData.password == '') {
      this.isValid = false;
    }
    return this.isValid;

  }
  ValidateEmail(mail: any) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.registerUserData.email)) {
      return this.isvalidEmail = true
    }

    return this.isvalidEmail = false
  }
}
