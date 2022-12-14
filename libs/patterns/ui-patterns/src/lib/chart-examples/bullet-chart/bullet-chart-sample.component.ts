import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BulletChartConfig,
  BulletChartData,
  BulletChartToolTip,
  UiuxBulletChartModule
} from '@uiux/charts/bullet-chart';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { PushModule } from '@ngrx/component';
import { SampleBulletChartConfigComponent } from './sample/bullet-chart-config/sample-bullet-chart-config.component';
import { bulletChartConfigInitial, bulletChartDataInitial } from './sample/bullet-chart-data-initial';
import { SampleBulletChartDataComponent } from './sample/bullet-chart-data/sample-bullet-chart-data.component';

@Component({
  selector: 'pat-bullet-chart',
  standalone: true,
  imports: [
    CommonModule,
    UiuxBulletChartModule,
    MatTooltipModule,
    PushModule,
    SampleBulletChartConfigComponent,
    SampleBulletChartDataComponent
  ],
  templateUrl: './bullet-chart-sample.component.html',
  styleUrls: ['./bullet-chart-sample.component.scss'],
  host: {
    class: 'sample-page-layout'
  }
})
export class BulletChartSampleComponent implements OnInit {
  private _config: Partial<BulletChartConfig> = {
    // heightBasedOnData: true,
    maxTooltipWidth: 50
  };

  reversed = false;

  config$: ReplaySubject<BulletChartConfig>;
  data$: ReplaySubject<BulletChartData>;
  tooltip$: ReplaySubject<BulletChartToolTip>;
  units$: ReplaySubject<string>;

  title$: Observable<string>;
  description$: Observable<string>;

  constructor() {
    this.data$ = new ReplaySubject<BulletChartData>(1);
    this.tooltip$ = new ReplaySubject<BulletChartToolTip>(1);
    this.config$ = new ReplaySubject<BulletChartConfig>(1);
    this.units$ = new ReplaySubject<string>(1);

    this.title$ = this.config$.pipe(map((config: BulletChartConfig) => config.title ))
    this.description$ = this.config$.pipe(map((config: BulletChartConfig) => config.description ))
  }

  ngOnInit(): void {
    this.data$.next(bulletChartDataInitial);
    this.config$.next(bulletChartConfigInitial);
  }

  onConfigChange(c: BulletChartConfig) {
    this.config$.next(<BulletChartConfig>{
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
