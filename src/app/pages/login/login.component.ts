import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData: any = {

  }
  constructor(private _auth: AuthService, private authService: AuthService, private _router: Router) { }

  ngOnInit(): void {
  }
  loginUser() {
    this.authService.loginUser(this.loginUserData).subscribe(
      res => {
        console.log(res)
        localStorage.setItem('token', res.token)

        sessionStorage.setItem('userId', res.user._id);
        var data = sessionStorage.getItem('userId');
        console.log(data)

        this._router.navigate(['/dashboard'])
      },
      err => console.log(err)
    )
  }
}
