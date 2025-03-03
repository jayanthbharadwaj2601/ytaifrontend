import { Component } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { HttpClient } from '@angular/common/http';
import { VideodetailsService } from '../videodetails.service';
import * as fs from 'node:fs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-singlevideo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './singlevideo.component.html',
  styleUrl: './singlevideo.component.css'
})
export class SinglevideoComponent {
  img:any;
  mime:any;
  response:any;
  src:string
  title = 'imageai';
  public embedsrc:string;
  resp1 = " ";
  
  constructor(public http:HttpClient,public video:VideodetailsService){
    this.src="";
    this.embedsrc="https://www.youtube.com/embed/";
    this.embedsrc+=this.video.video.contentDetails.upload.videoId;
    console.log(this.video.video.contentDetails.upload.videoId);
    console.log(this.embedsrc);
  }
  async generate_image(a:string,id:string)
  {
    let api_url = "https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId="+id+"&key=AIzaSyBqitVWrJa6phbitS87pi0MwjNnkaKovCU";
    await this.http.get(api_url,{observe:"response"}).subscribe(body=>{
      this.response=body.body;
      this.executeprompt(a);
    });
    
  }
  
 async executeprompt(a:string)
  {
    // console.log(this.response.items[0].snippet.tags);
    const genAI = new GoogleGenerativeAI("AIzaSyAtI4yLa-bZtGu5XRm6Tyxy9Jtphl8uNOE");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    let prompt="";
    console.log(a);
    if(a=="Summary")
    {
       prompt+= "can you perform the sentiment analysis on the following comments posted on a youtube video and provide me with a verdict of how people like it?There could be html markdown elements in the comments,just ignore them.Just provide me with the overall summary,you dont have to provide me with analysis of each comment seperately:";
    } 
    else
    {
      prompt+="can you give me around 4-5 video ideas by going through the following comments posted on one of my youtube videos?There could be html markdown elements in the comments,just ignore them.Keep in mind the original theme of the video(which you should be able to get through summarizing the comments),and generate ideas based on that theme.for eg,if the theme of the video is comedy,generate ideas with comedic theme:"
    }
      let b = this.response.items;
  for(let i=0;i<b.length;i++)
  {
  prompt+=b[i].snippet.topLevelComment.snippet.textDisplay;
  if(i<b.length-1)
    prompt+=",";
  }

const result = await model.generateContent(prompt);
this.resp1 = result.response.text();
  }

  async imageinfo()
  {
    this.resp1="";
    this.http.post("http://127.0.0.1:5000/",{prompt:"Give me an appropriate prompt to create variations of this thumbnail.just generate a single prompt.no need of explanation or anything.The prompt should be concise.it should fit in a single line",imgurl:this.video.video.snippet.thumbnails.high.url},{observe:'response'}).subscribe(body=>
    {
      this.response=body.body;
      this.src=this.response.message.output_png;

    }
    );
    console.log(this.video.video.snippet.thumbnails.high.url);
    console.log(this.response);
  }
}
