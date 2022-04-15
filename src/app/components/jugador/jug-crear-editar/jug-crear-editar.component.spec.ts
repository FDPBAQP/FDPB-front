import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugCrearEditarComponent } from './jug-crear-editar.component';

describe('JugCrearEditarComponent', () => {
  let component: JugCrearEditarComponent;
  let fixture: ComponentFixture<JugCrearEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JugCrearEditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JugCrearEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
