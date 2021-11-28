import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, Directive, HostListener } from '@angular/core';

import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { FestivalService } from '../festival.service';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { EditComponent } from './edit.component';

import { Festival } from '../festival.model';
import { User } from '../../user/user.model';
import { FormsModule } from '@angular/forms';

@Component({ selector: 'app-spinner', template: '' })
class AppSpinnerStubComponent { }

@Directive({
  selector: '[routerLink]',
})
export class RouterLinkStubDirective {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  @HostListener('click')
  onClick(): void {
    this.navigatedTo = this.linkParams;
  }
}

// Global mock objects


const expectedFestival: Festival = {
  id: 0,
  Naam: "Dour",
  MaxAantalBezoekers: 10000,
  Artiesten: "Lil kleine, Boef, Rare Akuma",
  isUnderAge: false,
  Date: new Date('2021-03-21')
};


/**
 *
 */
describe('FestivalEditComponent', () => {
  // De 'echte' component-under-test - deze mocken we dus niet!
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  // Mock services die de constructor nodig heeft
  let alertServiceSpy;
  let festivalServiceSpy: { read: { and: { returnValue: (arg0: Observable<any>) => void; }; }; };
  let routerSpy;

  /**
   *
   */
  beforeEach(() => {
    // Initialiseer de services als Jasmine Spy objecten
    alertServiceSpy = jasmine.createSpyObj('AlertService', [
      'error',
      'success',
    ]);


    festivalServiceSpy = jasmine.createSpyObj('festivalService', ['read', 'update']);

    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      // The declared components needed to test the UsersComponent.
      declarations: [
        EditComponent, // The 'real' component that we will test
        RouterLinkStubDirective, // Stubbed component required to instantiate the real component.
        AppSpinnerStubComponent,
      ],
      imports: [FormsModule],
      //
      // The constructor of our real component uses dependency injected services
      // Never provide the real service in testcases!
      //
      providers: [

        { provide: Router, useValue: routerSpy },
        { provide: FestivalService, useValue: festivalServiceSpy },

        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(
              convertToParamMap({
                id: 0,
              })
            ),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
  });

  /**
   *
   */
  afterEach(() => {
    fixture.destroy();
  });

  /**
   *
   */
  fit('should create', (done) => {
    festivalServiceSpy.read.and.returnValue(of(expectedFestival));


    // Deze zijn nodig zodat we in ngOnDestroy kunnen unsubsciben.
    component.subscriptionOptions = new Subscription();
    component.subscriptionParams = new Subscription();


    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.festival.id).toEqual(expectedFestival.id);
    done();
  });
});
