import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary } from 'src/app/models/global-data';
//import  '@lottiefiles/lottie-player';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

  
          
})
export class HomeComponent implements OnInit {

  totalConfirmed=0;
  totalActive=0;
  totalDeath=0;
  totalRecovered=0;
  globalData:GlobalDataSummary[];
   datatable=[];

// chart={
//   pieChart:'pieChart',
//   columnChart:'columnChart',
//   height:500,
//   // options: {}

// }  
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
  constructor(private dataService : DataServiceService) { }
  
  ngOnInit(): void {
    this.dataService.getGlobalData()
    .subscribe(
      {
        next : (result)=>{
          console.log(result);
          this.globalData=result;
          result.forEach(cs=>{
            if(!Number.isNaN(cs.confirmed)){
            this.totalConfirmed+=cs.confirmed;
            this.totalActive+=cs.active;
            this.totalDeath+=cs.deaths;
            this.totalRecovered+=cs.recovered;
            }
          })
          this.initChart('c');
        },
        complete : ()=>{
          this.loading = false;
        }
      }
    )
  }

  initChart(caseType: string){
  // this.datatable.push(['Country','Cases']);
  this.datatable = [];
    this.globalData.forEach(cs=>{
      let value:number;
      if(caseType=='c')
      if(cs.confirmed>2000)
      value=cs.confirmed;

      if(caseType=='a')
      if(cs.confirmed>2000)
      value=cs.active;

      if(caseType=='d')
      if(cs.confirmed>2000)
      value=cs.deaths;

      if(caseType=='r')
      if(cs.confirmed>2000)
      value=cs.recovered;

      this.datatable.push([cs.country,value])
    })
console.log(this.datatable);
 
  }


updateChart(input:HTMLInputElement){
  console.log(input.value);
  this.initChart(input.value);
}

my():void{
  let m = new Date();
// document.getElementById("demo").innerHTML = d.getMinutes();
console.log('minutes : ' + m.getMinutes());
let d = new Date();
let curr_date = d.getDate();
let curr_month = d.getMonth() + 1; //Months are zero based
let curr_year = d.getFullYear();
console.log(curr_month + "/" + curr_date + "/" + curr_year);
}

}

