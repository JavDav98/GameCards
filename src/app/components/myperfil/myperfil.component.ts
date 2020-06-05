import { Component, OnInit } from '@angular/core';
import { JugadorService } from 'src/app/Service/Jugador/jugador.service';
import { Jugador } from 'src/app/models/jugador.model';
import { NgForm } from '@angular/forms';
import { PartidaService } from 'src/app/Service/partida/partida.service';
import { Partida } from 'src/app/models/partida.model';

@Component({
  selector: 'app-myperfil',
  templateUrl: './myperfil.component.html',
  styleUrls: ['./myperfil.component.css']
})
export class MyperfilComponent implements OnInit {
public yo: Jugador;
public pj: number;
public pg: number;

  constructor(private jugadorService: JugadorService, private partidaService: PartidaService) { 
    this.yo = this.jugadorService.j1;
    this.jugadorService.VerifyPlayer(this.jugadorService.cjugadorActual().idjugador).subscribe((result: Jugador)=>{
      this.yo = result;
      this.jugadorService.j1 = result;
      this.pj = this.yo.partidajugador.length;
    })
    this.partidaService.partidaWin(this.yo.idjugador).subscribe((result: Partida[])=>{
      this.pg = result.length;
    })
  }

  ngOnInit(): void {
  }

  actualizar(form: NgForm){
    this.jugadorService.create(this.yo).subscribe((result: Jugador)=>{
      this.jugadorService.j1 = result;
      this.yo = result;
      alert('Datos Actualizados');
    })
  }

}
