import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { dataGraph } from 'src/app/services/data.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-month-gain',
  templateUrl: './month-gain.component.html',
  styleUrls: ['./month-gain.component.css']
})
export class MonthGainComponent implements OnInit {

  sales: dataGraph;

  private data = [
    {"Framework": "1", "Day": ""},
    {"Framework": "2", "Day": ""},
    {"Framework": "3", "Day": ""},
    {"Framework": "4", "Day": ""},
    {"Framework": "5", "Day": ""},
    {"Framework": "6", "Day": ""},
    {"Framework": "7", "Day": ""},
    {"Framework": "8", "Day": ""},
    {"Framework": "9", "Day": ""},
    {"Framework": "10", "Day": ""},
    {"Framework": "11", "Day": ""},
    {"Framework": "12", "Day": ""},
    {"Framework": "13", "Day": ""},
    {"Framework": "14", "Day": ""},
    {"Framework": "15", "Day": ""},
    {"Framework": "16", "Day": ""},
    {"Framework": "17", "Day": ""},
    {"Framework": "18", "Day": ""},
    {"Framework": "19", "Day": ""},
    {"Framework": "20", "Day": ""},
    {"Framework": "21", "Day": ""},
    {"Framework": "22", "Day": ""},
    {"Framework": "23", "Day": ""},
    {"Framework": "24", "Day": ""},
    {"Framework": "25", "Day": ""},
    {"Framework": "26", "Day": ""},
    {"Framework": "27", "Day": ""},
    {"Framework": "28", "Day": ""},
    {"Framework": "29", "Day": ""},
    {"Framework": "30", "Day": ""},
    {"Framework": "31", "Day": ""}

  ];
  private svg;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  constructor(private dataservice: DataService) { }

  ngOnInit() {
    this.getGainPerDayForMonth('2021','3','-1')
  }

  getGainPerDayForMonth(annee:string, mois: string, category:string){
    this.dataservice.getGainPerDayForMonth(annee, mois,category).subscribe(resp => {
        this.sales = resp.body
        for (let i = 1; i<32; i++){
        this.data[i-1].Day = this.sales.days[i].toString();
        }
        console.log(this.data);
        d3.select("svg").remove();
        this.createSvg();
        this.drawBars(this.data)})     
  }

  private createSvg(): void {
    this.svg = d3.select("figure#bar")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
}

private drawBars(data: any[]): void {
  // Create the X-axis band scale
  const x = d3.scaleBand()
  .range([0, this.width])
  .domain(data.map(d => d.Framework))
  .padding(0.2);

  // Draw the X-axis on the DOM
  this.svg.append("g")
  .attr("transform", "translate(0," + this.height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
  .attr("transform", "translate(-10,0)rotate(-45)")
  .style("text-anchor", "end")
  .style("font", "15px arial");

  // Create the Y-axis band scale
  const y = d3.scaleLinear()
  .domain([0, 500])
  .range([this.height, 0]);

  // Draw the Y-axis on the DOM
  this.svg.append("g")
  .call(d3.axisLeft(y))
  .style("font", "15px arial");

  // Create and fill the bars
  this.svg.selectAll("bars")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", d => x(d.Framework))
  .attr("y", d => y(d.Day))
  .attr("width", x.bandwidth())
  .attr("height", (d) => this.height - y(d.Day))
  .attr("fill", "#d04a35");
}

}
