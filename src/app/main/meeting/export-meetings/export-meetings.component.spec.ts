import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportMeetingsComponent } from './export-meetings.component';

describe('ExportMeetingsComponent', () => {
  let component: ExportMeetingsComponent;
  let fixture: ComponentFixture<ExportMeetingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportMeetingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
