import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, Subscription } from 'rxjs';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styles: [
  ]
})
export class EditComponent implements OnInit {
  id: number;
  paramSubscription: Subscription;

  user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    emailAdress: '',
    birthDate: new Date(),
    isAdmin: false
  }
  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.paramSubscription = this.route.paramMap
      .pipe(delay(100))
      .subscribe((params) => {
        const id = params.get('id');
        this.user = this.userService.getById(Number(id));
      })
  }

  onSubmit(form: NgForm): void {
    let data: User = {
      id: form.value.id,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      emailAdress: form.value.emailAdress,
      birthDate: form.value.birthDate,
      isAdmin: form.value.isAdmin
    };
    console.log();
    this.userService.onUpdate(data)
    this.router.navigateByUrl('users')
  }
}
