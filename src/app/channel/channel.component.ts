import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-channel',
  standalone: true,
  imports: [],
  templateUrl: './channel.component.html',
  styleUrl: './channel.component.css'
})
export class ChannelComponent {
  public response:any;
  public id:any;
  public response1:any;
  constructor(public http:HttpClient,public router:Router,public videoservice:VideoService)
  {
  }
  async getchannelid(a:string)
  {
    let url = "https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&forHandle=%40"+a+"&key=AIzaSyBqitVWrJa6phbitS87pi0MwjNnkaKovCU"
    this.http.get(url,{observe:"response"}).subscribe(body=>
    {
     this.response=body.body; 
     this.id=this.response.items[0].id;
     console.log(this.id);
     this.getchanneldetails()
    }
    );
    console.log("a"+this.response);
  }
  async getchanneldetails()
  {
    let url2 = "https://youtube.googleapis.com/youtube/v3/activities?part=snippet%2CcontentDetails&maxResults=10000&channelId="+this.id+"&key=AIzaSyBqitVWrJa6phbitS87pi0MwjNnkaKovCU";
    this.http.get(url2,{observe:"response"}).subscribe(body=>
      {
       this.videoservice.videolist=body.body; 
       console.log(this.response1);
       this.router.navigateByUrl("videos");
      }
      );
  }

}
