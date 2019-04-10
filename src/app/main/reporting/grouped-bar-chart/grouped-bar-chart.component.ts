import { Component, OnInit, Input } from '@angular/core';
import { GroupedChart } from '../model/grouped-vertical-bar-chart.model';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-grouped-bar-chart',
  templateUrl: './grouped-bar-chart.component.html',
  styleUrls: ['./grouped-bar-chart.component.scss']
})
export class GroupedBarChartComponent implements OnInit {

  @Input() model: GroupedChart[];
  @Input() isVertical: boolean = true;
  @Input() legendTitle: string;
  @Input() showDefaultLegend: boolean = true;
  @Input() showXAxisLabel: boolean = false;
  @Input() showYAxisLabel: boolean = false;
  @Input() xAxisLabel: string;
  @Input() yAxisLabel: string;
  @Input() keyLangYAxisLabel: string;
  @Input() showDataLabel = false;
  currLanguage: string;
  single: any[];
  view: any[] = [1000, 500];
  // options
  numberOfColumns: number = 1;
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  roundDomains = true;
  barPadding = 0;
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
    if(this.model && this.model.length > 0){
      this.numberOfColumns = this.model.length * this.model[0].series.length;
    }
    let widthLeft = 50 * this.numberOfColumns;
    let widthMainAxis = 97;
    if (this.isVertical) {
      this.view = [widthMainAxis + widthLeft, 500];
    }
    else {
      this.view = [800, widthMainAxis + widthLeft];
    }
    let multi = this.model;
    console.log(this.model);
    Object.assign(this, { multi })
  }

}
export const ELEMENT_DATA_COLOR_SCHEME = ['#80DEEA', '#E0F7FA', '#C7B42C', '#AAAAAA', 'red', 'orange', 'yellow', 'blue', 'pink', 'purple'];