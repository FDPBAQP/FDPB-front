import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarVerComponent } from './car-ver.component';

describe('CarVerComponent', () => {
  let component: CarVerComponent;
  let fixture: ComponentFixture<CarVerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarVerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
