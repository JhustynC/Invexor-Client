import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionChartHeaderComponent } from './transaction-chart-header.component';

describe('TransactionChartHeaderComponent', () => {
  let component: TransactionChartHeaderComponent;
  let fixture: ComponentFixture<TransactionChartHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionChartHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionChartHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
