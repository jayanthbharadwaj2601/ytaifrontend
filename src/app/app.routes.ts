import { Routes } from '@angular/router';
import { ChannelComponent } from './channel/channel.component';
import { VideosComponent } from './videos/videos.component';
import { SinglevideoComponent } from './singlevideo/singlevideo.component';

export const routes: Routes = [{path:"getid",component:ChannelComponent},{path:"videos",component:VideosComponent},{path:'video',component:SinglevideoComponent}];
