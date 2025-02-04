import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadOnlyFvrHirerComponent } from './read-only-fvr-hirer.component';

describe('ReadOnlyFvrHirerComponent', () => {
  let component: ReadOnlyFvrHirerComponent;
  let fixture: ComponentFixture<ReadOnlyFvrHirerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReadOnlyFvrHirerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReadOnlyFvrHirerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
