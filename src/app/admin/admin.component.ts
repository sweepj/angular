import { Component, OnInit } from '@angular/core';
import { CarService } from '../sevices/car.service';
import { Announcement } from '../annoucment';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit {


  annous: Announcement[];
  constructor(private carService: CarService) { }
  ngOnInit() {
    this.getAnnouncment();
  }

  getAnnouncment(): void{
    this.carService.getAnnouncment()
    .subscribe(annous => this.annous = annous)
  }
}
