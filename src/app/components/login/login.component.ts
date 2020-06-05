import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import {NotificationJService} from '../../Service/Jugador/notificationj.service';
import {JugadorService} from '../../Service/Jugador/jugador.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CrearusuarioComponent } from '../page/crearusuario/crearusuario.component';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { NgForm, NgModel } from '@angular/forms';
import { Jugador } from '../../models/jugador.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  // definir "FormGroup" para ingreso de datos por formulario
  public contador: number = 0;
  public jugador = new Jugador();
  public texto: String = 'empty';
  public texto2: String = 'texto2';

  // variable reactiva para actualizar interfaz web
  // subject = observable , al cual yo me puedo suscribir
  private mySubject: BehaviorSubject<any>;
  public dataListArray: Array<any>;
  public dataListSubject: BehaviorSubject<any[]>; // = Observable (suscripcion)

  login: boolean = false


  @Output() log: EventEmitter <boolean>;

  constructor(private jugadorService: JugadorService,
                      private notificationjService: NotificationJService,
                      private activatedRoute: ActivatedRoute,
                      public router: Router,
                      private modalService: NgbModal) {
    this.mySubject = new BehaviorSubject(null);
    this.log = new EventEmitter();
  }
  ngOnDestroy(): void {
    this.mySubject.unsubscribe();

  }

  ngOnInit(): void {


  console.log('on init');

    // realizar suscripcion
    this.doNotificationSubscription();

    // realizar subscription para subject (actualiza texto)
    this.doSubjectSubscription();

    // ejecutar llamada de servicio restful al iniciar la aplicacion
    this.jugadorService
      .jugadorList(null)
      .subscribe((result) => {
        console.log('RESULTADO:' + JSON.stringify(result));
      });
  }

  /* ------------------------------------------------------------------------------------------------- */
  public doNotificationSubscription(): void {
    try {
      this.notificationjService
        .getJugadorNotification()
        .subscribe((result) => {
          console.log('Mensaje recibido:' + JSON.stringify(result));
          //actualizartabla
          this.mySubject.next(result);
        });

    } catch (e) {
      console.log(e);
    }
  }

  /*---------------------------------------------------------------------------------------------*/
  public doSubjectSubscription(): void {
    this.mySubject.subscribe((result) => {
      this.actualizarTexto(result);
    });

    this.mySubject.subscribe((result) => {
      this.texto2 = this.texto2 + JSON.stringify(result);
    });

  }

  public actualizarTexto(result: any): void {
    this.texto = this.texto + ' ' + JSON.stringify(result);
  }

  open() {
    const modalRef = this.modalService.open(CrearusuarioComponent);
  }

  public enviarFormulario(forma: NgForm): void {
    if(forma.valid){
      console.log(this.jugador)
    }

  /*------------------------------------------------------------------------------------------------------*/

  console.log('Datos de formulario:' + JSON.stringify(this.jugador));

  console.log('Datos a enviar:' + JSON.stringify(this.jugador));

  this.jugadorService.VerifyUser(this.jugador.nombre, this.jugador.pass)
    .subscribe(result => {
      console.log('Datos from server:' + JSON.stringify(result));
        this.log.emit(true);
        this.jugadorService.j1 = result;        
      this.router.navigate([''])   
    },
    error => alert("Usuario o contraseña invalido")
    );

  }

  
}
