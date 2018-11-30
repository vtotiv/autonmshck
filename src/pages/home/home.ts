import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {}

  ctx;

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
    }
  }
  tap(ev){
    console.log('X: ' +  ev.clientX + 'Y: ' + ev.clientY);
    this.checkTap(ev.clientX, ev.clientY);
  }
  checkTap(x, y) {
    if((x>=751 && x <=832) && (y>=113 && y <=211)){
      console.log("Found Cyclist");
      this.ctx.rect(751, 113, 832-751, 211-113);
      this.ctx.lineWidth = "4";
      this.ctx.strokeStyle="red";
      this.ctx.stroke();
    }else {
      console.log("Try again");
    }
  }
}
