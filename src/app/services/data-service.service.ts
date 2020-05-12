import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { GlobalDataSummary } from '../models/global-data';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private globalDataUrl = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/05-09-2020.csv`;
  // http: any;
  // private globalDataUrl = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/04-17-2020.csv`;

  constructor(private http : HttpClient ) { }

  getGlobalData(){
    return this.http.get(this.globalDataUrl, {responseType : 'text'}).pipe(
      map(result=>{
        // console.log(result);
        let data:GlobalDataSummary[]=[];
        let rows=result.split('\n');
        // console.log(rows);
        rows.splice(0,1);
        rows.forEach(row => {
          let cols=row.split(/,(?=\S)/);
          // console.log(cols);
          
          data.push({
            country:cols[3],
            confirmed:+cols[7],
            deaths:+cols[8],
            recovered:+cols[9],
            active:+cols[10],
          })
        });
          console.log(data);

        return [];
      })
    )
  }
}
