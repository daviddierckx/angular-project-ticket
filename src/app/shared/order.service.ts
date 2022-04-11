import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { OrderItem } from './order-item.model';
import { Order } from './order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  formData!: Order;
  orderItems!: OrderItem[];
  form: FormGroup;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }
  saveOrUpdateOrder() {
    var body = {
      OrderNo: this.formData.OrderNo,
      PMethod: this.formData.PMethod,
      GTotal: this.formData.GTotal,
      Festival: this.orderItems[0].ItemName,
      Quantity: this.orderItems[0].Quantity,
      isGift: false
    }
    return this.http.post("https://avansfestivalapi.herokuapp.com/api/order", body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })


  }


}
