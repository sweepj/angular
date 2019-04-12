import { Component, OnInit } from '@angular/core';
import { ClientService} from '../client.service';
import { AnnouncementPost } from '../annocement_post';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Brand } from '../brand';
import { Subject, Observable, merge, of, throwError } from 'rxjs';
import { Model } from '../model'
import { debounceTime, distinctUntilChanged, switchMap, startWith, tap, map, catchError  } from 'rxjs/operators';

@Component({
  selector: 'app-add-annoucement',
  templateUrl: './add-annoucement.component.html',
  styleUrls: ['./add-annoucement.component.sass']
})
export class AddAnnoucementComponent implements OnInit {
  annoucementPost: AnnouncementPost[] = [];
  getBrands: Brand[];
  getModels: Model[];
  model$: Observable<Model[]>;
  brands: Brand[] = [];
  private searchId = new Subject<string>();


  constructor(private clientService: ClientService) { }


  brandControl = new FormControl(null, Validators.required);



  annoucementGroup = new FormGroup({
    modelId: new FormControl(null, Validators.required),
    colorId: new FormControl(null, Validators.required),
    year: new FormControl(null,Validators.required)
  });

  get modelId(): any{ return this.annoucementGroup.get('modelId')}
  get colorId(): any{return this.annoucementGroup.get('colorId')}
  get year(): any{return this.annoucementGroup.get('year')}

  searchModelsId(id: string): void{
    console.log(typeof id);
    this.searchId.next(id);
  }

  ngOnInit() {
    this.dateGenerate();
    this.model$ = merge(this.searchId, this.getBrand()).pipe(
      debounceTime(300),
      map(_ => {
        if(_.constructor === Array){
          this.brands = _ as Brand[];
          this.brandControl.setValue(this.brands[0].id);
          return this.brands[0].id;
        }
        return _;
      }),
      switchMap((id: string) =>{
        return this.clientService.searchByBrandId(id);
      }),
      tap(_ => {
        if(_[0]){
          this.annoucementGroup.controls.modelId.setValue(_[0].id)
        }
      }),
      catchError(_ => {
        return throwError(_)
      })
    );
    this.brandControl.valueChanges.subscribe((value)=> this.searchModelsId(value))
    this.annoucementGroup.valueChanges.subscribe((value) => console.log(value));
  }

  getModelsByBrand(id: number): void{
    this.clientService.getModelsByBrand(id)
    .subscribe(getModels => this.getModels = getModels)
  }

  add(model_id: number, color_id: number, year: number): void{
    this.clientService.addAnnoucement({model_id, color_id, year} as AnnouncementPost)
    .subscribe(annoucement => {
      console.log(this.annoucementPost);
      this.annoucementPost.push(annoucement);
    })
  }

  dateGenerate(){
    let now = new Date();
    console.log(now.getFullYear());
  }
  getBrand(){
    return this.clientService.getBrand();
  }

  onSubmitAnnoucement(){
    this.add(this.modelId.value, this.colorId.value, this.year.value);
  }
}