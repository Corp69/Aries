import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoventasComponent } from './documentoventas.component';

describe('DocumentoventasComponent', () => {
  let component: DocumentoventasComponent;
  let fixture: ComponentFixture<DocumentoventasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentoventasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentoventasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
