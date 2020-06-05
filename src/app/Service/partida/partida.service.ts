import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import { Partida } from 'src/app/models/partida.model';
import { Partidajugador } from 'src/app/models/partidajugador.model';

@Injectable()
export class PartidaService {
  private part = new Partida();

  /* -------------------------------------------------------------------------------------------------------------- */
  private serviceURL = 'http://localhost:3035/partida';

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  /* -------------------------------------------------------------------------------------------------------------- */

  constructor(private httpClient: HttpClient) {
  }

  /* -------------------------------------------------------------------------------------------------------------- */

  public partidaList(params: any): Observable<any> {
    let url: string = this.serviceURL + '/all';

    return this.httpClient
      .get(url, {headers: this.httpHeaders, params: params});
  }

  /* -------------------------------------------------------------------------------------------------------------- */

  public partidaWin(id: number): Observable<any> {
    let url: string = this.serviceURL + '/ganador/'+id;

    return this.httpClient
      .get(url, {headers: this.httpHeaders});
  }


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

  /*----------------------------------------------------------------------------------------------------------------*/
  /**
   * 
   * @param alias 
   */
  public VerifyPartida(alias: String): Observable<any> {
    let url: string = this.serviceURL + "/find/by/alias/"+alias;
    let headers: any = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient
      .get(url, {headers: headers});
  }

  public joinGame(pj: any): Observable<any> {
    let url: string = this.serviceURL + "/joingame";
    let headers: any = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient
      .post(url, JSON.stringify(pj), {headers: headers});
  }

  /**
   * 
   */
  public partidActual(){
    return this.part;
  }

  /**
   * 
   */
  public aspartidActual(partidaa: Partida){
    this.part = partidaa;
  }

}

