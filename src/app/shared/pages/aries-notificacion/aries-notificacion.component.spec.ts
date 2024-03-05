import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AriesNotificacionComponent } from './aries-notificacion.component';

describe('AriesNotificacionComponent', () => {
  let component: AriesNotificacionComponent;
  let fixture: ComponentFixture<AriesNotificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AriesNotificacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AriesNotificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
