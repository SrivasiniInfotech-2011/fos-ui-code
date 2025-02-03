import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadOnlyNonIndividualComponent } from './read-only-non-individual.component';

describe('ReadOnlyNonIndividualComponent', () => {
  let component: ReadOnlyNonIndividualComponent;
  let fixture: ComponentFixture<ReadOnlyNonIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReadOnlyNonIndividualComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReadOnlyNonIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
