import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';
import { Festival } from './friends.model';

@Injectable({
  providedIn: 'root'
})
export class FestivalService {


  constructor(private httpClient: HttpClient) { }

  getAllFestivals() {
    return this.httpClient.get('http://localhost:3000/api/festival')
  }
  insertData(data: any) {
    return this.httpClient.post('http://localhost:3000/api/festival', data)
  }

  getDataById(id: any) {
    return this.httpClient.get('http://localhost:3000/api/festival/' + id)

  }

  updateData(id: any, data: any) {
    return this.httpClient.put('http://localhost:3000/api/festival/edit/' + id, data)
  }
  DeleteDataById(id: any) {
    return this.httpClient.delete('http://localhost:3000/api/festival/' + id)

  }


}
