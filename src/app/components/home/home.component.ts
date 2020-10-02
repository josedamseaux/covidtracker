import { Component, OnInit } from '@angular/core';
import { ServicioService, CountryInterface } from '../../servicio/servicio.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {




  Global:CountryInterface = new CountryInterface();
   
  countries:any[];
  country:any[] = [];
  
  chartCountry:any[];
// INDIVIDUAL
  confirmed = 0;
  recovered = 0;
  deaths = 0;

//SUMMARY
  newConfirmed = 0;
  newDeaths = 0;
  newRecovered = 0;

  totalConfirmed = 0;
  totalDeaths = 0;
  totalRecovered = 0;

  newnewconfirmed;

  dateDay: number = new Date().getDate();
  dateMonth: number = new Date().getMonth() + 1;
  dateYear:number = new Date().getFullYear();

  date = `${this.dateDay}, ${this.dateMonth}, ${this.dateYear}`

  // tslint:disable-next-line: variable-name
  constructor(public _data: ServicioService,
              // tslint:disable-next-line: variable-name
              public _http: HttpClient) {}


//   ngOnChart(){

//     let datatable = [];
//     datatable.push(['Country', 'Deaths']);
//     this._data.getSummaryArray().subscribe(
//        (resp) => {
//       this.countries = resp;
//       this.countries.forEach(element => {
//         if(element.TotalConfirmed > 130000) {

//         datatable.push([element.Country, element.TotalDeaths]);
//         }
//       });
//     });

//     this.pieChart = {
//       chartType: 'PieChart',
//       dataTable: datatable,
//       options : {
//         height: 400,
//         width: 310,
//         responsive: true,
//         fontSize: 10,
//         title: 'Global chart: total deaths'
//       }
//    }
//     this.columnChart = {
//       chartType: 'ColumnChart',
//       dataTable: datatable,
//       options : {
//         height: 400,
//         width: 310,
//         responsive: true,
//         fontSize: 9,
//         title: 'Column global chart: total deaths'

//       }
//  }


//       this.lineChart = {
//         chartType: 'LineChart',
//         dataTable: [
//           ['Year', 'Deaths', 'Cases', 'Recovered'],
//           ['january, 2020', 0, 0, 0],
//           ['agoust, 2020', 410006, 7105698, 3800120]
//         ],
//         options : {
//           height: 300,
//           width: 310,
//           responsive: true,
//           fontSize: 8.5,
//           title: 'Deaths, cases and recovered chart'

          


//         }
//       }


//   }

 elementCountry:any[];
 elementDeaths:any[];



  public doughnutChartLabels: Label[] = [];

  public doughnutChartData: MultiDataSet[] = [];

  public doughnutChartType: ChartType = 'doughnut';

  public doughnutChartColors: Array<any> = [ { backgroundColor: ['#A0EAFF', '#4ce7b9', '#FFCB8C', '#F08080','#808000','#008000', '#008080', '#800080', '#89FF6C'], borderColor: 'transparent' } ];

  ngOnInit() {    

    this.getCountryData();
    this.getSummaryData();

    // this.ngOnChart();
    this._data.getSummaryArray().subscribe(
      (resp) => {
        console.log(resp)
        this.chartCountry = resp;
        this.chartCountry.forEach(element => {
          
        if(element.TotalConfirmed > 700000) {
        this.doughnutChartLabels.push(element.Country);
       
        this.doughnutChartData.push([element.TotalDeaths]);



        }});
        });
    
  }


  // tslint:disable-next-line: typedef
  getCountryData(){
    this._data.getCountries().subscribe((data)=>{
      console.log(data)
      this.countries = data.Country;
    });
  }

  // tslint:disable-next-line: typedef
  getSummaryData(){
    this._data.getSummary().subscribe( 

      (dataSummary) =>{
        console.log(dataSummary)

        this.newConfirmed = dataSummary.Global.NewConfirmed;
        this.newnewconfirmed = dataSummary.Global.NewConfirmed;
        this.newDeaths = dataSummary.Global.NewDeaths;
        this.newRecovered = dataSummary.Global.NewRecovered;
        this.totalConfirmed = dataSummary.Global.TotalConfirmed;
        this.totalDeaths = dataSummary.Global.TotalDeaths;
        this.totalRecovered = dataSummary.Global.TotalRecovered;
        this.countries = dataSummary.Countries;

    });
  }


  
   getCoronaData(){
    this._data.getCoronaRealTimeData(this.country).subscribe((data)=>{
      console.log(data)
      var index = data.length - 1
      this.confirmed = data[index].Confirmed
      this.recovered = data[index].Recovered
      this.deaths = data[index].Deaths

    })
  }
      
  getCountry(country:any){
    this.country=country;
  }

}
