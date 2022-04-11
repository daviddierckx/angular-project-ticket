import { TestBed } from '@angular/core/testing';
import { Artiest } from './artiest.model';
import { HttpClient } from '@angular/common/http';

import { ArtiestService } from './artiest.service';
import { of } from 'rxjs';
import { doesNotMatch } from 'assert';

const expectedArtiest: Artiest[] = [
    {
        id: 0,
        Naam: "Klara",
        Genre: "Pop",
        ImageUrl: "http://test.com"
    },
]


describe('ArtiestService', () => {
    let service: ArtiestService;
    let httpSpy: jasmine.SpyObj<HttpClient>

    beforeEach(() => {
        httpSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);

        TestBed.configureTestingModule({
            providers: [{ provide: HttpClient, useValue: httpSpy }],
        });
        service = TestBed.inject(ArtiestService);
        httpSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    });


    fit('should return a list of artiest', (done: DoneFn) => {
        httpSpy.get.and.returnValue(of(expectedArtiest));

        service.getAll().subscribe(function (artiest: Artiest[]) {
            console.log(artiest);
            expect(artiest.length).toEqual(1);
            expect(artiest[0].id).toEqual(artiest[0].id);
            done();
        });
    });
    fit('should return details of a artiest', (done: DoneFn) => {
        httpSpy.get.and.returnValue(of(expectedArtiest));
        expect(service.getById(0)).toEqual(expectedArtiest[0])
        done();
    });
    fit('should delete a artiest', (done: DoneFn) => {
        httpSpy.get.and.returnValue(of(expectedArtiest));

        service.delete(expectedArtiest[0]).subscribe(res => {
            expect(res).toEqual(expectedArtiest);
            done();
        });
    });
    fit('should add a artiest', (done: DoneFn) => {
        httpSpy.get.and.returnValue(of(expectedArtiest));
        const data = {
            id: 10,
            Naam: "Kendrick Lamar",
            Genre: "Rap",
            ImageUrl: "http://test.com"
        };
        console.log(data);
        service.create(data).subscribe(result => {
            expect(result[service.getArtiestLength() - 1]).toEqual(data)
        }
        )
        done();
    });

});
