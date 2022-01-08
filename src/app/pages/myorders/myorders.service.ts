import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';
import { Order } from 'src/app/shared/order.model';
import { MyOrder } from './myorders.model';

@Injectable({
  providedIn: 'root'
})
export class MyOrderService {
  order: MyOrder[]
  constructor(private httpClient: HttpClient) { }

  getAllOrder() {
    return this.httpClient.get('http://localhost:3000/api/order')
  }
  insertData(data: any) {
    return this.httpClient.post('http://localhost:3000/api/order', data)
  }

  getDataById(id: any) {
    return this.httpClient.get('http://localhost:3000/api/order/' + id)

  }

  updateOrder(id: any, data: any) {
    return this.httpClient.put('http://localhost:3000/api/order/edit/' + id, data)
  }
  DeleteDataById(id: any) {
    return this.httpClient.delete('http://localhost:3000/api/order/' + id)

  }


}
