import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {GamePage} from "../game/game";
import {ManualPage} from "../manual/manual";

/**
 * Generated class for the StartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  start() {
    this.navCtrl.push(GamePage);
  }
  manual(){
    this.navCtrl.push(ManualPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad StartPage');
  }

}
