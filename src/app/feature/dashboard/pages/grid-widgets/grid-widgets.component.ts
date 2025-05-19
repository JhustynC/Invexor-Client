import { Component, EventEmitter, HostListener } from '@angular/core';
import { TransactionChartComponent } from '../../components/transaction-chart/transaction-chart.component';
import { TransactionsGraphComponent } from '../../components/transactions-graph/transactions-graph.component';
import { TopCategoriesComponent } from '../../components/top-categories/top-categories.component';
import { ItemChartComponent } from '../../components/item-chart/item-chart.component';
import {
  CompactType,
  DisplayGrid,
  Draggable,
  GridsterComponent,
  GridsterConfig,
  GridsterItem,
  GridsterItemComponent,
  GridsterItemComponentInterface,
  GridType,
  PushDirections,
  Resizable,
} from 'angular-gridster2';

interface Safe extends GridsterConfig {
  draggable: Draggable;
  resizable: Resizable;
  pushDirections: PushDirections;
}

interface ItemByType extends GridsterItem {
  type?: string;
}

@Component({
  selector: 'grid-layout-dashboard',
  templateUrl: './grid-widgets.component.html',
  imports: [
    GridsterComponent,
    GridsterItemComponent,
    TransactionChartComponent,
    TransactionsGraphComponent,
    TopCategoriesComponent,
    ItemChartComponent,
  ],
  styles: `
  ::ng-deep .custom-gridster {
    background-color: #111827 !important;
  }
  ::ng-deep .custom-gridster-item {
    background-color: #293650 !important;
  }
  `,
})
export default class GridLayoutComponent {
  options!: Safe;

  dashboard!: Array<ItemByType>;

  resizeEvent: EventEmitter<GridsterItem> = new EventEmitter<GridsterItem>();
  private wasMaximized = false;
  @HostListener('window:resize', [])
  onResize() {
    const isMaximized =
      window.innerWidth === screen.width &&
      window.innerHeight === screen.height;

    if (isMaximized && !this.wasMaximized) {
      console.log('🚀 La ventana fue maximizada');
      // window.dispatchEvent(new Event('resize'));
    }

    this.wasMaximized = isMaximized;
  }

  ngOnInit(): void {
    this.options = {
      gridTypes: GridType.Fit,
      compactType: CompactType.CompactUp,
      margin: 10,
      outerMargin: true,
      outerMarginTop: null,
      outerMarginRight: null,
      outerMarginBottom: null,
      outerMarginLeft: null,
      useTransformPositioning: true,
      mobileBreakpoint: 800,
      useBodyForBreakpoint: false,
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
        ignoreContentClass: 'gridster-item-content'
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
      displayGrid: DisplayGrid.None,
      disableWindowResize: false,
      disableWarnings: false,
      scrollToNewItems: false,
    };

    this.dashboard = [
      { cols: 1, rows: 1, y: 0, x: 0, type: 'Items'},
      { cols: 3, rows: 1, y: 0, x: 1, hasContent: true, type: 'Graph'},
      { cols: 2, rows: 2, y: 0, x: 4, type: 'TopCategories'},
      { cols: 2, rows: 2, y: 2, x: 5, type: 'LastTransactions'}
    ];
  }

  static eventStart(
    item: GridsterItem,
    itemComponent: GridsterItemComponentInterface,
    event: MouseEvent
  ): void {
    console.info('eventStart', item, itemComponent, event);
  }

  static eventStop(
    item: GridsterItem,
    itemComponent: GridsterItemComponentInterface,
    event: MouseEvent
  ): void {
    console.info('eventStop', item, itemComponent, event);
  }

  static overlapEvent(
    source: GridsterItem,
    target: GridsterItem,
    grid?: import('angular-gridster2').GridsterComponentInterface
  ): void {
    console.log('overlap', source, target, grid);
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
