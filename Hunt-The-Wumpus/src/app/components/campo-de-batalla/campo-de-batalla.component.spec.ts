import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampoDeBatallaComponent } from './campo-de-batalla.component';

describe('CampoDeBatallaComponent', () => {
  let component: CampoDeBatallaComponent;
  let fixture: ComponentFixture<CampoDeBatallaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampoDeBatallaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampoDeBatallaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
