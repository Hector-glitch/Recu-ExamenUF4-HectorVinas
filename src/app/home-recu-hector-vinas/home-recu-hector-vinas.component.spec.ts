import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRecuHectorVinasComponent } from './home-recu-hector-vinas.component';

describe('HomeRecuHectorVinasComponent', () => {
  let component: HomeRecuHectorVinasComponent;
  let fixture: ComponentFixture<HomeRecuHectorVinasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeRecuHectorVinasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRecuHectorVinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
