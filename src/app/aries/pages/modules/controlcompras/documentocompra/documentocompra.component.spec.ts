import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentocompraComponent } from './documentocompra.component';

describe('DocumentocompraComponent', () => {
  let component: DocumentocompraComponent;
  let fixture: ComponentFixture<DocumentocompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentocompraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentocompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
