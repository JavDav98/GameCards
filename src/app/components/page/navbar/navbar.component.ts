import { Component, OnInit, OnDestroy } from '@angular/core';
import { Jugador } from '../../../models/jugador.model';
import { JugadorService } from '../../../Service/Jugador/jugador.service';
import { NotificationmsmService } from '../../../Service/mensaje/notificationmsm.service';
import { BehaviorSubject } from 'rxjs';
import { MensajeService } from 'src/app/Service/mensaje/mensaje.service';
import { Mensaje } from 'src/app/models/mensaje.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalmensajeComponent } from '../modalmensaje/modalmensaje.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  myuser = new Jugador ();

  // variable reactiva para actualizar interfaz web
  private mySubject: BehaviorSubject<any>;

  constructor(private usrActual: JugadorService, 
              private notimsService: NotificationmsmService,
              private mensajeService: MensajeService,
              private modalService: NgbModal) {
    this.myuser = usrActual.cjugadorActual();
    this.mySubject = new BehaviorSubject(null);
  }
  ngOnDestroy(): void {
    this.mySubject.unsubscribe();
  }

  ngOnInit(): void {

     // realizar suscripcion
     this.doNotificationSubscription();

     // realizar subscription para subject (actualiza texto)
     this.doSubjectSubscription();

     /*// ejecutar llamada de servicio restful al iniciar la aplicacion
     this.mensajeService
       .mensajeList(null)
       .subscribe((result) => {
         //console.log('RESULTADO:' + JSON.stringify(result));
       });
       */
  }


  public doNotificationSubscription(): void {
    try {
      this.notimsService.getJugadorNotification().subscribe((result) => {
          console.log('Mensaje recibido:' + JSON.stringify(result));
          //actualizartabla
          this.mySubject.next(result);

        });
    } catch (e) {
      console.log(e);
    }
  }

  public doSubjectSubscription(): void {

    this.mySubject.subscribe((result: Mensaje) => {
      if (result != null) {
        console.log(result.nombrejugador);;
        if (result.idj == this.myuser.idjugador) {
          const modalRef = this.modalService.open(ModalmensajeComponent);
          modalRef.componentInstance.nomrejugador = result.nombrejugador;
          modalRef.componentInstance.alias = result.alias;
        }
        
      }
    });

  }



  logout(){
    location.href = "";
  }

}
