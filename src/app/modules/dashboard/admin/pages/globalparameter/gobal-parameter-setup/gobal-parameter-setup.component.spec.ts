import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GobalParameterSetupComponent } from './gobal-parameter-setup.component';

describe('GobalParameterSetupComponent', () => {
  let component: GobalParameterSetupComponent;
  let fixture: ComponentFixture<GobalParameterSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GobalParameterSetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GobalParameterSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
