import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay, Subscription } from 'rxjs';
import { Festival } from '../friends.model';
import { FestivalService } from '../friends.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']

})
export class DetailComponent implements OnInit, OnDestroy {
  festival = new Festival();
  id: any;
  data: any;
  paramSubscription: Subscription;
  constructor(private festivalService: FestivalService, private route: ActivatedRoute) { }

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
    this.festivalService.getDataById(this.id).subscribe(res => {
      this.data = res
      this.festival = this.data
    })
  }
  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }
}
