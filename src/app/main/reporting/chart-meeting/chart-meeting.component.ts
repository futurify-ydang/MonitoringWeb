import { Component, OnInit, Input } from '@angular/core';
import { GroupedChart } from '../model/grouped-vertical-bar-chart.model';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'chart-meeting',
  templateUrl: './chart-meeting.component.html',
  styleUrls: ['./chart-meeting.component.scss']
})
export class ChartMeetingComponent implements OnInit {

  @Input() model: any;
  @Input() isFirst: boolean = false;
  @Input() numberOfColumns: number = 1;
  @Input() legendTitle: string;
  @Input() showDefaultLegend: boolean = true;
  @Input() showYAxis: boolean = true;
  @Input() showXAxisLabel: boolean = true;
  @Input() showYAxisLabel: boolean = true;
  @Input() xAxisLabel: string;
  @Input() yAxisLabel: string;

  @Input() maxValue: number;
  currLanguage: string;
  single: any[];
  multi: any[];

  view: any[] = [1000, 500];
  // options
  showXAxis = true;
  gradient = false;
  roundDomains = true;
  barPadding = 0;
  showDataLabel = true;
  colorScheme = {
    domain: ELEMENT_DATA_COLOR_SCHEME
  };

  constructor(
    private _translateService: TranslateService
  ) {
    this.currLanguage = this._translateService.currentLang.toLowerCase();
    this._translateService.onLangChange.subscribe((params: LangChangeEvent) => {
      this.currLanguage = params.lang.toLowerCase();
    });
  }

  ngOnInit() {
    if(this.maxValue <= 100){
      this.maxValue = 100;
    }
    if (this.model.Groups && this.model.Groups.length > 0) {
      this.numberOfColumns = this.model.Groups.length * this.model.Groups[0].series.length;
    }
    let widthChartColumns = 60 * this.numberOfColumns;
    if (this.isFirst) {
      var lengthOfYAxis = 97;
      if(this.maxValue > 100){
        // Ex: max value 1000 -> need to increase size's width of y axis 14
        // 10000 -> increase 21
        let widthNeedToIncrease = parseInt((this.maxValue/100).toString()).toString().length * 7;
        lengthOfYAxis = 97 + widthNeedToIncrease;
      }
      this.view = [lengthOfYAxis + widthChartColumns, 500];
    }
    else {
      this.view = [40 + widthChartColumns, 500];
    }
    let multi = this.model.Groups;
    Object.assign(this, { multi })
  }

}
export const ELEMENT_DATA_COLOR_SCHEME = ['#80DEEA', '#19C5FC', '#C7B42C', '#AAAAAA', 'red', 'orange', 'yellow', 'blue', 'pink', 'purple'];