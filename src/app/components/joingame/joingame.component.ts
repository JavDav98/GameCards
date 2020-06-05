import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {NotificationService} from '../../Service/partida/notification.service';
import {PartidaService} from '../../Service/partida/partida.service';
import { Partidajugador } from '../../models/partidajugador.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Observable, BehaviorSubject, partition } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { NgForm, NgModel } from '@angular/forms';
import { Partida } from '../../models/partida.model';
import { Jugador } from '../../models/jugador.model';
import { JugadorService } from '../../Service/Jugador/jugador.service';

@Component({
  selector: 'app-joingame',
  templateUrl: './joingame.component.html',
  styleUrls: ['./joingame.component.css']
})

export class JoingameComponent implements OnInit, OnDestroy {
v: boolean = true;
img: String = "PK.png";
jugador = new Jugador();
player2 = new Jugador();
pj = new Partidajugador();
public content: any;
// definir "FormGroup" para ingreso de datos por formulario
public contador: number = 0;
closeResult = '';
public partida = new Partida();
partidaun = new Partida();
public texto: String = 'empty';
public texto2: String = 'texto2';

// variable reactiva para actualizar interfaz web
// subject = observable , al cual yo me puedo suscribir
private mySubject: BehaviorSubject<any>;
public dataListArray: Array<any>;
public dataListSubject: BehaviorSubject<any[]>; // = Observable (suscripcion)

constructor(private personaService: PartidaService,
                    private notificationService: NotificationService,
                    private activatedRoute: ActivatedRoute,
                    public usrActual: JugadorService,
                    private modalService: NgbModal,
                    public router: Router) {
  this.jugador = usrActual.cjugadorActual();
  this.mySubject = new BehaviorSubject(null);
  this.dataListArray = new Array<any>();
  this.dataListSubject = new BehaviorSubject(null);
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
  this.personaService
    .partidaList(null)
    .subscribe((result) => {
      console.log('RESULTADO:' + JSON.stringify(result));
    });


}

/* ------------------------------------------------------------------------------------------------- */
public doNotificationSubscription(): void {
  try {
    this.notificationService
      .getPartidaNotification()
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

public enviarFormulario(forma: NgForm, content): void {
  if(forma.valid){
    console.log(this.partida)
  }

/*------------------------------------------------------------------------------------------------------*/

  console.log('Datos de formulario:' + JSON.stringify(this.partida));

  console.log('Datos a enviar:' + JSON.stringify(this.partida));

  this.personaService.VerifyPartida(this.partida.alias)
    .subscribe((result: Partida )=> {
      this.partidaun = result;
      if (this.partidaun != null) {
        this.pj = this.partidaun.partidajugador[0];
        this.personaService.aspartidActual(this.partidaun);
        //alert(this.personaService.partidActual().alias);
        this.usrActual.VerifyPlayer(this.pj.jugadoridjugador).subscribe((resp: Jugador) => {
          this.player2 = resp;
          try {            
            this.open(content);
          } catch (error) {
          }
        })
      }else{
        alert("La partida "+this.partida.alias+" no esta disponible.");        
      }
    },
    error => {
      alert("La partida "+this.partida.alias+" no esta disponible.");
    });
}

joinGame(){
  let pj = new Partidajugador();
  pj.jugadoridjugador = this.jugador.idjugador
  pj.partidaidpartida = this.partidaun.idpartida;
  this.personaService.joinGame(pj).subscribe((result: Partida) =>{
    this.partidaun = result;
    this.personaService.aspartidActual(this.partidaun);
    this.partidaun = this.personaService.partidActual();
    //alert('El alias es '+ this.partidaun.alias);
    this.router.navigate(['iniciajuego/1']);
  })
}

open(content) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}
}
