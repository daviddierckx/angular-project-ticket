import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay, subscribeOn, Subscription } from 'rxjs';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  user: User;
  paramSubscription: Subscription;



  constructor(private userService: UserService, private route: ActivatedRoute) { }


  ngOnInit(): void {

    this.paramSubscription = this.route.paramMap
      .pipe(delay(1500))
      .subscribe((params) => {
        const id = params.get('id');
        this.user = this.userService.getById(Number(id));
      })

  }
  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }
}
