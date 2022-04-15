import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirCrearEditarComponent } from './dir-crear-editar.component';

describe('DirCrearEditarComponent', () => {
  let component: DirCrearEditarComponent;
  let fixture: ComponentFixture<DirCrearEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirCrearEditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirCrearEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
