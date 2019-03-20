import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class VooService {

  constructor(private http: HttpClient) { }

  /**
   * @author Josiane Thaís
   * @since 03/2019
   * Lista de voos por dia
   */
  public getByDate(params: any) {
    return this.http.post(environment.apiUrl + 'flight', params).toPromise();
  }
}
