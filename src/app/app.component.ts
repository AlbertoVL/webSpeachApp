import { Component, OnInit } from '@angular/core';
import { VoiceRecognitionService } from './services/voice-recognition-services.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'speakApp';

  text!: string;
 
  constructor( public service : VoiceRecognitionService) { }
 
  startService(){
    this.service.start()
  }
 
  stopService(){
    this.service.stop()
  }

  lecturaService(){
    var msg = new SpeechSynthesisUtterance(this.service.text);
    msg.lang = 'es';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(msg);
  }
  
}
