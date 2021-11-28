import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay, Subscription } from 'rxjs';
import { Festival } from '../festival.model';
import { FestivalService } from '../festival.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']

})
export class DetailComponent implements OnInit, OnDestroy {
  festival: Festival;
  paramSubscription: Subscription;
  constructor(private festivalService: FestivalService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.paramSubscription = this.route.paramMap
      .pipe(delay(1500))
      .subscribe((params) => {
        const id = params.get('id');
        this.festival = this.festivalService.getById(Number(id));
      })
  }
  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }
}
