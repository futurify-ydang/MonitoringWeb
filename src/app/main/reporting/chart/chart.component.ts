import { Component, OnInit, Input } from '@angular/core';
import { Report } from '../model/report.model';
import { Chart } from '../model/chart.model';
import { TOTAL_HEIGHT_COLUMN_CHART, HEIGHT_CELL_CHART, HEIGHT_CELL_TEXT } from '../view-report/view-report.component';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  totalHeightColumn = TOTAL_HEIGHT_COLUMN_CHART;
  heightCell = HEIGHT_CELL_CHART;
  heightCellText = HEIGHT_CELL_TEXT;
  colorColumns = ['blue','orange', 'green', 'yellow', 'pink', 'red', 'grey', 'aqua', 'violet', 'purple'];
  @Input() model: Chart;
  constructor() { }

  ngOnInit() {
    
    // this.initFakeData();

  }
  initFakeData(){
    this.model = new Chart();
    this.model.scopeName = 'GROUP 1';
    this.model.columnAnserCharts = [
      {
        answer: 'YES',
        columnCharts: [
          {
            timeName: 2017,
            textValue: '6/30',
            value: 0.2*this.totalHeightColumn
          },
          {
            timeName: 2018,
            textValue: '15/30',
            value: 0.5*this.totalHeightColumn
          },
          {
            timeName: 2019,
            textValue: '12/30',
            value: 0.4*this.totalHeightColumn
          }
        ]
      },
      {
        answer: 'NO',
        columnCharts: [
          {
            timeName: 2017,
            textValue: '6/30',
            value: 0.2*this.totalHeightColumn
          },
          {
            timeName: 2018,
            textValue: '15/30',
            value: 0.5*this.totalHeightColumn
          },
          {
            timeName: 2019,
            textValue: '12/30',
            value: 0.4*this.totalHeightColumn
          }
        ]
      },
      {
        answer: 'THE SAME',
        columnCharts: [
          {
            timeName: 2017,
            textValue: '6/30',
            value: 0.2*this.totalHeightColumn
          },
          {
            timeName: 2018,
            textValue: '15/30',
            value: 0.5*this.totalHeightColumn
          },
          {
            timeName: 2019,
            textValue: '12/30',
            value: 0.4*this.totalHeightColumn
          }
        ]
      }
    ];
  }

}
