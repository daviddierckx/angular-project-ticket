import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay, subscribeOn, Subscription } from 'rxjs';
import { NeoUser } from '../neo-user';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  user = new NeoUser();
  id: any;
  data: any;
  paramSubscription: Subscription;
  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.paramSubscription = this.route.paramMap
      .pipe(delay(1500))
      .subscribe((params) => {
        this.id = this.route.snapshot.params['id'];
        console.log(this.id);
        this.getData();
      })


  }

  getData() {
    this.userService.getDataById(this.id).subscribe(res => {
      this.data = res
      this.user = this.data
    })
  }
  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }
}