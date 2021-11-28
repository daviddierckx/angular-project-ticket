import { TestBed } from '@angular/core/testing';
import { Festival } from './festival.model';
import { HttpClient } from '@angular/common/http';

import { FestivalService } from './festival.service';
import { of } from 'rxjs';
import { doesNotMatch } from 'assert';

const expectedFestivals: Festival[] = [
  {
    id: 0,
    Naam: "Dour",
    MaxAantalBezoekers: 10000,
    Artiesten: "Lil kleine, Boef, Rare Akuma",
    isUnderAge: false,
    Date: new Date('2021-03-21')
  },
]


describe('FestivalService', () => {
  let service: FestivalService;
  let httpSpy: jasmine.SpyObj<HttpClient>

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);

    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpSpy }],
    });
    service = TestBed.inject(FestivalService);
    httpSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });

  fit('should return a list of festivals', (done: DoneFn) => {
    httpSpy.get.and.returnValue(of(expectedFestivals));

    service.getAll().subscribe((festival: Festival[]) => {
      console.log(festival);
      expect(festival.length).toBeGreaterThan(1);
      expect(festival[0].id).toEqual(expectedFestivals[0].id);
      done();
    });
  });
  fit('should return details of a festival', (done: DoneFn) => {
    httpSpy.get.and.returnValue(of(expectedFestivals));
    expect(service.getById(0)).toEqual(expectedFestivals[0])
    done();
  });
  fit('should delete a festival', (done: DoneFn) => {
    httpSpy.get.and.returnValue(of(expectedFestivals));

    service.delete(expectedFestivals[0]).subscribe(res => {
      expect(res).toEqual(expectedFestivals);
      done();
    });
  });
  fit('should add a festival', (done: DoneFn) => {
    httpSpy.get.and.returnValue(of(expectedFestivals));
    const data = {
      id: 10,
      Naam: "Pukkelpop",
      MaxAantalBezoekers: 10000,
      Artiesten: "Zwangere guy",
      isUnderAge: false,
      Date: new Date('2021-04-21')
    };
    console.log(data);
    service.create(data).subscribe(result => {
      expect(result[service.getFestivalLength() - 1]).toEqual(data)
    }
    )
    done();
  });
  fit('should update a festival', (done: DoneFn) => {
    httpSpy.get.and.returnValue(of(expectedFestivals));
    const updateData = {
      id: 0,
      Naam: "Pukkelpop",
      MaxAantalBezoekers: 10000,
      Artiesten: "Zwangere guy",
      isUnderAge: false,
      Date: new Date('2021-04-21')
    };
    service.onUpdate(updateData).subscribe(result => {
      expect(service.getById(0)).toEqual(updateData)
    })
    done();
  });
});
