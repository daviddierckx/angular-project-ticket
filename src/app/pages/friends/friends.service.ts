import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';
import { NeoUser } from '../user/neo-user';
import { Festival } from './friends.model';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {


  constructor(private httpClient: HttpClient) { }
  users: NeoUser[]


  makeFriend(data: any, id: any) {
    return this.httpClient.post('http://localhost:3003/friends/' + id, data)
  }

  removeFriend(id: any) {
    return this.httpClient.delete('http://localhost:3003/friends/' + id)

  }

  getFriends() {
    return this.httpClient.get('http://localhost:3003/friends/1')
  }



}
