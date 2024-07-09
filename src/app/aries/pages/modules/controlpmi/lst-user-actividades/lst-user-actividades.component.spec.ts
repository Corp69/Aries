import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LstUserActividadesComponent } from './lst-user-actividades.component';

describe('LstUserActividadesComponent', () => {
  let component: LstUserActividadesComponent;
  let fixture: ComponentFixture<LstUserActividadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LstUserActividadesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LstUserActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
