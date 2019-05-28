import { Component, OnInit } from '@angular/core';
import { EmbedVideoService } from 'ngx-embed-video'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  iframe_html: any;
  youtubeurl='https://www.youtube.com/watch?v=b88H4-peCYs?autoplay=1';

  constructor (private embedVideoService: EmbedVideoService) { 
    this.iframe_html= this.embedVideoService.embed(this.youtubeurl)
  }

  ngOnInit() {
  }

}
