import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CluCrearEditarComponent } from './clu-crear-editar.component';

describe('CluCrearEditarComponent', () => {
  let component: CluCrearEditarComponent;
  let fixture: ComponentFixture<CluCrearEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CluCrearEditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CluCrearEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
