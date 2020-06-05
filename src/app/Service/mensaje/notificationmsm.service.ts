import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
//import {EventSourcePolyfill} from 'ng-event-source';
import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';
import { Mensaje } from 'src/app/models/mensaje.model';

declare var EventSourcePolyfill: any;
const EventSource = NativeEventSource || EventSourcePolyfill;

@Injectable({
  providedIn: 'root'
})
export class NotificationmsmService {

  private serviceURL = 'http://localhost:3035/mensaje';



  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  /* -------------------------------------------------------------------------------------------------------------- */

  constructor(private httpClient: HttpClient) {
  }

  /* -------------------------------------------------------------------------------------------------------------- */

  /**
   * Servicio que permite la conexion hacia el servicio reactivo,
   * dicha funcion retorna
   */
  public getJugadorNotification(): Observable<any> {

    // creando un observable ... que este conectado mediante un "EventSource"
    return Observable.create((observer) => {

      const url: any = this.serviceURL + '/notification/sse';

      // definiendo conexion de event source ... asi como los eventos que estara escuchando
      const eventSource = new EventSource(url);

      eventSource.onmessage = (event: MessageEvent) => {
        console.log('Received event: ', event);
      };
      // verificar los "event" definidos para los flujos en el server
      eventSource.addEventListener('mensaje-result', function (event) {
        let j = new Mensaje();
        j = JSON.parse(event.data)
        observer.next(j);    
      });

      // verificar los "event" definidos para los flujos en el server
      eventSource.addEventListener('heartbeat-result', function (event) {
        console.log('eventSource.addEventListener: on heartbeat....');
      });

      return () => eventSource.close();
    });
  }

  /* -------------------------------------------------------------------------------------------------------------- */

}
