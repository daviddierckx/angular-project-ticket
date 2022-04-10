import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private _router: Router) { }

  registerUser(data: any) {
    return this.httpClient.post<any>('http://localhost:3002/api/register', data)
  }

  loginUser(user: any) {
    return this.httpClient.post<any>('http://localhost:3002/api/login', user)
  }
  loggedIn() {
    return !!localStorage.getItem('token')
  }
  logoutUser() {
    localStorage.removeItem('token')
    sessionStorage.removeItem('isAdmin')

    this._router.navigate(['/dashboard'])
    window.location.reload();

  }
}
