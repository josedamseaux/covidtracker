import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(public _http: HttpClient) { 
    console.log("funcionand");
  }

   urlSummary = 'https://api.covid19api.com/summary';


  getSummary(): Observable<any>{
    return this._http.get<CountryInterface>(this.urlSummary)
  }


  getSummaryArray(){
    return this._http.get(this.urlSummary)
    .pipe(
      map((result) => {
        console.log(result)
         return result['Countries'];
      })
    );
  }


  getCountries():Observable<any>{
    const url= 'https://api.covid19api.com/countries';
    return this._http.get<any>(url)
  }

  getCoronaRealTimeData(country):Observable<any>{
    const url= 'https://api.covid19api.com/total/dayone/country/'+ country;
    return this._http.get<any>(url);
  }

}


export class CountryInterface{


  confirmed ?: number;
  recovered?: number;
  deaths ?: number;
}