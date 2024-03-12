import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContadocumentoComponent } from './contadocumento.component';

describe('ContadocumentoComponent', () => {
  let component: ContadocumentoComponent;
  let fixture: ComponentFixture<ContadocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContadocumentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContadocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
