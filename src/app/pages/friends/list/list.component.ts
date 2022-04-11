import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Festival } from '../friends.model';
import { FriendsService } from '../friends.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ArtiestService } from '../../artiest/artiest.service';
import { Artiest } from '../../artiest/artiest.model';
import { User } from '../../user/user.model';
import { NeoUser } from '../../user/neo-user';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  form: FormGroup;
  friends: any;
  submitted = false;
  submitSucces = false;
  isAdmin = sessionStorage.getItem('isAdmin')?.valueOf()

  values: any = [];

  friendList!: any;
  formArtiest = ""
  @ViewChild('closeModal') closeModal: ElementRef

  friends$: Observable<NeoUser[]>;
  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private friendService: FriendsService, private router: Router) { }

  ngOnInit(): void {
    console.log('Festivals geladen');
    this.friendService.getFriends().toPromise().then(res => this.friendList = res as NeoUser[])
    this.createForm()
    this.getFriendsData();
    this.values = [];

  }
  getFriendsData() {
    this.friendService.getFriends().subscribe(res => {
      console.log(res);
      this.friendList = res;
    })
  }
  createForm() {
    this.form = this.formBuilder.group({
      id: ['', Validators.required],
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
    this.friendService.makeFriend(this.form.value.id, 1).subscribe(res => {
      this.friends = res;
      this.submitSucces = true;
      this.getFriendsData();

    })
    this.getFriendsData();

  }
  saveUser(): void {
    const data = {
      _id: this.friends._id,
      name: this.friends.name,
      email: this.friends.email

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
    this.friendService.removeFriend(id).subscribe(() => {
      this.friendService.users = this.friendService.users.filter((t) => t._id !== id)
      this.getFriendsData();
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
