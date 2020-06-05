import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PartidaService } from '../../Service/partida/partida.service';
import { NotificationjugadaService } from '../../Service/Jugada/notificationjugada.service';
import {JugadorService} from '../../Service/Jugador/jugador.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Partida } from 'src/app/models/partida.model';
import { Partidajugador } from '../../models/partidajugador.model';
import { partition } from 'rxjs';
import { Jugador } from 'src/app/models/jugador.model';
import { JugadaService } from '../../Service/Jugada/jugada.service';
import { Carta } from '../../models/carta.model';
import { Cartajugador } from '../../models/cartajugador.model';

import { Observable, BehaviorSubject } from 'rxjs';
import { error } from '@angular/compiler/src/util';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-ajugar',
  templateUrl: './ajugar.component.html',
  styleUrls: ['./ajugar.component.css']
})
export class AjugarComponent implements OnInit, OnDestroy {

  // definir "FormGroup" para ingreso de datos por formulario
  public contador: number = 0;
  public jugador = new Jugador();
  public player1 = new Jugador ();
  public player2 = new Jugador ();
  public cg = new Carta();
  public cj1: Array<Cartajugador> = [];
  public cj2: Array<Cartajugador> = [];
  public c1: Array<Carta> =[];
  public c2: Array<Carta> = [];
  public c12: Array<Carta> =[];
  public c22: Array<Carta> = [];
  public idv: number;
  public img1 = 'assets/cartas/';
  public img2 = '.png';
  public ce1 = 'assets/cartas/otro/Carta_vacia.png';
  public ce2 = 'assets/cartas/otro/Carta_vacia.png';
  public carta1 =new Carta();
  public carta2 = new Carta();
  public entrega: Boolean = true;
  public mypartida = new Partida();
  public player = new Jugador ();
  public cont: number = 0;

  // variable reactiva para actualizar interfaz web
  // subject = observable , al cual yo me puedo suscribir
  private mySubject: BehaviorSubject<Jugador>;
  public cartasSubject: BehaviorSubject<any[]>; // = Observable (suscripcion)

  login: boolean = false

  constructor(private _partService: PartidaService,
              private playerService: JugadorService,
              private _playerService: JugadaService,
              private notificationjService: NotificationjugadaService,
              private activatedRoute: ActivatedRoute,
              private modalService: NgbModal){
    this.activatedRoute.params.subscribe( params => {
      this.idv = params['id']
      console.log(this.idv);
    });
                
    this.player = playerService.cjugadorActual();
    this.mySubject = new BehaviorSubject(null);
    this.cartasSubject = new BehaviorSubject(null);
    
    this.mypartida = this._partService.partidActual();    
    console.log('partida actualizada '+this.mypartida.alias);
    
      
      if (this.idv == 1) {  
        this.player1.idjugador = this.mypartida.partidajugador[0].jugadoridjugador;
        this.player2.idjugador = this.mypartida.partidajugador[1].jugadoridjugador;
        console.log('Jugador 2 es'+this.player2.nombre+' en Constructor')   
        this.dealCards(this.mypartida.partidajugador[0].jugadoridjugador, this.mypartida.partidajugador[1].jugadoridjugador,);
      }
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
    this._playerService
      .jugadorList(null)
      .subscribe((result: Jugador) => {
        console.log('RESULTADO:');
      });
  }

  public doNotificationSubscription(): void {
    try {
      this.notificationjService.getJugadorNotification().subscribe(result => {
        this.mySubject.next(result);
      },
      error=>{
        alert('alert subs ERROR');
      });      
    } catch (e) {
      console.log(e);
    }
    
    
  }
  /* ------------------------------------------------------------------------------------------------- */

  public doSubjectSubscription(): void {

    /**Actualiza los datos de la partida en proceso */
    this.mySubject.subscribe((result)=>{
      console.log('mySubject Suscrito' + JSON.stringify(result));
      this._partService.VerifyPartida(this.mypartida.alias).subscribe((parti: Partida)=>{
        this.mypartida = parti;
        if (this.idv == 0) {
          try {            
            this.player1.idjugador = this.mypartida.partidajugador[1].jugadoridjugador;
          } catch (error) {
            console.log('Player1 no ha ingresado '+ error);
          }
          this.player2.idjugador = this.mypartida.partidajugador[0].jugadoridjugador;   
        }else{
          this.player1.idjugador = this.mypartida.partidajugador[0].jugadoridjugador;
          this.player2.idjugador = this.mypartida.partidajugador[1].jugadoridjugador; 
        }

        if (this.mypartida.ganador != 0) {
          this._playerService.cleanGame(this.player1.idjugador, this.player2.idjugador).subscribe(rest =>{
            console.log(JSON.stringify(result));
            if (this.player1.idjugador == this.mypartida.ganador) {
              this.open('¡El ganador es '+this.player1.nombre+'!');
            }else{
              this.open('¡El ganador ers tu!');
            }
          })
          
        }
           
        /*Actualiza datos del Jugador 1*/
        this.playerService.VerifyPlayer(this.player1.idjugador).subscribe((p1: Jugador)=>{
          this.player1 = p1;
          console.log('Actualiza Player1 '+ this.player1.nombre+' cartas:'+this.player1.cartasjugador.length)
          this.actualizarTexto(p1);
        },
        error=>{          
        });

        /*Actualiza datos del Jugador 2*/
        this.playerService.VerifyPlayer(this.player2.idjugador).subscribe((p2: Jugador)=>{
          this.player2 = p2;
          console.log('Actualiza Player2 '+ this.player2.nombre+' cartas: '+this.player2.cartasjugador.length)
          this.actualizaC2(p2);
        },
        error=>{
          alert('Ocurrio un error al actualizar el jugador 2')
        })      

      },
      error => console.log('Error en mySubject subscribe'))
    })

    /**Verifica la entrega de cartas */
    this.mySubject.subscribe((rest: Jugador)=>{
      if (rest != null) {
        if (rest.idjugador == 0) {
          this.cont++;
          console.log('comprueba jugador 0 Cartajugador');
          this.validaCartajugador(rest.cartasjugador[0], rest);
          console.log('validando cartas');  
        }
      }      
    },error => console.log('error en verificacion player 0'))
  }



  /**
   * Actualiza la lista de cartas mostradas por jugador
   * @param cj 
   * @param j 
   */
  public validaCartajugador(cj: Cartajugador, j: Jugador){
    this._playerService.compCard(cj.cartasidcartas).subscribe((c: Carta) =>{
      
      if (cj.jugadoridjugador == this.player1.idjugador) {
        this.carta1 = c;     
        console.log('Asigna Carta1'+this.carta1.nombre+' '+this.carta1.valor);
        this.ce1 = 'assets/cartas/otro/Reverso.png';
      }else if (cj.jugadoridjugador == this.player2.idjugador){
        this.carta2 = c;
        console.log('Asigna Carta2'+this.carta2.nombre+' '+this.carta2.valor);
        this.ce2 = 'assets/cartas/'+c.nombre+'.png';
      }

      if (this.cont == 2) {
        this.comparaCartas(j);
        this.cont = 0;
        this.entrega = true;
      }
    })
  }



  /**
   * Compara las cartas para saber quien gano la vuelta y notifica al servidor
   * @param j 
   */
  public comparaCartas(j: Jugador): void{
    console.log('CArta 1 '+this.carta1.nombre+' '+this.carta1.valor);
    console.log('CArta 2 '+this.carta2.nombre+' '+this.carta2.valor);
    if (this.idv == 0){
      if (this.carta2.valor > this.carta1.valor) {
        //entregar ambas cartas al jugador 2
        let cjj = new Cartajugador();
        cjj.cartasidcartas = this.carta1.idcartas;
        cjj.jugadoridjugador = this.player2.idjugador;
        this._playerService.moveCard(cjj).subscribe(result =>{
          //alert('Carta 2 '+this.carta2.nombre+' > '+'Carta 1 '+this.carta1.nombre)
        })
      }else if (this.carta2.valor < this.carta1.valor){
          let cjj = new Cartajugador();
          cjj.cartasidcartas = this.carta2.idcartas;
          cjj.jugadoridjugador = this.player1.idjugador;
          this._playerService.moveCard(cjj).subscribe(result =>{
            //alert('Carta 1 '+this.carta1.nombre+' > '+'Carta 2 '+this.carta2.nombre)
          })
      }
      if (this.c1.length == 0 || this.c2.length == 0) {
        this.desidirGanador();
      }
    }
    this.mostrarCartas(j);
  }



  /**
   * Decide quien es el ganador y lo notifica al servidor
   */
  public desidirGanador(){
    if (this.c1.length+this.c12.length < this.c2.length+this.c22.length) {
      this._playerService.winerGame(this.player2.idjugador, this.mypartida.alias).subscribe(result=>{
        console.log('El ganador es Player 2 '+JSON.stringify(result));
      })
    }else{
      this._playerService.winerGame(this.player1.idjugador, this.mypartida.alias).subscribe(result=>{
        console.log('El ganador es Player 1 '+JSON.stringify(result));
      })
    }
  }



  mostrarCartas(j: Jugador){
    if (this.carta2.valor > this.carta1.valor) {
      this.c22.push(this.carta2);
      console.log('C22 = '+this.c22.length);
    }else if (this.carta2.valor < this.carta1.valor){
      this.c12.push(this.carta1);
      this.cg = this.carta1;
      console.log('C22 = '+this.c22.length);
    }
    this.ce1 = 'assets/cartas/otro/Carta_vacia.png';
    this.ce2 = 'assets/cartas/otro/Carta_vacia.png';
  }



  /**
   * 
   * @param j Actualiza datos del Jugador
   */
  public actualizarTexto(j: Jugador): void {
    this.cj1 = j.cartasjugador;
    this._playerService.listCards(this.player1.idjugador).subscribe((cards: Carta[])=>{
      this.c1 = cards;
      console.log('Lista jugador1 '+this.c1.length)
    },
    error => alert('Ocurrio un error al obtener la lista de cartas Jugador1'));
  }



  /**
   * Segun los datos recibidos en la notificacion actualiza al Jugador 2
   * @param j 
   */
  public actualizaC2 (j: Jugador){
    if (j != null) {
        this.cj2 = j.cartasjugador;
        this._playerService.listCards(this.player2.idjugador).subscribe((cards: Carta[])=>{
          this.c2 = cards;
          console.log('Lista jugador 2 '+this.c2.length);
          console.log('cartas jugador player2 '+this.c2.length);
        },error => alert('Ocurrio un error al obtener la lista de cartas Jugador2'))
    }
  }



  /*---------------------------------------------------------------------------------------------*/
  /**
   * Invoca el servicio de barajeo y reparticion de cartas
   * @param id1 
   * @param id2 
   */
  public dealCards(id1: number, id2: number): void {

    this._playerService.dealCards(id1, id2)
    .subscribe(result => {
    },
    error => {alert('Ocurrio un error en dealCards Player1 ='+this.player1.idjugador+" Player2 ="+this.player2.idjugador)
    }
    );
  }



  /**
   * Entrega una carta cada ves que se clique sobre ella
   * @param c 
   */
  clickCard(c: Carta){
    //alert('Las casrtas de P2 = ' + this.c2.length+' '+c.nombre)
    if (this.entrega) {
      let cjj = new Cartajugador();
      cjj.jugadoridjugador = this.player.idjugador;
      cjj.cartasidcartas = c.idcartas;
      this.entrega = false;
      console.log('Carta a remover: ' +JSON.stringify(cjj))
      this._playerService.notifyDelivery(cjj).subscribe(res=>{
        this._playerService.removeCard(cjj).subscribe(result=>{});
      });
    }

  }

  open(nombre: string) {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = nombre;
  }
}

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">¡La partida a Finalizado!</h4>
    </div>
    <div class="modal-body">
      <p>{{name}}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="link()" (click)="activeModal.close('Close click')">Continuar</button>
    </div>
  `
})

export class NgbdModalContent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal,public router: Router) {}
  
  link(){
    this.router.navigate(['/joingame']);
  }
}

