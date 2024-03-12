import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosproductoComponent } from './serviciosproducto.component';

describe('ServiciosproductoComponent', () => {
  let component: ServiciosproductoComponent;
  let fixture: ComponentFixture<ServiciosproductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiciosproductoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiciosproductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
