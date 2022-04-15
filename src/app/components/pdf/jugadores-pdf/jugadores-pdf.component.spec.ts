import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugadoresPdfComponent } from './jugadores-pdf.component';

describe('JugadoresPdfComponent', () => {
  let component: JugadoresPdfComponent;
  let fixture: ComponentFixture<JugadoresPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JugadoresPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JugadoresPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
