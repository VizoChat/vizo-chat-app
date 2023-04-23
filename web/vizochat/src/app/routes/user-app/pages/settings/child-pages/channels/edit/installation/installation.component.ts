import { Component, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { ChannelService } from '../channel.service';
import * as hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';

hljs.default.registerLanguage('javascript', javascript);
hljs.default.registerLanguage('xml', xml);

@Component({
  selector: 'app-installation',
  templateUrl: './installation.component.html',
  styleUrls: ['./installation.component.css'],
  host:{
    'style': 'width:100%;'
  }
})
export class InstallationComponent {
  installationCode:any;
  initiativeCode = 
`<script> 
    init_vizo({ // initializing vizochat on your app
      username:'iam a user',  // optional | type: String
      userid:'iam a user',  // optional | type: String
      custom_data:{
        key:'value' // optional | type: String 

      },  // optional | type: Object | can include multiple arguments in 'custom_data', but value should be as string
    })
</script>`
initiativeCodeFun = 
`<script> 
    init_vizo({}) // initializing vizochat on your app
</script>`
  timer: number = 0;
  currentChannel:any;
  constructor(private sanitizer: DomSanitizer, private channel:ChannelService, private elRef: ElementRef){
    
  }
  ngAfterViewInit(): void {
    const codeBlock = this.elRef.nativeElement.querySelector('pre code');
    this.channel.getChannel().subscribe((data)=>{
      this.currentChannel = data
      this.installationCode = this.currentChannel?._id?`<script src="${environment.baseApiUrl}/widget/js/${this.currentChannel?._id}"></script>`:'Loading...';
      setTimeout(() => {
        hljs.default.highlightElement(codeBlock);
      }, 500);
      
    })
    hljs.default.highlightAll();
  }
  copyCode(val:string){
    navigator.clipboard.writeText(val);
  }
}
