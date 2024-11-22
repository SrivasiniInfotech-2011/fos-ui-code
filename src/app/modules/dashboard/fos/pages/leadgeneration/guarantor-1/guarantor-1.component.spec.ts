import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Guarantor1Component } from './guarantor-1.component';

describe('Guarantor1Component', () => {
  let component: Guarantor1Component;
  let fixture: ComponentFixture<Guarantor1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Guarantor1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Guarantor1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
