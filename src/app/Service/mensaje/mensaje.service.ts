import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Jugador } from 'src/app/models/jugador.model';
import { Mensaje } from 'src/app/models/mensaje.model';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {private serviceURL = 'http://localhost:3035/mensaje';

private httpHeaders = new HttpHeaders({
  'Content-Type': 'application/json',
  'Accept': 'application/json'
});

/* -------------------------------------------------------------------------------------------------------------- */

constructor(private httpClient: HttpClient) {
}

/* -------------------------------------------------------------------------------------------------------------- */

public mensajeList(params: any): Observable<any> {
  let url: string = this.serviceURL + '/all';

  return this.httpClient
    .get(url, {headers: this.httpHeaders, params: params});
}

/* -------------------------------------------------------------------------------------------------------------- */

/**
 * Servicio de envio de POST
 * @param model
 */
public create(model: Mensaje): Observable<any> {
  let url: string = this.serviceURL + "/notify";
  let headers: any = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  return this.httpClient
    .post(url, JSON.stringify(model), {headers: headers});
}
}
