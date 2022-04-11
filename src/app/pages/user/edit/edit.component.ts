import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { delay, Subscription } from 'rxjs';
import { NeoUser } from '../neo-user';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styles: [
  ]
})
export class EditComponent implements OnInit {
  user = new NeoUser();
  id: any;
  data: any;
  paramSubscription: Subscription;


  subscriptionOptions: Subscription;
  subscriptionParams: Subscription;
  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private toastr: ToastrService) { }

  form = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
  })

  ngOnInit(): void {
    this.paramSubscription = this.route.paramMap
      .pipe(delay(100))
      .subscribe((params) => {
        const id = params.get('id');
        this.user = this.userService.getById(Number(id));
      })

    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.getData();
  }

  getData() {
    this.userService.getDataById(this.id).subscribe(res => {
      this.data = res
      this.user = this.data
      this.form = new FormGroup({
        name: new FormControl(this.user.name),
        email: new FormControl(this.user.email)
      })
    })
  }
  updateData() {
    this.userService.updateData(this.id, this.form.value).subscribe(res => {
      this.data = res
      this.toastr.success(JSON.stringify(this.data.code), JSON.stringify(this.data.message), {
        timeOut: 2000,
        progressBar: true
      })
    })
  }
}
