import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosproductosComponent } from './serviciosproductos.component';

describe('ServiciosproductosComponent', () => {
  let component: ServiciosproductosComponent;
  let fixture: ComponentFixture<ServiciosproductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiciosproductosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiciosproductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
