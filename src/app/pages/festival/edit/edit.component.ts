import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  id: number;
  paramSubscription: Subscription;

  festival: Festival = {
    id: 0,
    Naam: '',
    MaxAantalBezoekers: 0,
    Artiesten: "",
    isUnderAge: false,
    Date: new Date()
  }
  subscriptionOptions: Subscription;
  subscriptionParams: Subscription;
  constructor(private router: Router, private route: ActivatedRoute, private festivalService: FestivalService) { }

  ngOnInit(): void {
    this.paramSubscription = this.route.paramMap
      .pipe(delay(100))
      .subscribe((params) => {
        const id = params.get('id');
        this.festival = this.festivalService.getById(Number(id));
      })
  }

  onSubmit(form: NgForm): void {
    let data: Festival = {
      id: form.value.id,
      Naam: form.value.Naam,
      MaxAantalBezoekers: form.value.MaxAantalBezoekers,
      Artiesten: form.value.Artiesten,
      isUnderAge: form.value.isUnderAge,
      Date: form.value.Date
    };
    console.log();
    this.festivalService.onUpdate(data)
    this.router.navigateByUrl('festivals')
  }

}
