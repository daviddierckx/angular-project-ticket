import { Injectable } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';
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
  getUserLength(): number {
    return this.users.length;
  }
  getAll(): Observable<User[]> {
    return of(this.users).pipe(delay(1500));
  }
  getById(id: number): User {
    const result = this.users.filter(item => item.id === id)

    return result[0];
  }
  delete(user: User): Observable<User[]> {
    return of(this.users.splice(user.id, 1))

  }
  create(data: User): Observable<any> {
    return of(this.users).pipe(tap(userList => {
      userList.push(data)
    }));
  }
  onUpdate(user: User) {
    let oldUser = this.users.find(x => x.id === user.id)
    console.log("data " + oldUser!.lastName);
    console.log("data " + user!.lastName);

    oldUser!.id = user.id;
    oldUser!.firstName = user.firstName;
    oldUser!.lastName = user.lastName;
    oldUser!.emailAdress = user.emailAdress;

  }
}
