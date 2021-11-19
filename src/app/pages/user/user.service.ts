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
      firstName: "Peter",
      lastName: "Jan",
      emailAdress: "p.jan@server.nl",
      birthDate: new Date('1988-03-21'),
      isAdmin: false


    },
    {
      id: 1,
      firstName: "Hendrik",
      lastName: "Verhees",
      emailAdress: "h.verhees@server.nl",
      birthDate: new Date('1989-08-11'),
      isAdmin: false
    },
    {
      id: 2,
      firstName: "David",
      lastName: "Bossche",
      emailAdress: "d.bossche@server.nl",
      birthDate: new Date('1994-04-01'),
      isAdmin: false
    },
    {
      id: 3,
      firstName: "Bianca",
      lastName: "Roos",
      emailAdress: "b.roos@server.nl",
      birthDate: new Date('2001-03-13'),
      isAdmin: false
    },
    {
      id: 4,
      firstName: "David",
      lastName: "Dierckx",
      emailAdress: "d.dierckx@server.nl",
      birthDate: new Date('1999-06-01'),
      isAdmin: false
    },

  ]
  constructor() { }
  getUserLength(): number {
    return this.users.length;
  }
  getAll(): Observable<User[]> {
    return of(this.users).pipe(delay(100));
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
    oldUser!.birthDate = user.birthDate;
    oldUser!.isAdmin = user.isAdmin;

  }
}
