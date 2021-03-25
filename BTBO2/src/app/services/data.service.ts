import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { dataGraph } from './data-graph.model';

type EntityResponseType = HttpResponse<dataGraph>;
type EntityResponseTypeArray = HttpResponse<dataGraph[]>;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public resourceUrlApi = 'http://127.0.0.1:8000';

  constructor(protected http: HttpClient) { }

  getGainPerMonth(annee:string): Observable<EntityResponseTypeArray> { 
    return this.http.get<dataGraph[]>
    (`${this.resourceUrlApi}/allGainPerMonthForYear/${annee}`,
     { observe: 'response' })
   }

  getGainPerYear(annee:string) { 
    return this.http.get<any>
    (`${this.resourceUrlApi}/allGainPerMonthForYear/${annee}`,
     { observe: 'response' })
   }

}
