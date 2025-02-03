import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadOnlyIndividualComponent } from './read-only-individual.component';

describe('ReadOnlyIndividualComponent', () => {
  let component: ReadOnlyIndividualComponent;
  let fixture: ComponentFixture<ReadOnlyIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReadOnlyIndividualComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReadOnlyIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
