import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Festival } from '../festival.model';
import { FestivalService } from '../festival.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  festival: Festival = {
    id: this.festivalService.getFestivalLength(),
    Naam: '',
    MaxAantalBezoekers: 0,
    Artiesten: "",
    isUnderAge: false,
    Date: new Date()
  }
  submitted = false;

  festivals$: Observable<Festival[]>;
  constructor(private festivalService: FestivalService) { }

  ngOnInit(): void {
    console.log('UserList geladen');

    this.festivals$ = this.festivalService.getAll();
  }
  saveUser(): void {
    const data = {
      id: this.festival.id,
      Naam: this.festival.Naam,
      MaxAantalBezoekers: this.festival.MaxAantalBezoekers,
      Artiesten: this.festival.Artiesten,
      isUnderAge: this.festival.isUnderAge,
      Date: this.festival.Date
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
  currentFestival: Festival = this.festival;
  newUser(): void {
    this.submitted = false;
    this.festival = {
      id: this.festivalService.getFestivalLength(),
      Naam: '',
      MaxAantalBezoekers: 0,
      Artiesten: "",
      isUnderAge: false,
      Date: new Date()
    };
  }

  onDelete(festival: Festival) {
    this.festivalService.delete(festival).subscribe(() => {
      this.festivalService.festival = this.festivalService.festival.filter((t) => t.id !== festival.id)
    })
  }

}
