import {Component} from '@angular/core';
import {NotificationService} from './Service/partida/notification.service';
import {PartidaService} from './Service/partida/partida.service';
import { ActivatedRoute } from '@angular/router';

import { Observable, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { NgForm, NgModel } from '@angular/forms';
import { Partidajugador } from './models/partidajugador.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{

  login: boolean = false
  title = 'GameCards';

  procesa(tipouser: boolean){
    if (tipouser) {
      console.log("Login es :" + tipouser)
      this.login = tipouser;
    }
  }

  
}