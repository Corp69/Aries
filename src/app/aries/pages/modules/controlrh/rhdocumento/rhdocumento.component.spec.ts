import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RhdocumentoComponent } from './rhdocumento.component';

describe('RhdocumentoComponent', () => {
  let component: RhdocumentoComponent;
  let fixture: ComponentFixture<RhdocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RhdocumentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RhdocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
