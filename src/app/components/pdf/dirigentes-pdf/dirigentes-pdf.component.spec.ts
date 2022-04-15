import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirigentesPdfComponent } from './dirigentes-pdf.component';

describe('DirigentesPdfComponent', () => {
  let component: DirigentesPdfComponent;
  let fixture: ComponentFixture<DirigentesPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirigentesPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirigentesPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
