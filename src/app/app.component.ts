import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { PromiseObservable } from 'rxjs/observable/PromiseObservable';
@Component({
  templateUrl: 'app.html',
   providers: [ FingerprintAIO ],
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private faio: FingerprintAIO) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
       localStorage.setItem("toekn",""); 
       this.fingerAuth();
          platform.resume.subscribe ( (e) => {
            this.rootPage = LoginPage;
            this.fingerAuth();            
          });
          
          platform.pause.subscribe ( (e) => {
            this.rootPage = LoginPage;
            localStorage.setItem("token","");  
          });
    });
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
          value =>this.saveToken()
           ,
          error => console.error('Scanner error', error));
  }

   saveToken(){
        localStorage.setItem("token","123456");
        this.rootPage = HomePage;
   }

}

