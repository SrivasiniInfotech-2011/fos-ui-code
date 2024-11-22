import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Guarantor2Component } from './guarantor-2.component';

describe('Guarantor2Component', () => {
  let component: Guarantor2Component;
  let fixture: ComponentFixture<Guarantor2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Guarantor2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Guarantor2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
