import { Component, EventEmitter, OnInit } from '@angular/core';
import { TransactionChartComponent } from '../../components/transaction-chart/transaction-chart.component';
import { CommonModule } from '@angular/common';

import {
  CompactType,
  DisplayGrid,
  Draggable,
  GridsterComponent,
  GridsterConfig,
  GridsterItem,
  GridsterItemComponent,
  GridType,
  PushDirections,
  Resizable,
} from 'angular-gridster2';
import { TransactionChartComponent } from "../../components/transaction-chart/transaction-chart.component";
//import { DashboardElementComponent } from "../../components/dashboard-element/dashboard-element.component";

interface Safe extends GridsterConfig {
  draggable: Draggable;
  resizable: Resizable;
  pushDirections: PushDirections;
}

interface item2 extends GridsterItem {
  type?: string;
}

@Component({
  selector: 'grid-layout-dashboard',
  templateUrl: './grid-layout.component.html',
  imports: [GridsterComponent, GridsterItemComponent, TransactionChartComponent],
  styles:
  `
  ::ng-deep .custom-gridster {
    background-color: #111827 !important;
  }
  ::ng-deep .custom-gridster-item {
    background-color: #293650 !important;
  }
  `
})
export default class GridLayoutComponent {
  options!: Safe;
  dashboard!: Array<item2>;

  resizeEvent: EventEmitter<GridsterItem> = new EventEmitter<GridsterItem>();

  ngOnInit(): void {
    this.options = {
      gridTypes: GridType.ScrollVertical,
      compactType: CompactType.CompactUp,
      margin: 10,
      outerMargin: true,
      outerMarginTop: null,
      outerMarginRight: 10,
      outerMarginBottom: null,
      outerMarginLeft: null,
      useTransformPositioning: true,
      mobileBreakpoint: 800,
      useBodyForBreakpoint: true,
      minCols: 1,
      maxCols: 5,
      minRows: 1,
      maxRows: 5,
      maxItemCols: 5,
      minItemCols: 1,
      maxItemRows: 5,
      minItemRows: 1,
      maxItemArea: 2500,
      minItemArea: 1,
      defaultItemCols: 1,
      defaultItemRows: 1,
      fixedColWidth: 105,
      fixedRowHeight: 105,
      keepFixedHeightInMobile: false,
      keepFixedWidthInMobile: false,
      scrollSensitivity: 10,
      scrollSpeed: 20,
      enableEmptyCellClick: false,
      enableEmptyCellContextMenu: false,
      enableEmptyCellDrop: false,
      enableEmptyCellDrag: false,
      enableOccupiedCellDrop: false,
      emptyCellDragMaxCols: 50,
      emptyCellDragMaxRows: 50,
      ignoreMarginInRow: false,
      draggable: {
        enabled: true,
      },
      resizable: {
        enabled: true,
      },
      swap: false,
      pushItems: true,
      disablePushOnDrag: false,
      disablePushOnResize: false,
      pushDirections: { north: true, east: true, south: true, west: true },
      pushResizeItems: false,
      displayGrid: DisplayGrid.OnDragAndResize,
      disableWindowResize: false,
      disableWarnings: false,
      scrollToNewItems: false,
      // itemResizeCallback: item => {
      //   this.resizeEvent.emit(item);
      // }
    };

    this.dashboard = [
      { cols: 2, rows: 1, y: 0, x: 0, type: 'Transacciones'},
      { cols: 2, rows: 2, y: 0, x: 2, hasContent: true},
      { cols: 1, rows: 1, y: 0, x: 4},
      { cols: 1, rows: 1, y: 2, x: 5},
      { cols: 1, rows: 1, y: 1, x: 0},
      { cols: 1, rows: 1, y: 1, x: 0}
    ];
  }

  static itemChange(item: any, itemComponent: any) {
    console.info('itemChanged', item, itemComponent);
  }

  static itemResize(item: any, itemComponent: any) {
    console.info('itemResized', item, itemComponent);
  }

  changedOptions() {
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }

  removeItem(item: any) {
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  addItem() {
    this.dashboard.push({ cols: 1, rows: 1, y: 0, x: 0 });
  }
}
