import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { dataGraph, totalGain, Impot } from './data.model';

type EntityResponseType_dataGraph = HttpResponse<dataGraph>;
type EntityResponseType_totalGain = HttpResponse<totalGain>;
type EntityResponseType_Impot = HttpResponse<Impot>;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public resourceUrlApi = 'http://127.0.0.1:8000';

  constructor(protected http: HttpClient) { }

  getGainPerMonthForYear(annee:string, category:string): Observable<EntityResponseType_dataGraph> { 
    return this.http.get<dataGraph>
    (`${this.resourceUrlApi}/allGainPerMonthForYear/${annee}/${category}`,
     { observe: 'response' })
   }

  getTotalGainForYear(annee:string): Observable<EntityResponseType_totalGain>{ 
    return this.http.get<totalGain>
    (`${this.resourceUrlApi}/totalGainForYear/${annee}`,
     { observe: 'response' })
   }

  getGainPerDayForMonth(annee:string, mois:string, category:string): Observable<EntityResponseType_dataGraph>{
    return this.http.get<dataGraph>
    (`${this.resourceUrlApi}/allGainPerDayForAMonth/${annee}/${mois}/${category}`,
     { observe: 'response' })
  }

  Impot(annee:string): Observable<EntityResponseType_Impot>{
    return this.http.get<Impot>
    (`${this.resourceUrlApi}/impot/${annee}`,
     { observe: 'response' })
  }

}
