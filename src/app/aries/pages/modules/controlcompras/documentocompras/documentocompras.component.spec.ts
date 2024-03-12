import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentocomprasComponent } from './documentocompras.component';

describe('DocumentocomprasComponent', () => {
  let component: DocumentocomprasComponent;
  let fixture: ComponentFixture<DocumentocomprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentocomprasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentocomprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
