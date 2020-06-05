import { Component, OnInit, Input } from '@angular/core';
import { Mensaje } from 'src/app/models/mensaje.model';
import { Jugador } from 'src/app/models/jugador.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JugadorService } from 'src/app/Service/Jugador/jugador.service';
import { MensajeService } from '../../../Service/mensaje/mensaje.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ngbd-modal-content',
  templateUrl: './ngbd-modal-content.component.html',
  styleUrls: ['./ngbd-modal-content.component.css']
})
export class NgbdModalContentComponent implements OnInit {
  @Input() alias;
  @Input() nombrejugador;
  mens = new Mensaje();
  jugadores: Array<Jugador> = [];

  constructor(public activeModal: NgbActiveModal, public jugadorService: JugadorService, public mensajeService: MensajeService, public router: Router) {
    jugadorService.jugadorList(null).subscribe((result: Jugador[])=>{
      this.jugadores = result;
    })
  }

  ngOnInit(): void {
  }

  enviarMensaje(j: Jugador){
    this.mens.idj = j.idjugador;
    this.mens.alias = this.alias;
    this.mens.nombrejugador = this.nombrejugador;
    this.mensajeService.create(this.mens).subscribe((result: Mensaje)=>{
      alert('Se ha enviado la solicitud');
      this.router.navigate(['iniciajuego/0']);
    },error=> console.log('A ocurrido un error al enviar el mensaje'))
  }

  asignaIdj(i: number){
  }
}