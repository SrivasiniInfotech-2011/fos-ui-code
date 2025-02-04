import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadOnlyFvrGuarantorComponent } from './read-only-fvr-guarantor.component';

describe('ReadOnlyFvrGuarantorComponent', () => {
  let component: ReadOnlyFvrGuarantorComponent;
  let fixture: ComponentFixture<ReadOnlyFvrGuarantorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReadOnlyFvrGuarantorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReadOnlyFvrGuarantorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
