import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContadocumentosComponent } from './contadocumentos.component';

describe('ContadocumentosComponent', () => {
  let component: ContadocumentosComponent;
  let fixture: ComponentFixture<ContadocumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContadocumentosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContadocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
