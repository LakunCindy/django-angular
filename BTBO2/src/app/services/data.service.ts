import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { dataGraph, totalGain } from './data-graph.model';

type EntityResponseType_dataGraph = HttpResponse<dataGraph>;
type EntityResponseType_totalGain = HttpResponse<totalGain>;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public resourceUrlApi = 'http://127.0.0.1:8000';

  constructor(protected http: HttpClient) { }

  getGainPerMonthForYear(annee:string): Observable<EntityResponseType_dataGraph> { 
    return this.http.get<dataGraph>
    (`${this.resourceUrlApi}/allGainPerMonthForYear/${annee}`,
     { observe: 'response' })
   }

  getTotalGainForYear(annee:string): Observable<EntityResponseType_totalGain>{ 
    return this.http.get<totalGain>
    (`${this.resourceUrlApi}/totalGainForYear/${annee}`,
     { observe: 'response' })
   }

   getGainPerDayForMonth(annee:string, mois:string): Observable<EntityResponseType_dataGraph>{
    return this.http.get<dataGraph>
    (`${this.resourceUrlApi}/allGainPerDayForAMonth/${annee}/${mois}`,
     { observe: 'response' })
  }

}
