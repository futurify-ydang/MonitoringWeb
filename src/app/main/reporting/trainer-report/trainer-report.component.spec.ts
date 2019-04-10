import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerReportComponent } from './trainer-report.component';

describe('TrainerReportComponent', () => {
  let component: TrainerReportComponent;
  let fixture: ComponentFixture<TrainerReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
