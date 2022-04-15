import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepClubCategoriaComponent } from './rep-club-categoria.component';

describe('RepClubCategoriaComponent', () => {
  let component: RepClubCategoriaComponent;
  let fixture: ComponentFixture<RepClubCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepClubCategoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepClubCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
