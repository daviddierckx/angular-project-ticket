import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { delay, Subscription } from 'rxjs';
import { Artiest } from '../artiest.model';
import { ArtiestService } from '../artiest.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styles: [
  ]
})
export class EditComponent implements OnInit {

  artiest = new Artiest();
  id: any;
  data: any;
  paramSubscription: Subscription;


  subscriptionOptions: Subscription;
  subscriptionParams: Subscription;
  constructor(private router: Router, private route: ActivatedRoute, private artiestService: ArtiestService, private toastr: ToastrService) { }

  form = new FormGroup({
    Naam: new FormControl(''),
    Genre: new FormControl(''),
    ImageUrl: new FormControl('')
  })

  ngOnInit(): void {
    this.paramSubscription = this.route.paramMap
      .pipe(delay(100))
      .subscribe((params) => {
      })

    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.getData();
  }

  getData() {
    this.artiestService.getDataById(this.id).subscribe(res => {
      this.data = res
      this.artiest = this.data
      this.form = new FormGroup({
        Naam: new FormControl(this.artiest.Naam),
        Genre: new FormControl(this.artiest.Genre),
        ImageUrl: new FormControl(this.artiest.ImageUrl)
      })
    })
  }
  updateData() {
    console.log('clicked');
    this.artiestService.updateData(this.id, this.form.value).subscribe(res => {
      this.data = res
      this.toastr.success(JSON.stringify(this.data.code), JSON.stringify(this.data.message), {
        timeOut: 2000,
        progressBar: true
      })
    })
  }

  /////////////////




  onSubmit(form: NgForm): void {
    let data: Artiest = {
      id: form.value.id,
      Naam: form.value.Naam,
      Genre: form.value.Genre,
      ImageUrl: form.value.ImageUrl
    };
    console.log();
    this.artiestService.onUpdate(data)
    this.router.navigateByUrl('artiest')
  }

}
