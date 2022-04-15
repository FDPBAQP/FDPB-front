import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CluVerComponent } from './clu-ver.component';

describe('CluVerComponent', () => {
  let component: CluVerComponent;
  let fixture: ComponentFixture<CluVerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CluVerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CluVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
