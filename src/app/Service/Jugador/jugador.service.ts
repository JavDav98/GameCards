import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Jugador } from 'src/app/models/jugador.model';

@Injectable({
  providedIn: 'root'
})
export class JugadorService {
  public j1 = new Jugador();
  
   /* -------------------------------------------------------------------------------------------------------------- */
   private serviceURL = 'http://localhost:3035/jugador';

   private httpHeaders = new HttpHeaders({
     'Content-Type': 'application/json',
     'Accept': 'application/json'
   });
 
   /* -------------------------------------------------------------------------------------------------------------- */
 
   constructor(private httpClient: HttpClient) {
   }
 
   /* -------------------------------------------------------------------------------------------------------------- */
 
   public jugadorList(params: any): Observable<any> {
     let url: string = this.serviceURL + '/all';
 
     return this.httpClient
       .get(url, {headers: this.httpHeaders, params: params});
   }
 
   /* -------------------------------------------------------------------------------------------------------------- */
 
   /**
    * Servicio de envio de POST
    * @param model
    */
   public create(model: any): Observable<any> {
     let url: string = this.serviceURL + "/new";
     let headers: any = new HttpHeaders({
       'Content-Type': 'application/json'
     });
     return this.httpClient
       .post(url, JSON.stringify(model), {headers: headers});
   }

    /* -------------------------------------------------------------------------------------------------------------- */
 
   /**
    * Servicio de envio de POST
    * @param model
    */
   public joinGame(model: any): Observable<any> {
    let url: string = this.serviceURL + "/joingame";
    let headers: any = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient
      .post(url, JSON.stringify(model), {headers: headers});
  }

   /**
    * 
    * @param nombre 
    * @param password 
    */
  public VerifyUser(nombre: String, password: String): Observable<any> {
    let url: string = this.serviceURL + "/find/by/nombre/"+nombre+"/pass/"+password;
    let headers: any = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient
      .get(url, {headers: headers});
  }

  /**
   * 
   * @param id 
   */
  public VerifyPlayer(id: number): Observable<any> {
    let url: string = this.serviceURL + "/find/by/id/"+id;
    let headers: any = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient
      .get(url, {headers: headers});
  }

  /**
   * 
   */
  public cjugadorActual(){
    return this.j1;
  }
 }
 
 