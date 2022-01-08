import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { delay, Subscription } from 'rxjs';
import { Order } from 'src/app/shared/order.model';
import { OrderService } from 'src/app/shared/order.service';
import { MyOrder } from '../myorders.model';
import { MyOrderService } from '../myorders.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styles: [
  ]
})
export class EditComponent implements OnInit {

  order = new MyOrder();
  id: any;
  data: any;
  paramSubscription: Subscription;


  subscriptionOptions: Subscription;
  subscriptionParams: Subscription;
  constructor(private router: Router, private route: ActivatedRoute, private orderService: MyOrderService, private toastr: ToastrService) { }

  form = new FormGroup({

    OrderNo: new FormControl(''),
    PMethod: new FormControl(''),
    GTotal: new FormControl(''),
    Festival: new FormControl(''),
    Quantity: new FormControl(''),
    isGift: new FormControl(''),
  })

  ngOnInit(): void {
    this.paramSubscription = this.route.paramMap
      .pipe(delay(100))
      .subscribe((params) => {
      })

    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.getData();
  }

  getData() {
    this.orderService.getDataById(this.id).subscribe(res => {
      this.data = res
      this.order = this.data
      this.form = new FormGroup({

        OrderNo: new FormControl(this.order.OrderNo),
        PMethod: new FormControl(this.order.PMethod),
        GTotal: new FormControl(this.order.GTotal),
        Festival: new FormControl(this.order.Festival),
        Quantity: new FormControl(this.order.Quantity),
        isGift: new FormControl(this.order.isGift),
      })
    })
  }
  updateData() {
    console.log('clicked');
    this.orderService.updateOrder(this.id, this.form.value).subscribe(res => {
      this.data = res
      this.toastr.success(JSON.stringify(this.data.code), JSON.stringify(this.data.message), {
        timeOut: 2000,
        progressBar: true
      })
    })
  }

  /////////////////






}
