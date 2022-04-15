import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrenadoresPdfComponent } from './entrenadores-pdf.component';

describe('EntrenadoresPdfComponent', () => {
  let component: EntrenadoresPdfComponent;
  let fixture: ComponentFixture<EntrenadoresPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntrenadoresPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrenadoresPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
