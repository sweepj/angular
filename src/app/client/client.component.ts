import { Component, OnInit } from '@angular/core';
import { CarService } from '../sevices/car.service';
import { Announcement } from '../annoucment';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.sass']
})
export class ClientComponent implements OnInit {

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
