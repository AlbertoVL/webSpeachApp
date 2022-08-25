import { Injectable } from '@angular/core';
declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})

export class VoiceRecognitionService {

  reconocimiento =  new webkitSpeechRecognition();
  stopReconocimiento = false;
  public text = '';
  concaFrase: any;

  constructor() { }

  start() {

    this.reconocimiento.interimResults = true;
    this.reconocimiento.lang = 'es-MX';
    this.stopReconocimiento = false;
    this.reconocimiento.start();

    this.reconocimiento.addEventListener('result', (e: any) => {
      const transcript = Array.from(e.results) /// Se llava acabo la conversion de los resultados del reconocimiento a un array
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join('');
      this.concaFrase = transcript;
      console.log(this.concaFrase)
    });


    console.log("Reconocimiento de voz iniciado")
    this.reconocimiento.addEventListener('end', () => {
      if (this.stopReconocimiento) {
        this.reconocimiento.stop();
      } else {
        this.wordConcat()
        this.reconocimiento.start();
      }
    });

  }
  
  stop() {
    this.stopReconocimiento = true;
    this.wordConcat()
    this.reconocimiento.stop();
    console.log("Reconocimiento de voz finalizado")
  }

  wordConcat() {
    this.text = this.text + ' ' + this.concaFrase + '.';
    this.concaFrase = '';
  }
}