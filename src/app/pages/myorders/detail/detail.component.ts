import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay, Subscription } from 'rxjs';
import { Order } from 'src/app/shared/order.model';
import { OrderService } from 'src/app/shared/order.service';
import { MyOrder } from '../myorders.model';
import { MyOrderService } from '../myorders.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']

})
export class DetailComponent implements OnInit, OnDestroy {
  myOrder = new MyOrder();
  id: any;
  data: any;
  paramSubscription: Subscription;
  constructor(private myOrderService: MyOrderService, private route: ActivatedRoute) { }

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
    this.myOrderService.getDataById(this.id).subscribe(res => {
      this.data = res
      this.myOrder = this.data
    })
  }
  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }

}
