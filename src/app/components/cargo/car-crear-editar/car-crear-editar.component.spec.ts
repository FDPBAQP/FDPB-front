import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarCrearEditarComponent } from './car-crear-editar.component';

describe('CarCrearEditarComponent', () => {
  let component: CarCrearEditarComponent;
  let fixture: ComponentFixture<CarCrearEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarCrearEditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarCrearEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
