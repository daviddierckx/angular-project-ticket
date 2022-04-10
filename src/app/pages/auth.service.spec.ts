import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthService', () => {
  let service: AuthService;
  let authService: AuthService;
  let http: HttpClient;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService]
    });
    authService = TestBed.inject(AuthService);
    http = TestBed.inject(HttpClient)
    httpController = TestBed.inject(HttpTestingController)
  });

  afterEach(() => {
    httpController.verify();
  })

  fit('service created', () => {
    expect(authService).toBeDefined();
  });

  fit('login api', () => {
    const testData = false;
    const inputData = {
      email: "david.dierckx@hotmail.com",
      password: "d"
    }
    authService
      .loginUser(inputData)
      .subscribe((data) => expect(data).toEqual(testData));


    const req = httpController.expectOne('http://localhost:3002/api/login');

    expect(req.request.method).toEqual('POST');

    req.flush(testData)

  })
});
