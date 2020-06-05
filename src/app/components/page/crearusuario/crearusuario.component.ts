import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { JugadorService } from 'src/app/Service/Jugador/jugador.service';
import { Jugador } from 'src/app/models/jugador.model';

@Component({
  selector: 'app-crearusuario',
  templateUrl: './crearusuario.component.html',
  styleUrls: ['./crearusuario.component.css']
})
export class CrearusuarioComponent implements OnInit {

  jugador = new Jugador();

  constructor(public activeModal: NgbActiveModal, private jugadorService: JugadorService) {}

  ngOnInit(): void {
  }

  crear(form: NgForm){
    this.jugadorService.create(this.jugador).subscribe((result: Jugador)=>{
      alert('El jugador '+result.nombre+' fue creado correctamente');
    })
  }

}
