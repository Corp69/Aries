import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvdocumentosComponent } from './invdocumentos.component';

describe('InvdocumentosComponent', () => {
  let component: InvdocumentosComponent;
  let fixture: ComponentFixture<InvdocumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvdocumentosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvdocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
