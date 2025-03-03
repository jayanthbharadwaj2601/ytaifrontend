import { Component } from '@angular/core';
import { VideoService } from '../video.service';
import { CommonModule } from '@angular/common';
import { VideodetailsService } from '../videodetails.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.css'
})
export class VideosComponent {
  public value:string;
  constructor(public videos:VideoService,public videodetails:VideodetailsService,public router:Router)
  {
    console.log(this.videos.videolist);
    this.value="";
  }
  search(a:string)
  {
    this.value=a;
  }
  gotovideo(a:any)
  {
    this.videodetails.video=a;
    this.router.navigateByUrl('video');
  }
}
