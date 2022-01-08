import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Order } from 'src/app/shared/order.model';
import { OrderService } from 'src/app/shared/order.service';
import { OrderItemsComponent } from '../order-items/order-items.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: [
  ]
})
export class OrderComponent implements OnInit {
  isValid: boolean = true;
  formData!: Order;


  constructor(public service: OrderService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    form?.resetForm();
    this.service.formData = {
      OrderID: 0,
      OrderNo: Math.floor(100000 + Math.random() * 900000).toString(),
      CustomerID: 0,
      PMethod: '',
      GTotal: 0
    }
    this.service.orderItems = [];
  }
  AddOrEditOrderItem(orderItemIndex: any, OrderID: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data = { orderItemIndex, OrderID }
    this.dialog.open(OrderItemsComponent, dialogConfig).afterClosed().subscribe(res => {
      this.updateGrandTotal();
    })
  }

  onDeleteOrderItem(orderItemID: number, i: number) {
    this.service.orderItems.splice(i, 1);
    this.updateGrandTotal()
  }

  ///
  updateGrandTotal() {
    this.service.formData.GTotal = this.service.orderItems.reduce((prev, curr) => {
      return prev + curr.Total
    }, 0)
    this.service.formData.GTotal = parseFloat(this.service.formData.GTotal.toFixed(2))
  }

  validateForm() {
    this.isValid = true;
    if (this.service.orderItems.length == 0) {
      this.isValid = false
    }
    return this.isValid
  }

  onSubmit(form: NgForm) {
    console.log('SUBMIT');
    if (this.validateForm()) {
      this.service.saveOrUpdateOrder().subscribe(res => {
        console.log(res);
        this.resetForm();
      })
    }
  }
}
