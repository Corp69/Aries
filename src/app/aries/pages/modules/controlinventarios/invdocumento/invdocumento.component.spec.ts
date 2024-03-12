import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvdocumentoComponent } from './invdocumento.component';

describe('InvdocumentoComponent', () => {
  let component: InvdocumentoComponent;
  let fixture: ComponentFixture<InvdocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvdocumentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvdocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
