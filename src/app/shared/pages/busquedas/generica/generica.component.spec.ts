import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericaComponent } from './generica.component';

describe('GenericaComponent', () => {
  let component: GenericaComponent;
  let fixture: ComponentFixture<GenericaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenericaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
