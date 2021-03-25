import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { dataGraph } from 'src/app/services/data-graph.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-month-gain',
  templateUrl: './month-gain.component.html',
  styleUrls: ['./month-gain.component.css']
})
export class MonthGainComponent implements OnInit {

  sales: dataGraph;

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
    this.getGainPerMonth('2021')
    this.createSvg();
    this.drawBars(this.data);
  }

  getGainPerMonth(annee:string){
    this.dataservice.getGainPerMonth(annee).subscribe(resp => {console.log(this.sales = resp.body)})
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
  .style("text-anchor", "end");

  // Create the Y-axis band scale
  const y = d3.scaleLinear()
  .domain([0, 200000])
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
