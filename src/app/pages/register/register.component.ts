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
  private currentUserSubject = new BehaviorSubject<any>(null); // initializing with no user object since logged out

  registerUserData: any = {

  }
  constructor(private _auth: AuthService, private authService: AuthService, private _router: Router) { }

  ngOnInit(): void {
  }
  registerUser() {
    this.authService.registerUser(this.registerUserData).subscribe(
      res => {
        console.log(res)
        localStorage.setItem('token', res.token)

        this._router.navigate(['/dashboard'])
      },
      err => console.log(err)
    )
  }
}
