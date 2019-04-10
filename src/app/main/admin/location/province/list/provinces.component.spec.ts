import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProvincesComponent } from './provinces.component';

describe('ProvinceComponent', () => {
    let component: ProvincesComponent;
    let fixture: ComponentFixture<ProvincesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProvincesComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProvincesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
