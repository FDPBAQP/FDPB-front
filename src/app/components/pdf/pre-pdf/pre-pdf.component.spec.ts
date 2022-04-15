import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrePdfComponent } from './pre-pdf.component';

describe('PrePdfComponent', () => {
  let component: PrePdfComponent;
  let fixture: ComponentFixture<PrePdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrePdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrePdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
