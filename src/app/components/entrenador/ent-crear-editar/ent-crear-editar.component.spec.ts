import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntCrearEditarComponent } from './ent-crear-editar.component';

describe('EntCrearEditarComponent', () => {
  let component: EntCrearEditarComponent;
  let fixture: ComponentFixture<EntCrearEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntCrearEditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntCrearEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
