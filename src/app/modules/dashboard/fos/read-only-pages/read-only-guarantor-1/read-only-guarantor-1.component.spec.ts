import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadOnlyGuarantor1Component } from './read-only-guarantor-1.component';

describe('ReadOnlyGuarantor1Component', () => {
  let component: ReadOnlyGuarantor1Component;
  let fixture: ComponentFixture<ReadOnlyGuarantor1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReadOnlyGuarantor1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReadOnlyGuarantor1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
