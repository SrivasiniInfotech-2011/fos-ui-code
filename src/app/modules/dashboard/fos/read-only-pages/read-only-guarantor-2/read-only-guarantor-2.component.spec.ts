import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadOnlyGuarantor2Component } from './read-only-guarantor-2.component';

describe('ReadOnlyGuarantor2Component', () => {
  let component: ReadOnlyGuarantor2Component;
  let fixture: ComponentFixture<ReadOnlyGuarantor2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReadOnlyGuarantor2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReadOnlyGuarantor2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
