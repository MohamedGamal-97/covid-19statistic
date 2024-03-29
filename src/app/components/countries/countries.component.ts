import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { DateWiseData } from 'src/app/models/date-wise-data';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  data:GlobalDataSummary[];
  countries:string[]=[];
  totalConfirmed=0;
  totalActive=0;
  totalDeath=0;
  totalRecovered=0;
  selectedCountryData:DateWiseData[];
  dateWiseData;
  dataTable=[];

  loading=true;
chart = {
  PieChart : "PieChart" ,
  ColumnChart : 'ColumnChart' ,
  LineChart : "LineChart", 
  height: 500, 
  options: {
    animation:{
      duration: 1000,
      easing: 'out',
    },
    is3D: true
  }  
}

  constructor(private service : DataServiceService) { }

  // ngOnInit(): void {

  //   this.service.getDateWiseData().subscribe(
  //     (result)=>{
  //       // console.log(result);
  //       this.dateWiseData=result;
  //     }
  //   ),
  //   this.service.getGlobalData().subscribe(result=>{
  //     this.data=result;
  //     this.data.forEach(cs=>{
  //       this.countries.push(cs.country);
  //     })
  //   })
  // }

  ngOnInit(): void {

    merge(
      this.service.getDateWiseData().pipe(
        map(result=>{
          this.dateWiseData = result;
        })
      ), 
      this.service.getGlobalData().pipe(map(result=>{
        this.data = result;
        this.data.forEach(cs=>{
          this.countries.push(cs.country)
        })
      }))
    ).subscribe(
      {
        complete : ()=>{
         this.updateValues('US')
         this.loading = false;
        }
      }
    )
    
    

  }

  updateChart(){
    this.dataTable = [];
    // this.dataTable.push(["Date" , 'Cases'])
    this.dataTable.push('Cases')
    this.selectedCountryData.forEach(cs=>{
      this.dataTable.push(cs.cases)
    })
  }
  updateValues(country:string){
    // console.log(country);
    this.data.forEach(cs=>{
      if(cs.country==country){
        this.totalActive=cs.active;
        this.totalConfirmed=cs.confirmed;
        this.totalDeath=cs.deaths;
        this.totalRecovered=cs.recovered;
      }
    })
  this.selectedCountryData=this.dateWiseData[country];
  // console.log(this.selectedCountryData)
  this.updateChart();
  }

}
