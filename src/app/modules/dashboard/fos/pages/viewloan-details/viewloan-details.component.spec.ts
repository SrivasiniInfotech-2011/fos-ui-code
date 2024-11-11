import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewloanDetailsComponent } from './viewloan-details.component';

describe('ViewloanDetailsComponent', () => {
  let component: ViewloanDetailsComponent;
  let fixture: ComponentFixture<ViewloanDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewloanDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewloanDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
