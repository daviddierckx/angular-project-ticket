import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth.service';
import { UserService } from '../user/user.service';
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
  constructor(private _auth: AuthService, toastr: ToastrService, private authService: AuthService, private userService: UserService, private _router: Router) { }
  data: any = {
    name: this.registerUserData.firstName + " " + this.registerUserData.lastName,
    email: this.registerUserData.email,
    password: this.registerUserData.password
  }

  form = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  })
  ngOnInit(): void {
  }
  registerUser() {
    if (this.ValidateEmail(this.registerUserData.emai)) {

      if (this.validateForm(this.registerUserData)) {
        this.form.value.name = this.registerUserData.firstName + " " + this.registerUserData.lastName
        this.form.value.email = this.registerUserData.email,
          this.form.value.password = this.registerUserData.password
        this.userService.insertData(this.form.value)
        console.log(this.form.value);
        this.authService.registerUser(this.registerUserData).subscribe(
          res => {
            console.log(res)
            localStorage.setItem('token', res.token)
            this.userService.insertData(this.form.value).subscribe(res => {
              this.data = res
            })

            this._router.navigate(['/dashboard'])

          },
          err => {
            console.log(err)
          }

        )
      }
      this.userService.insertData(this.form.value)

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
