import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionChartRowComponent } from './transaction-chart-row.component';

describe('TransactionChartRowComponent', () => {
  let component: TransactionChartRowComponent;
  let fixture: ComponentFixture<TransactionChartRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionChartRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionChartRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
