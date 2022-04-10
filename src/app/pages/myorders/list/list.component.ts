import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { MyOrder } from '../myorders.model';
import { MyOrderService } from '../myorders.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Order } from 'src/app/shared/order.model';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  form: FormGroup;
  order: any;
  submitted = false;
  submitSucces = false;

  @ViewChild('closeModal') closeModal: ElementRef

  order$: Observable<MyOrder[]>;
  constructor(private myorderService: MyOrderService, private formBuilder: FormBuilder, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    console.log('Festivals geladen');
    this.createForm()
    this.getOrderData();

  }
  getOrderData() {
    this.myorderService.getAllOrder().subscribe(res => {
      console.log(res);
      this.order = res;
    })
  }
  createForm() {
    this.form = this.formBuilder.group({
      Naam: ['', Validators.required],
      MaxAantalBezoekers: ['', Validators.required],
      Artiesten: ['', Validators.required],
      isUnderage: ['', Validators.required],
      Date: ['', Validators.required],
      Price: ['', Validators.required],
      IsGift: ['', Validators.required],
    })
  }

  get f() {
    return this.form.controls;
  }

  onDelete(id: any) {
    this.myorderService.DeleteDataById(id).subscribe(() => {
      this.myorderService.order = this.myorderService.order.filter((t) => t.id !== id)
      this.getOrderData();

    })
    this.getOrderData();
    window.location.reload()
  }


}
