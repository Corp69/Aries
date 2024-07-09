import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpipanelComponent } from './kpipanel.component';

describe('KpipanelComponent', () => {
  let component: KpipanelComponent;
  let fixture: ComponentFixture<KpipanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KpipanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KpipanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
