import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog"
import { Item } from 'src/app/shared/item.model';
import { ItemService } from 'src/app/shared/item.service';
import { OrderItem } from 'src/app/shared/order-item.model';
import { OrderService } from 'src/app/shared/order.service';
import { Festival } from '../../festival/festival.model';
import { FestivalService } from '../../festival/festival.service';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styles: [
  ]
})
export class OrderItemsComponent implements OnInit {
  formData!: OrderItem;
  itemList!: Festival[];
  isValid: boolean = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<OrderItemsComponent>, private ItemService: ItemService, private orderService: OrderService, private festivalService: FestivalService
  ) { }

  ngOnInit(): void {
    this.festivalService.getAllFestivals().toPromise().then(res => this.itemList = res as Festival[])
    if (this.data.orderItemIndex == null)
      this.formData = {
        OrderItemID: 0,
        OrderID: this.data.OrderID,
        ItemID: 0,
        ItemName: '',
        Price: 0,
        Quantity: 0,
        Total: 0
      }
    else {
      this.formData = Object.assign({}, this.orderService.orderItems[this.data.orderItemIndex])
    }
  }
  updatePrice(ctrl: any) {
    if (ctrl.selectedIndex == 0) {
      this.formData.Price == 0;
      this.formData.ItemName = ''
    } else {
      this.formData.Price = this.itemList[ctrl.selectedIndex - 1].Price;
      this.formData.ItemName = this.itemList[ctrl.selectedIndex - 1].Naam

    }
    this.updateTotal()
  }
  updateTotal() {
    this.formData.Total = parseFloat((this.formData.Quantity * this.formData.Price).toFixed(2))
  }

  onSubmit(form: NgForm) {
    if (this.validateForm(form.value)) {
      if (this.data.orderItemIndex == null) {
        this.orderService.orderItems.push(form.value);
      } else {
        this.orderService.orderItems[this.data.orderItemIndex] = form.value;
      }
      this.dialogRef.close();
    }
  }

  validateForm(formData: OrderItem) {
    this.isValid = true;
    if (formData.ItemName == '') {
      this.isValid = false;
    } else if (formData.Quantity == 0) {
      this.isValid = false;
    }
    return this.isValid;

  }
}
