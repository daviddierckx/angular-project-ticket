import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';
import { Festival } from './festival.model';

@Injectable({
  providedIn: 'root'
})
export class FestivalService {
  festival: Festival[] = [
    {
      id: 0,
      Naam: "Dour",
      MaxAantalBezoekers: 10000,
      Artiesten: "Lil kleine, Boef, Rare Akuma",
      isUnderAge: false,
      Date: new Date('2021-03-21'),
      Price: 100


    },
    {
      id: 1,
      Naam: "Wel Dour",
      MaxAantalBezoekers: 10000,
      Artiesten: "GRoef, Rare Akuma",
      isUnderAge: false,
      Date: new Date('1988-03-21'),
      Price: 100

    },
    {
      id: 2,
      Naam: "Niet Dour",
      MaxAantalBezoekers: 10000,
      Artiesten: "Lil kleine, Boef, Rare Akuma",
      isUnderAge: false,
      Date: new Date('1988-03-21'),
      Price: 100
    },

  ]

  constructor(private httpClient: HttpClient) { }
  getFestivalLength(): number {
    return this.festival.length;
  }
  getAllFestivals() {
    return this.httpClient.get('https://avansfestivalapi.herokuapp.com/api/festival')
  }
  insertData(data: any) {
    return this.httpClient.post('https://avansfestivalapi.herokuapp.com/api/festival', data)
  }

  getDataById(id: any) {
    return this.httpClient.get('https://avansfestivalapi.herokuapp.com/api/festival/' + id)

  }

  updateData(id: any, data: any) {
    return this.httpClient.put('https://avansfestivalapi.herokuapp.com/api/festival/edit/' + id, data)
  }
  DeleteDataById(id: any) {
    return this.httpClient.delete('https://avansfestivalapi.herokuapp.com/api/festival/' + id)

  }

  /////////////
  getById(id: number): Festival {
    const result = this.festival.filter(item => item.id === id)

    return result[0];
  }
  getAll(): Observable<Festival[]> {
    return of(this.festival).pipe(delay(100));
  }
  delete(festival: Festival): Observable<Festival[]> {
    return of(this.festival.splice(festival.id, 1))

  }
  create(data: Festival): Observable<any> {
    return of(this.festival).pipe(tap(festivalList => {
      festivalList.push(data)
    }));
  }
  onUpdate(festival: Festival): Observable<any> {
    let oldFestival = this.festival.find(x => x.id === festival.id)
    console.log("data " + oldFestival!.Naam);
    console.log("data " + festival!.Naam);

    oldFestival!.id = festival.id;
    oldFestival!.Naam = festival.Naam;
    oldFestival!.MaxAantalBezoekers = festival.MaxAantalBezoekers;
    oldFestival!.Artiesten = festival.Artiesten;
    oldFestival!.isUnderAge = festival.isUnderAge;
    oldFestival!.Date = festival.Date;

    return of(oldFestival)
  }
}
