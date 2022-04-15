import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugVerComponent } from './jug-ver.component';

describe('JugVerComponent', () => {
  let component: JugVerComponent;
  let fixture: ComponentFixture<JugVerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JugVerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JugVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
