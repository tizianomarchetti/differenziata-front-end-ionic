import { Component } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { notificationsOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tab-home',
  templateUrl: 'tab-home.page.html',
  styleUrls: ['tab-home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon],
})
export class TabHomePage {
  constructor() {
    addIcons({ notificationsOutline });
  }

  async enableNotification() {
    console.log("abilitando notifiche");

    await LocalNotifications.checkPermissions().then(res => {
      if (res.display !== 'granted') {
        LocalNotifications.requestPermissions();
      }
    });

    await LocalNotifications.checkPermissions().then(res => {
      if (res.display === 'granted') {
        LocalNotifications.schedule({
          notifications: [
            {
              title: "Title",
              body: "Body",
              id: 1,
              schedule: { at: new Date(Date.now() + 1000 * 5) },
              actionTypeId: "",
              extra: null
            }
          ]
        });
      }
    })
  }
}
