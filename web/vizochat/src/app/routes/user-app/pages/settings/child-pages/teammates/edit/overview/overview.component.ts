import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TeammatesService } from '../../teammates.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements AfterViewInit, OnDestroy{

  constructor(private teamService:TeammatesService){}

  inputShow = {
    nameInp:false,
    usernameInp:false,
  }
  apiUrl = environment.baseApiUrl;
  teamData:any
  teamSubscr!:Subscription;
  ngAfterViewInit(){
    this.teamSubscr = this.teamService.getTeammate().subscribe((data)=>{
      console.log(data,'current team');
      this.teamData = {...data}
      
    })
  }
  ngOnDestroy(): void {
    this.teamSubscr.unsubscribe()
  }
}
