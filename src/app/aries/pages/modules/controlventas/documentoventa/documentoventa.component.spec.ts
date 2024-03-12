import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoventaComponent } from './documentoventa.component';

describe('DocumentoventaComponent', () => {
  let component: DocumentoventaComponent;
  let fixture: ComponentFixture<DocumentoventaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentoventaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentoventaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
