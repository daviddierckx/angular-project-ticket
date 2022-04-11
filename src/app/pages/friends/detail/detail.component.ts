import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay, Subscription } from 'rxjs';
import { NeoUser } from '../../user/neo-user';
import { Festival } from '../friends.model';
import { FriendsService } from '../friends.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']

})
export class DetailComponent implements OnInit, OnDestroy {
  user: any;
  id: any;
  data: any;
  paramSubscription: Subscription;
  constructor(private friendsService: FriendsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.paramSubscription = this.route.paramMap
      .pipe(delay(1500))
      .subscribe((params) => {
        this.id = this.route.snapshot.params['id'];
        console.log(this.id);
        // this.ge();
      })


  }

  getData() {
    this.friendsService.getFriends().subscribe(res => {
      this.data = res
      this.user = this.data
    })
  }
  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }
}
