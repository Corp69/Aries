import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RhdocumentosComponent } from './rhdocumentos.component';

describe('RhdocumentosComponent', () => {
  let component: RhdocumentosComponent;
  let fixture: ComponentFixture<RhdocumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RhdocumentosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RhdocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
