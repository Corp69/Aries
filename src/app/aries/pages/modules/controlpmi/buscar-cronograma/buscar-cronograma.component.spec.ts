import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarCronogramaComponent } from './buscar-cronograma.component';

describe('BuscarCronogramaComponent', () => {
  let component: BuscarCronogramaComponent;
  let fixture: ComponentFixture<BuscarCronogramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscarCronogramaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuscarCronogramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
