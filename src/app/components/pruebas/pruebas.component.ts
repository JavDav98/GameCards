import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm} from '@angular/forms';
import { NotificationJService } from '../../Service/Jugador/notificationj.service';
import { JugadorService } from '../../Service/Jugador/jugador.service';
import {BehaviorSubject} from 'rxjs';

import {ChartDataSets} from 'chart.js';
import {BaseChartDirective, Color, Label} from 'ng2-charts';
import { Jugador } from 'src/app/models/jugador.model';

@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.component.html',
  styleUrls: ['./pruebas.component.css']
})
export class PruebasComponent implements OnInit{
  // definir "FormGroup" para ingreso de datos por formulario
  public jugador = new Jugador();
  public contador: number = 0;


  public texto: String = 'empty';
  public texto2: String = 'texto2';


  // variable reactiva para actualizar interfaz web
  // subject = observable , al cual yo me puedo suscribir
  private mySubject: BehaviorSubject<Jugador>;

  public dataListArray: Array<any>;
  public dataListSubject: BehaviorSubject<any[]>; // = Observable (suscripcion)
 
  constructor(private notificationjService: NotificationJService,
              private jService: JugadorService) {

    this.mySubject = new BehaviorSubject(null);
    this.dataListArray = new Array<any>();
    this.dataListSubject = new BehaviorSubject(null);


    // realizar suscripcion
    this.doNotificationSubscription();
  }

  public actualizarTexto(result: any): void {
    this.texto = this.texto + ' ' + JSON.stringify(result);
  }
  /* ------------------------------------------------------------------------------------------------- */

  public doNotificationSubscription(): void {
    try {
      this.notificationjService.getJugadorNotification().subscribe(result =>{
        alert('alert subs');
        console.log('doNotificationSubscription Mensaje recibido:' + JSON.stringify(result));
          
        this.mySubject.next(result);
      })
    } catch (e) {
      console.log(e);
    }
  }
  /* ------------------------------------------------------------------------------------------------- */

  public doSubjectSubscription(): void {
    this.mySubject.subscribe((result) => {
      alert('doSubjectSubscription texto');
      this.actualizarTexto(result);
    });


    this.mySubject.subscribe((result) => {
      this.texto2 = this.texto2 + JSON.stringify(result);
    });

  }

  /* -------------------------------------------------------------------------------------------------------------------------------- */

  ngOnInit(): void {

    console.log('on init');


    // realizar subscription para subject (actualiza texto)
    this.doSubjectSubscription();

    // ejecutar llamada de servicio restful al iniciar la aplicacion
    this.jService
      .jugadorList(null)
      .subscribe((result) => {
        console.log('RESULTADO:' + JSON.stringify(result));
      });


  }

  /* ---------------------------------------------------------------------------------------------*/
  public enviarFormulario(forma: NgForm): void {
    console.log('Datos de formulario:' + JSON.stringify(this.jugador));

    console.log('Datos a enviar:' + JSON.stringify(this.jugador));

    this.jService.create(this.jugador)
      .subscribe(result => {
        console.log('Datos from server:' + JSON.stringify(result));
      });
  }

}
