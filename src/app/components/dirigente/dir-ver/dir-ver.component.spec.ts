import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirVerComponent } from './dir-ver.component';

describe('DirVerComponent', () => {
  let component: DirVerComponent;
  let fixture: ComponentFixture<DirVerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirVerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
