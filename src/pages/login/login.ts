import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { PromiseObservable } from 'rxjs/observable/PromiseObservable';
import { Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [ FingerprintAIO ],
})
export class LoginPage {
  constructor(public navCtrl: NavController, private faio: FingerprintAIO,private platform:Platform) {
    // localStorage.setItem("toekn",""); 
    if (localStorage.getItem("token")!="" && localStorage.getItem("token")!=null){
      this.navCtrl.setRoot(HomePage);
    }
  }
 

  fingerAuth(){
    PromiseObservable.create(this.faio.show({
          clientId: 'Fingerprint-Demo',
          clientSecret: 'password', //Only necessary for Android
          disableBackup:true,  //Only for Android(optional)
          localizedFallbackTitle: 'Use Pin', //Only for iOS
          localizedReason: 'Please authenticate' //Only for iOS
        }))
        .subscribe(
          value => this.saveToken()
           ,
          error => console.error('Scanner error', error));
  }

   saveToken(){
        console.log("Scaned");
        localStorage.setItem("token","123456");
        this.navCtrl.setRoot(HomePage);
   }
}
