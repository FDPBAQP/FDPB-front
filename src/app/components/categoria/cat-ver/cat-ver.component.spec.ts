import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatVerComponent } from './cat-ver.component';

describe('CatVerComponent', () => {
  let component: CatVerComponent;
  let fixture: ComponentFixture<CatVerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatVerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
