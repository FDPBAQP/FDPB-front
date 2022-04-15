import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntVerComponent } from './ent-ver.component';

describe('EntVerComponent', () => {
  let component: EntVerComponent;
  let fixture: ComponentFixture<EntVerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntVerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
