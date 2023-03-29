import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeammatesService } from '../teammates.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  teammateID:any;
  constructor(private route:ActivatedRoute, private teamService:TeammatesService){
    this.route.params.subscribe((params:any) => {
      this.teammateID = params.userId;
      this.teamService.setTeammateId(params.userId)
    });
    
  }
}
