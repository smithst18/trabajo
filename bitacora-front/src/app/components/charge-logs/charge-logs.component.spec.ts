import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeLogsComponent } from './charge-logs.component';

describe('ChargeLogsComponent', () => {
  let component: ChargeLogsComponent;
  let fixture: ComponentFixture<ChargeLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChargeLogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargeLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
