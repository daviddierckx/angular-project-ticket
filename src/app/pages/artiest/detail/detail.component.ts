import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay, Subscription } from 'rxjs';
import { Artiest } from '../artiest.model';
import { ArtiestService } from '../artiest.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']

})
export class DetailComponent implements OnInit, OnDestroy {
  artiest = new Artiest();
  id: any;
  data: any;
  paramSubscription: Subscription;
  constructor(private artiestService: ArtiestService, private route: ActivatedRoute) { }

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
    this.artiestService.getDataById(this.id).subscribe(res => {
      this.data = res
      this.artiest = this.data
    })
  }
  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }
}
