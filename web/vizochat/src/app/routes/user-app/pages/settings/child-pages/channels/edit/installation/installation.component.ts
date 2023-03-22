import { Component, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment.development';
import { ChannelService } from '../channel.service';

@Component({
  selector: 'app-installation',
  templateUrl: './installation.component.html',
  styleUrls: ['./installation.component.css'],
  host:{
    'style': 'width:100%;'
  }
})
export class InstallationComponent {
  @ViewChild('codeSnippet') codeSnippet!: ElementRef;
  installationCode:any;
  currentChannel:any;
  constructor(private sanitizer: DomSanitizer, private channel:ChannelService){
    
  }
  ngAfterViewInit(): void {
    this.channel.getChannel().subscribe((data)=>{
      this.currentChannel = data
      const installationCode = `<script src="${environment.baseApiUrl}/widget/js/${this.currentChannel?._id}"></script>`;
      this.installationCode = this.sanitizer.bypassSecurityTrustHtml(installationCode);
    })
  }
  copyCode(){
    this.codeSnippet.nativeElement.select();
    document.execCommand('copy');
  }
}
