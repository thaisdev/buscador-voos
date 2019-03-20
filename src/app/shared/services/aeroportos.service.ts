import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class AeroportosService {

  constructor(private http: HttpClient) { }

  /**
   * @author Josiane Thaís
   * @since 03/2019
   * Lista os aeroportos
   */
  public getAll() {
    return this.http.get(environment.apiUrl + 'flight/companies').toPromise();
  }
}
