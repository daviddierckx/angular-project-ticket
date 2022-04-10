import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Artiest } from '../artiest.model';
import { ArtiestService } from '../artiest.service';
import { ModalDirective } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  form: FormGroup;
  artiest: any;
  submitted = false;
  submitSucces = false;
  isAdmin = sessionStorage.getItem('isAdmin')?.valueOf()

  @ViewChild('closeModal') closeModal: ElementRef

  artiests$: Observable<Artiest[]>;
  constructor(private artiestService: ArtiestService, private formBuilder: FormBuilder, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    console.log('artiest geladen');
    this.createForm()
    this.getArtiestData();

  }
  getArtiestData() {
    this.artiestService.getAllArtiest().subscribe(res => {
      console.log(res);
      this.artiest = res;
    })
  }
  createForm() {
    this.form = this.formBuilder.group({
      Naam: ['', Validators.required],
      Genre: ['', Validators.required],
      ImageUrl: ['']
    })
  }

  get f() {
    return this.form.controls;
  }
  insertData() {
    this.submitted = true;
    if (this.form.invalid) {
      console.log('INVALID');
      return;
    }
    this.submitSucces = true;

    this.artiestService.insertData(this.form.value).subscribe(res => {
      this.artiest = res;
      this.submitSucces = true;
    })
    this.getArtiestData();
  }
  saveUser(): void {
    const data = {
      id: this.artiest.id,
      Naam: this.artiest.Naam,
      Genre: this.artiest.Genre,
      ImageUrl: this.artiest.ImageUrl
    };

    this.artiestService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
    this.getArtiestData();

  }
  newUser(): void {
    this.submitted = false;
    this.submitSucces = false;

  }


  onDelete(id: any) {
    this.artiestService.DeleteDataById(id).subscribe(() => {
      this.artiestService.artiest = this.artiestService.artiest.filter((t) => t.id !== id)
      this.getArtiestData();

    })
    this.getArtiestData();
  }


}
