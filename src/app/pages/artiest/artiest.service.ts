import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';
import { Artiest } from './artiest.model';

@Injectable({
  providedIn: 'root'
})
export class ArtiestService {
  artiest: Artiest[] = [
    {
      id: 0,
      Naam: "Klara",
      Genre: "Pop",
      ImageUrl: "http://test.com"


    },
  ]

  constructor(private httpClient: HttpClient) { }
  getArtiestLength(): number {
    return this.artiest.length;
  }
  getAllArtiest() {
    return this.httpClient.get('http://localhost:3000/api/artiest')
  }
  insertData(data: any) {
    return this.httpClient.post('http://localhost:3000/api/artiest', data)
  }

  getDataById(id: any) {
    return this.httpClient.get('http://localhost:3000/api/artiest/' + id)

  }
  DeleteDataById(id: any) {
    return this.httpClient.delete('http://localhost:3000/api/artiest/' + id)

  }
  updateData(id: any, data: any) {
    return this.httpClient.put('http://localhost:3000/api/artiest/edit/' + id, data)
  }

  /////////////
  getById(id: number): Artiest {
    const result = this.artiest.filter(item => item.id === id)

    return result[0];
  }
  getAll(): Observable<Artiest[]> {
    return of(this.artiest).pipe(delay(100));
  }
  delete(artiest: Artiest): Observable<Artiest[]> {
    return of(this.artiest.splice(artiest.id, 1))

  }
  create(data: Artiest): Observable<any> {
    return of(this.artiest).pipe(tap(artiestList => {
      artiestList.push(data)
    }));
  }
  onUpdate(artiest: Artiest): Observable<any> {
    let oldartiest = this.artiest.find(x => x.id === artiest.id)
    console.log("data " + oldartiest!.Naam);
    console.log("data " + artiest!.Naam);

    oldartiest!.id = artiest.id;
    oldartiest!.Naam = artiest.Naam;
    oldartiest!.Genre = artiest.Genre;
    oldartiest!.ImageUrl = artiest.ImageUrl;

    return of(oldartiest)
  }
}
