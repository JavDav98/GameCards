import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Jugador } from 'src/app/models/jugador.model';
import { Cartajugador } from 'src/app/models/cartajugador.model';

@Injectable({
  providedIn: 'root'
})
export class JugadaService {  
  /* -------------------------------------------------------------------------------------------------------------- */
  private serviceURL = 'http://localhost:3035/move';

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
   * @param id1 
   * @param id2 
   */
  public dealCards(id1: number, id2: number): Observable<any> {
    let url: string = this.serviceURL + "/deal/cards/"+id1+"/"+id2;
    let headers: any = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient
      .get(url, {headers: headers});
      
  }

  /**
   * 
   * @param id1 
   */
  public notip1(id1: number): Observable<any> {
    let url: string = this.serviceURL + "/notify/p2/"+id1;
    let headers: any = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient
      .get(url, {headers: headers});
  }

  /**
   * 
   * @param idc 
   */
  public cardsJ(idc: number): Observable<any> {
    let url: string = this.serviceURL + "/card/"+idc;
    let headers: any = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient
      .get(url, {headers: headers});
    
  }

  /**
   * 
   * @param idc 
   */
  public listCards(idc: number): Observable<any> {
    let url: string = this.serviceURL + "/list/card/"+idc;
    let headers: any = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient
      .get(url, {headers: headers});
    
  }

  /**
   * 
   * @param cj 
   */
  public removeCard(cj: Cartajugador): Observable<any>{
    let url: string = this.serviceURL + "/remove/cards";
   let headers: any = new HttpHeaders({
     'Content-Type': 'application/json'
   });
   return this.httpClient
     .post(url, JSON.stringify(cj), {headers: headers});
  }

  public notifyDelivery(cj: Cartajugador): Observable<any>{
    let url: string = this.serviceURL + "/notify/delivery";
   let headers: any = new HttpHeaders({
     'Content-Type': 'application/json'
   });
   return this.httpClient
     .post(url, JSON.stringify(cj), {headers: headers});
  }

  public compCard(idc: number): Observable<any>{
    let url: string = this.serviceURL + "/card/"+idc;
    let headers: any = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient
      .get(url, {headers: headers});
  }

  public moveCard(cj: Cartajugador): Observable<any>{
    let url: string = this.serviceURL + "/move/cards";
   let headers: any = new HttpHeaders({
     'Content-Type': 'application/json'
   });
   return this.httpClient
     .post(url, JSON.stringify(cj), {headers: headers});
  }

  public winerGame (i: number, alias: String): Observable<any>{
    let url: string = this.serviceURL + "/winer/"+i+"/"+alias;
    let headers: any = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient
      .get(url, {headers: headers});
  }

  public cleanGame (p1: number, p2: number): Observable<any>{
    let url: string = this.serviceURL + "/clean/game/"+p1+"/"+p2;
    let headers: any = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient
      .get(url, {headers: headers});
  }
}
