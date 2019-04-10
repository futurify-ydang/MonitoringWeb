import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartMeetingComponent } from './chart-meeting.component';

describe('ChartMeetingComponent', () => {
  let component: ChartMeetingComponent;
  let fixture: ComponentFixture<ChartMeetingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartMeetingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
