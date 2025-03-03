import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GoogleGenerativeAI } from "@google/generative-ai";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'imageai';
  response:any;
  constructor(public http:HttpClient){

  }
  async generate_image(a:string,url:string)
  {
    let splitting = url.split('/');
    let id="";
    console.log(splitting);
    console.log(a);
    if(splitting[3]=="shorts")
    {
      id=splitting[4];
    }
    else
    {
      let x=splitting[3].split("&");
      let y = x[0].split("=");
      id=y[1];
    } let api_url = "https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId="+id+"&key=AIzaSyBqitVWrJa6phbitS87pi0MwjNnkaKovCU";
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
    if(a=="summary")
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
console.log(result.response.text());
  }
}

