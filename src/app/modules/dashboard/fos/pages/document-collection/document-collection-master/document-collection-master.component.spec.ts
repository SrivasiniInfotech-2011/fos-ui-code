import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentCollectionMasterComponent } from './document-collection-master.component';

describe('DocumentCollectionMasterComponent', () => {
  let component: DocumentCollectionMasterComponent;
  let fixture: ComponentFixture<DocumentCollectionMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentCollectionMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentCollectionMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
