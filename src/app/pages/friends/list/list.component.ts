import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Festival } from '../friends.model';
import { FestivalService } from '../friends.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ArtiestService } from '../../artiest/artiest.service';
import { Artiest } from '../../artiest/artiest.model';


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
  isAdmin = sessionStorage.getItem('isAdmin')?.valueOf()

  values: any = [];

  itemList!: Artiest[];
  formArtiest = ""
  @ViewChild('closeModal') closeModal: ElementRef

  festivals$: Observable<Festival[]>;
  constructor(private festivalService: FestivalService, private formBuilder: FormBuilder, private toastr: ToastrService, private artiestService: ArtiestService, private router: Router) { }

  ngOnInit(): void {
    console.log('Festivals geladen');
    this.artiestService.getAllArtiest().toPromise().then(res => this.itemList = res as Artiest[])
    this.createForm()
    this.getFestivalData();
    this.values = [];

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
      Artiesten: [''],
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
      return;
    }
    this.submitSucces = true;

    for (let index = 0; index < this.values.length; index++) {
      this.formArtiest += this.values[index].value + " | ";

    }
    this.form.get('Artiesten')?.setValue(this.formArtiest)
    this.festivalService.insertData(this.form.value).subscribe(res => {
      this.festival = res;
      this.submitSucces = true;
      this.getFestivalData();

    })
    this.getFestivalData();

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

  removeValue(i: any) {
    this.values.splice(i, 1)
  }
  addValue() {
    this.values.push({ value: "" })
  }
  resetValues() {
    this.values = []
  }
}
