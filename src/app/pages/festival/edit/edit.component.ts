import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { delay, Subscription } from 'rxjs';
import { Festival } from '../festival.model';
import { FestivalService } from '../festival.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styles: [
  ]
})
export class EditComponent implements OnInit {

  festival = new Festival();
  id: any;
  data: any;
  paramSubscription: Subscription;


  subscriptionOptions: Subscription;
  subscriptionParams: Subscription;
  constructor(private router: Router, private route: ActivatedRoute, private festivalService: FestivalService, private toastr: ToastrService) { }

  form = new FormGroup({
    Naam: new FormControl(''),
    MaxAantalBezoekers: new FormControl(''),
    Artiesten: new FormControl(''),
    isUnderage: new FormControl(''),
    Date: new FormControl(''),
    Price: new FormControl('')
  })

  ngOnInit(): void {
    this.paramSubscription = this.route.paramMap
      .pipe(delay(100))
      .subscribe((params) => {
        const id = params.get('id');
        this.festival = this.festivalService.getById(Number(id));
      })

    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.getData();
  }

  getData() {
    this.festivalService.getDataById(this.id).subscribe(res => {
      this.data = res
      this.festival = this.data
      this.form = new FormGroup({
        Naam: new FormControl(this.festival.Naam),
        MaxAantalBezoekers: new FormControl(this.festival.MaxAantalBezoekers),
        Artiesten: new FormControl(this.festival.Artiesten),
        isUnderage: new FormControl(this.festival.isUnderAge),
        Date: new FormControl(this.festival.Date),
        Price: new FormControl(this.festival.Price)
      })
    })
  }
  updateData() {
    this.festivalService.updateData(this.id, this.form.value).subscribe(res => {
      this.data = res
      this.toastr.success(JSON.stringify(this.data.code), JSON.stringify(this.data.message), {
        timeOut: 2000,
        progressBar: true
      })
    })
  }

  /////////////////




  onSubmit(form: NgForm): void {
    let data: Festival = {
      id: form.value.id,
      Naam: form.value.Naam,
      MaxAantalBezoekers: form.value.MaxAantalBezoekers,
      Artiesten: form.value.Artiesten,
      isUnderAge: form.value.isUnderAge,
      Date: form.value.Date,
      Price: form.value.Price
    };
    console.log();
    this.festivalService.onUpdate(data)
    this.router.navigateByUrl('festivals')
  }

}
