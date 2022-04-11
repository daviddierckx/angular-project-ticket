import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { NeoUser } from '../neo-user';
import { UserService } from '../user.service';
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
  user: any;
  submitted = false;
  submitSucces = false;
  isAdmin = sessionStorage.getItem('isAdmin')?.valueOf()

  values: any = [];

  itemList!: NeoUser[];
  formArtiest = ""
  @ViewChild('closeModal') closeModal: ElementRef

  users$: Observable<NeoUser[]>;
  constructor(private userService: UserService, private formBuilder: FormBuilder, private toastr: ToastrService, private artiestService: ArtiestService, private router: Router) { }

  ngOnInit(): void {
    console.log('User geladen');
    this.userService.getAllUsers().toPromise().then(res => this.itemList = res as NeoUser[])
    this.createForm()
    this.getUserData();
    this.values = [];

  }
  getUserData() {
    this.userService.getAllUsers().subscribe(res => {
      console.log(res);
      this.user = res;
    })
  }
  createForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],

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
    this.userService.insertData(this.form.value).subscribe(res => {
      this.user = res;
      this.submitSucces = true;
      this.getUserData();

    })
    this.getUserData();

  }
  saveUser(): void {
    const data = {
      _id: this.user._id,
      name: this.user.name,
      email: this.user.email

    };

    // this.userService.create(data)
    //   .subscribe(
    //     response => {
    //       console.log(response);
    //       this.submitted = true;
    //     },
    //     error => {
    //       console.log(error);
    //     });
  }
  newUser(): void {
    this.submitted = false;
    this.submitSucces = false;

  }


  onDelete(id: any) {
    this.userService.DeleteDataById(id).subscribe(() => {
      this.userService.users = this.userService.users.filter((t) => t._id !== id)
      this.getUserData();
    })
    window.location.reload()

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
