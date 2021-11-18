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

  users$: Observable<User[]>;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    console.log('UserList geladen');

    this.users$ = this.userService.getAll();
  }

}
