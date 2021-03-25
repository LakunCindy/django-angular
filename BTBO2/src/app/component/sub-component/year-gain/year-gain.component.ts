import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { dataGraph, totalGain } from 'src/app/services/data-graph.model';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-year-gain',
  templateUrl: './year-gain.component.html',
  styleUrls: ['./year-gain.component.css']
})
export class YearGainComponent implements OnInit {

  sales: dataGraph;

  totalgain : totalGain;
  total : string;

  private data = [
    {"Framework": "Janvier", "Month": ""},
    {"Framework": "Février", "Month": ""},
    {"Framework": "Mars", "Month": ""},
    {"Framework": "Avril", "Month": ""},
    {"Framework": "Mai", "Month": ""},
    {"Framework": "Juin", "Month": ""},
    {"Framework": "Juillet", "Month": ""},
    {"Framework": "Aout", "Month": ""},
    {"Framework": "Septembre", "Month": ""},
    {"Framework": "Octobre", "Month": ""},
    {"Framework": "Novembre", "Month": ""},
    {"Framework": "Décembre", "Month": ""}
  ];
  private svg;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  constructor(private dataservice: DataService) { }

  ngOnInit() {
    this.getGainPerMonthForYear("2021")
     }

  getGainPerMonthForYear(annee:string){
    this.dataservice.getGainPerMonthForYear(annee).subscribe(resp => {
        this.sales = resp.body
        for (let i = 1; i<13; i++){
        this.data[i-1].Month = this.sales.months[i].toString();
        }
        d3.select("svg").remove();
        this.createSvg();
        this.drawBars(this.data)})    
  }

  getTotalGainForYear(annee:string){
    this.dataservice.getTotalGainForYear(annee).subscribe(resp => {
        this.totalgain = resp.body
        this.total = this.totalgain.totalGainPerYear.toString()
      })}

  private createSvg(): void {
    this.svg = d3.select("figure#bar")
    .append("svg")
    .attr("width", this.width + (this.margin * 2.5))
    .attr("height", this.height + (this.margin * 2.5))
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
  .style("text-anchor", "end");

  // Create the Y-axis band scale
  const y = d3.scaleLinear()
  .domain([0, 1000])
  .range([this.height, 0]);

  // Draw the Y-axis on the DOM
  this.svg.append("g")
  .call(d3.axisLeft(y));

  // Create and fill the bars
  this.svg.selectAll("bars")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", d => x(d.Framework))
  .attr("y", d => y(d.Month))
  .attr("width", x.bandwidth())
  .attr("height", (d) => this.height - y(d.Month))
  .attr("fill", "#d04a35");
}

}
