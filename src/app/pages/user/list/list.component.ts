import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  user: User = {
    id: this.userService.getUserLength(),
    firstName: '',
    lastName: '',
    emailAdress: '',
  }
  submitted = false;

  users$: Observable<User[]>;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    console.log('UserList geladen');

    this.users$ = this.userService.getAll();
  }
  saveUser(): void {
    const data = {
      id: this.user.id,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      emailAdress: this.user.emailAdress
    };

    this.userService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }
  currentUser: User = this.user;
  newUser(): void {
    this.submitted = false;
    this.user = {
      id: this.userService.getUserLength(),
      firstName: '',
      lastName: '',
      emailAdress: '',
    };
  }

  onDelete(user: User) {
    this.userService.delete(user).subscribe(() => {
      this.userService.users = this.userService.users.filter((t) => t.id !== user.id)
    })
  }

}

