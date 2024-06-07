import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoRecuHectorVinasComponent } from './info-recu-hector-vinas.component';

describe('InfoRecuHectorVinasComponent', () => {
  let component: InfoRecuHectorVinasComponent;
  let fixture: ComponentFixture<InfoRecuHectorVinasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoRecuHectorVinasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoRecuHectorVinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
