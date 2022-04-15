import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CedulaPdfComponent } from './cedula-pdf.component';

describe('CedulaPdfComponent', () => {
  let component: CedulaPdfComponent;
  let fixture: ComponentFixture<CedulaPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CedulaPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CedulaPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
