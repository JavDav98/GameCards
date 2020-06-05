import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Component
import { JoingameComponent } from './components/joingame/joingame.component';
import { LoginComponent } from './components/login/login.component';

//services
import { PartidaService } from './Service/partida/partida.service';
import { NotificationService} from './Service/partida/notification.service';
import { JugadorService } from './Service/Jugador/jugador.service';
import { NotificationJService } from './Service/Jugador/notificationj.service';
import { NavbarComponent } from './components/page/navbar/navbar.component';
import { FooterComponent } from './components/page/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AjugarComponent } from './components/ajugar/ajugar.component';
import { MyperfilComponent } from './components/myperfil/myperfil.component';
import { NewpartidaComponent } from './components/newpartida/newpartida.component';
import { PruebasComponent } from './components/pruebas/pruebas.component';
import { PrhComponent } from './components/prh/prh.component';
import { CrearpartidaComponent } from './components/crearpartida/crearpartida.component';
import { NgbdModalContentComponent } from './components/page/ngbd-modal-content/ngbd-modal-content.component';
import { ModalmensajeComponent } from './components/page/modalmensaje/modalmensaje.component';
import { CrearusuarioComponent } from './components/page/crearusuario/crearusuario.component';

@NgModule({
  declarations: [
    AppComponent,
    JoingameComponent,
    LoginComponent,
    NavbarComponent,
    FooterComponent,
    AjugarComponent,
    MyperfilComponent,
    NewpartidaComponent,
    PruebasComponent,
    PrhComponent,
    CrearpartidaComponent,
    NgbdModalContentComponent,
    ModalmensajeComponent,
    CrearusuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
  ],
  providers: [
    PartidaService,
    NotificationService,
    JugadorService,
    NotificationJService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
