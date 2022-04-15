import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatCrearEditarComponent } from './cat-crear-editar.component';

describe('CatCrearEditarComponent', () => {
  let component: CatCrearEditarComponent;
  let fixture: ComponentFixture<CatCrearEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatCrearEditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatCrearEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
