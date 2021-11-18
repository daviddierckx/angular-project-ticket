import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //komt normaal uit database

  users: User[] = [
    {
      id: 0,
      firstName: "Jan",
      lastName: "Jansen",
      emailAdress: "j.jansen@server.nl"
    },
    {
      id: 1,
      firstName: "Kees",
      lastName: "Va Dijk",
      emailAdress: "k.vandijk@server.nl"
    },

  ]
  constructor() { }

  getAll(): Observable<User[]> {
    return of(this.users).pipe(delay(1500));
  }
  getById(id: number): User {
    const result = this.users.filter(item => item.id === id)

    return result[0];
  }
}
