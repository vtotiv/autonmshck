import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";

/**
 * Generated class for the GamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {

  car = 0;
  user = 0;


  constructor(public navCtrl: NavController, public http: HttpClient, private alertCtrl: AlertController) {}
  listenForUser: boolean = false;
  improvementDatapoint;
  ctx;
  data;
  results = [];
  box_data = [[751, 113, 832, 211], [542, 112, 587, 187]];
  tap_data = [];
  found_objects = 0;
  taps = 0;



  ionViewDidLoad() {
    var canvas = document.getElementById("canvas")
    this.ctx = canvas.getContext("2d");
    this.ctx.canvas.width = 933;
    this.ctx.canvas.height = 282;
    var background = new Image();
    background.src = "http://localhost:8100/assets/data/0000000000.png";
    background.width = 903;
    background.height = 675;
    background.onload = ()=>{
      this.ctx = canvas.getContext("2d");
      this.ctx.drawImage(background, 0, 0,933,282);
      let alert = this.alertCtrl.create({
        title: 'Wie viele Autos findest du?!',
        subTitle: 'Tritt gegen den Computer an',
        buttons: ['Start']
      });
      alert.present();
    }
  }

  startGame() {
    const start_time = this.startTimer();
    const end_time = this.stopTimer();
    console.log(this.calcuateTime(start_time, end_time))
  }
  stopGame() {

  }
  objectsComputerFound() {
    for(let b of this.box_data) {
      const x_oben = b[0];
      const x_unten = b[2];
      const y_oben = b[1];
      const y_unten = b[3];
      this.ctx.beginPath();
      this.ctx.lineWidth = "8";
      this.ctx.strokeStyle= "yellow";
      this.ctx.rect(x_oben, y_oben,x_unten-x_oben,y_unten-y_oben);
      this.ctx.stroke();
    }

  }
  tap(ev){
    this.taps ++;
    console.log('X: ' +  ev.clientX + 'Y: ' + ev.clientY);
    // this.checkTap(ev.clientX, ev.clientY);
    this.logTap(ev.clientX, ev.clientY-128);

    this.ctx.beginPath();
    this.ctx.arc(ev.clientX,ev.clientY-128,5,0,2*Math.PI);
    this.ctx.strokeStyle="red";
    this.ctx.fillStyle = "red";
    this.ctx.fill();
    this.ctx.stroke();
  }
  logTap(x,y) {
    if(this.listenForUser) {
      this.improvementDatapoint = [x,y];
      console.log("Improvement: " + x + " " + y);
      this.listenForUser = false;
      let alert = this.alertCtrl.create({
        title: 'Danke!',
        subTitle: 'Sie haben die Welt ein kleines stückchen besser gemacht. <br> X-Koordinate: ' + x +  ' <br> Y-Koordinate: ' +  y,
        buttons: ['zurück']
      });
      alert.present();
    }

    this.tap_data.push([x,y]);
    console.log(this.tap_data);
  }
  // Checks user taps with box_data
  checkTaps() {
    this.objectsComputerFound()
    // iterate over box_data
    for(let b of this.box_data) {
      const x_oben = b[0];
      const x_unten = b[2];
      const y_oben = b[1];
      const y_unten = b[3];
      // iterate over tap_data
      for(let t of this.tap_data) {
        if((t[0] >= x_oben && t[0] <= x_unten) && (t[1] >= y_oben && t[1] <= y_unten)){
          console.log("Korrekt");
          this.found_objects ++;
          this.ctx.beginPath();
          this.ctx.lineWidth = "2";
          this.ctx.strokeStyle="red";
          this.ctx.rect(x_oben, y_oben,x_unten-x_oben,y_unten-y_oben);
          this.ctx.stroke();
        }else {
          console.log("No")
        }
      }
    }

  }
  reset() {
    var canvas = document.getElementById("canvas")
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    var background = new Image();
    background.src = "http://localhost:8100/assets/data/0000000000.png";
    background.width = 903;
    background.height = 675;
    background.onload = ()=>{
      this.ctx = canvas.getContext("2d");
      this.ctx.drawImage(background, 0, 0,933,282);
    };
    this.found_objects = 0;
    this.taps = 0;
  }
  checkTap(x, y) {
    const item = this.data.two;
    if((x>=751 && x <=832) && (y>=113 && y <=211)){
      console.log("Found Cyclist");
      this.ctx.rect(751, 113, 832-751, 211-113);
      this.ctx.rect(item[0], item[1], item[2]- item[0], item[3]- item[1]);
      this.ctx.lineWidth = "4";
      this.ctx.strokeStyle="red";
      this.ctx.stroke();
    }else {
      console.log("Try again");
    }
  }
  startTimer() {
    const date = new Date();
    return date.getTime();
  }
  stopTimer() {
    const date = new Date();
    return date.getTime();
  }
  calcuateTime(start, end) {
    const time = end-start;
    const date = new Date(time);
    return date.toDateString();
  }
  dout() {
    let alert = this.alertCtrl.create({
      title: 'Sie haben einen Fehler erkannt?',
      subTitle: 'Klicken Sie anschließend auf das Objekt',
      buttons: [
      {
        text: 'abbrechen',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Markieren',
        role: 'cancel',
        handler: () => {
          this.listenForUser = true;
        }
      }
    ]
    });
    alert.present();
  }

}
