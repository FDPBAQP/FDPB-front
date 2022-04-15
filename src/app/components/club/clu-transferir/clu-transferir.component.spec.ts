import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CluTransferirComponent } from './clu-transferir.component';

describe('CluTransferirComponent', () => {
  let component: CluTransferirComponent;
  let fixture: ComponentFixture<CluTransferirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CluTransferirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CluTransferirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
