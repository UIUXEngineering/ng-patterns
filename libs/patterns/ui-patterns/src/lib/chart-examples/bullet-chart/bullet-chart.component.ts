import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import { BulletChartConfig, BulletChartData, BulletChartToolTip, UiBulletChartModule } from '@uiux/charts/bullet-chart';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReplaySubject } from 'rxjs';
import { PushModule } from '@ngrx/component';
import { BulletChartConfigComponent } from './sample/bullet-chart-config/bullet-chart-config.component';
import { BulletChartDataModule } from './sample/bullet-chart-data/bullet-chart-data.module';

@Component({
  selector: 'pat-bullet-chart',
  standalone: true,
  imports: [
    CommonModule,
    UiBulletChartModule,
    MatTooltipModule,
    PushModule,
    BulletChartConfigComponent,
    BulletChartDataModule
  ],
  templateUrl: './bullet-chart.component.html',
  styleUrls: ['./bullet-chart.component.scss']
})
export class BulletChartComponent {
  private _config: BulletChartConfig = {
    // heightBasedOnData: true,
    maxTooltipWidth: 50
  };

  reversed = false;

  config$: ReplaySubject<BulletChartConfig>;
  data$: ReplaySubject<BulletChartData>;
  tooltip$: ReplaySubject<BulletChartToolTip>;
  units$: ReplaySubject<string>;

  constructor() {
    this.data$ = new ReplaySubject<BulletChartData>(1);
    this.tooltip$ = new ReplaySubject<BulletChartToolTip>(1);
    this.config$ = new ReplaySubject<BulletChartConfig>(1);
    this.units$ = new ReplaySubject<string>(1);
  }

  ngOnInit(): void {
    this.data$.next({
      max: 2,
      min: 0,
      progress: 1.96,
      units: 'GB',
      chartDataState: null
    });
  }

  onConfigChange(c: Partial<BulletChartConfig>) {
    this.config$.next({
      ...this._config,
      ...c
    });
  }

  onDataChange(c: BulletChartData) {
    this.units$.next(c && c.units !== undefined ? c.units : '');
    this.data$.next({
      ...c
    });
  }
}
