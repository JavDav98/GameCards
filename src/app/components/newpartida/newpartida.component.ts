import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {NotificationService} from '../../Service/partida/notification.service';
import {PartidaService} from '../../Service/partida/partida.service';
import { Partidajugador } from '../../models/partidajugador.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalContentComponent } from '../../components/page/ngbd-modal-content/ngbd-modal-content.component';
import { Observable, BehaviorSubject, partition } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { NgForm, NgModel } from '@angular/forms';
import { Partida } from '../../models/partida.model';
import { Jugador } from '../../models/jugador.model';
import { JugadorService } from '../../Service/Jugador/jugador.service';
import { error } from 'protractor';
import { Mensaje } from 'src/app/models/mensaje.model';

@Component({
  selector: 'app-newpartida',
  templateUrl: './newpartida.component.html',
  styleUrls: ['./newpartida.component.css']
})
export class NewpartidaComponent implements OnInit {
  // variable reactiva para actualizar interfaz web
  // subject = observable , al cual yo me puedo suscribir
  private mySubject: BehaviorSubject<any>;
  public dataListArray: Array<any>;
  public dataListSubject: BehaviorSubject<any[]>; // = Observable (suscripcion)
  jugador = new Jugador();
  partida = new Partida();

  constructor(private partidaService: PartidaService,
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

  ngOnInit(): void {
  }

  enviarFormulario(forma: NgForm){
    console.log(JSON.stringify(this.partida));
    this.partidaService.create(this.partida).subscribe((result: Partida)=>{
      console.log('La partida '+result.nombre+' a sido creada')
      let pj = new Partidajugador();
      pj.jugadoridjugador = this.jugador.idjugador
      pj.partidaidpartida = result.idpartida;
      this.partidaService.joinGame(pj).subscribe((result: Partida) =>{
        this.partidaService.aspartidActual(result);
        this.open(result.alias);
        //this.router.navigate(['iniciajuego/0']);
      })
    },error => console.log('ocurrio un error al crear la partida'))
  }

  open(alias: String) {
    const modalRef = this.modalService.open(NgbdModalContentComponent);
    modalRef.componentInstance.alias = alias;
    modalRef.componentInstance.nombrejugador = this.jugador.nombre;
  }
}

