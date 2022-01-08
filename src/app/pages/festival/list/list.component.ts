import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Festival } from '../festival.model';
import { FestivalService } from '../festival.service';
import { ModalDirective } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  form: FormGroup;
  festival: any;
  submitted = false;
  submitSucces = false;
  @ViewChild('closeModal') closeModal: ElementRef

  festivals$: Observable<Festival[]>;
  constructor(private festivalService: FestivalService, private formBuilder: FormBuilder, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    console.log('Festivals geladen');
    this.createForm()
    this.getFestivalData();

  }
  getFestivalData() {
    this.festivalService.getAllFestivals().subscribe(res => {
      console.log(res);
      this.festival = res;
    })
  }
  createForm() {
    this.form = this.formBuilder.group({
      Naam: ['', Validators.required],
      MaxAantalBezoekers: ['', Validators.required],
      Artiesten: ['', Validators.required],
      isUnderage: ['', Validators.required],
      Date: ['', Validators.required],
      Price: ['', Validators.required]
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

    this.festivalService.insertData(this.form.value).subscribe(res => {
      this.festival = res;
      this.submitSucces = true;
    })
  }
  saveUser(): void {
    const data = {
      id: this.festival.id,
      Naam: this.festival.Naam,
      MaxAantalBezoekers: this.festival.MaxAantalBezoekers,
      Artiesten: this.festival.Artiesten,
      isUnderAge: this.festival.isUnderAge,
      Date: this.festival.Date,
      Price: this.festival.Price
    };

    this.festivalService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }
  newUser(): void {
    this.submitted = false;
    this.submitSucces = false;

  }


  onDelete(id: any) {
    this.festivalService.DeleteDataById(id).subscribe(() => {
      this.festivalService.festival = this.festivalService.festival.filter((t) => t.id !== id)
      this.getFestivalData();

    })
    this.getFestivalData();
  }

  onAddArtist() {

  }
}
